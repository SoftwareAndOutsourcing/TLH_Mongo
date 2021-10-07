const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Delete after testing users route with query included in this file (8/20/2021)
const pool = require("../../config/database")

const users = []

// Access to Auth0 request object
const { requiresAuth } = require('express-openid-connect');

// Root route===================================================================
// router.get("/login", (req, res) => {
//     res.render("login", {
//         title: 'True Legacy Homes'
//     });
// })

// router.get("/register", (req, res) => {
//     res.render("register", {
//         title: 'True Legacy Homes'
//     })
// })

// router.post('/register', (req, res) => {
//     const hashedPassword = bcrypt.hash(req.body.password, 10)
//     let data = {
//         first_name: req.body.firstname,
//         last_name: req.body.lastname,
//         email_address: req.body.email,
//         username: req.body.username,
//         password: hashedPassword
//     }
//     let sql = "INSERT INTO users SET ?";
//     let query = pool.query(sql, data, (err, data) => {
//         if (err) throw err;
//         res.redirect("/login");
//     });
// });



// router.get('/users', requiresAuth(), (req, res) => {
//     let sql = "SELECT * FROM users";
//     let query = pool.query(sql, (err, rows, fields) => {
//         console.log("Fetched users successfully")
//         if (err) throw err;
//         console.log(rows)
//         res.render('userindex', {
//             title: 'True Legacy Homes Sale Manager Users',
//             users: rows,
//             authUser: req.oidc.user
//         });
//     });
// });

// Main landing page GET route
router.get("/", (req, res) => {
    res.render("landing", {
        title: "True Legacy Homes",
    });
});

// For test - to get userInfo
router.get('/user-info', async (req, res) => {
    const userInfo = await req.oidc.fetchUserInfo();
    res.json(userInfo);
  })

// Main input form GET route
router.get("/input1", requiresAuth(), (req, res) => {
    let sql = `SELECT * from market; SELECT * from service; SELECT * from cashier; 
        SELECT * from salesperson; SELECT * from pos_id; SELECT * from trailer_number; 
        SELECT * from opening_day; SELECT * from state;`;
    pool.query(sql, (err, rows, results) => {
        console.log(rows);
        if (err)
            throw err;
        res.render('input1', {
            title: 'True Legacy Homes Sale Manager New Sale',
            authUser: req.oidc.user,
            marketArray: rows[0],
            serviceArray: rows[1],
            cashierArray: rows[2],
            salespersonArray: rows[3],
            posidArray: rows[4],
            trailernumberArray: rows[5],
            openingdayArray: rows[6],
            stateArray: rows[7],            
        });
    });
})

// All Sales GET Route
router.get('/sales', requiresAuth(), (req, res) => {
    let sql = "SELECT * FROM input WHERE job_id IS NOT NULL;";
    let query = pool.query(sql, (err, rows, results) => {
        if (err) throw err;
        console.log(rows[0].job_id)
        res.render('sales', {
            title: 'True Legacy Homes Sale Manager - All Sales',
            saleresults: rows,
            authUser: req.oidc.user
        })
    })
})

// EDIT GET ROUTE - edit a sale
router.get("/sales/:job_id", requiresAuth(), (req, res) => {
    // the order with the provided ID
    //render edit template with that sale
    let id = req.params.job_id
    let sql = 'SELECT * FROM input WHERE job_id = ' + id + ';'
    let query = pool.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(sql)
        console.log(rows[0].job_name)
        res.render('salesdetail', {
            title: 'True Legacy Homes Sale Manager - Sales Detail',
            saleresult: rows[0],
            authUser: req.oidc.user
        })
    })
});

// POST request from the input form
router.post('/input1', (req, res) => {
    console.log("Trying to add a new sale")
    console.log("Job name is " + req.body.jobname)

    const jobName = req.body.jobname
    const hoursStagingBudget = req.body.hoursstagingbudget
    const market = req.body.market
    const hoursStagingActual = req.body.hoursstagingactual
    const minimumBase = req.body.minimumbase
    const services = req.body.services
    const minimumActual = req.body.minimumactual
    const saleDate = req.body.saledate
    const hoursEstateSaleBudget = req.body.hoursestatesalebudget
    // const minimumDiscount =  req.body.minimumdiscount
    const cashier = req.body.cashier
    const hoursEstateSaleActual = req.body.hoursestatesaleactual
    const salesPerson = req.body.salesperson
    const disposalFee = req.body.disposalfee
    const posId = req.body.posid
    const grossSalesBudget = req.body.grosssalesbudget
    const disposalLoadCount = req.body.disposalloadcount
    const trailerNumber = req.body.trailernumber
    const grossSalesActualClover = req.body.grosssalesactualclover
    const disposalVendorCost = req.body.disposalvendorcost
    const openingDay = req.body.openingday
    const adView = req.body.adview
    const grossSales8to10 = req.body.grosssales8to10
    const transactions8to10 = req.body.transactions8to10
    const emailsSent = req.body.emailssent
    const grossSalesOpeningDay = req.body.grosssalesopeningday
    const transactionsOpeningDay = req.body.transactionsopeningday
    const clientName = req.body.clientname
    const checkPayableTo = req.body.checkpayableto
    const paymentDueDate = req.body.paymentduedate
    const clientEmail = req.body.clientemail
    const transactionTotal = req.body.transactiontotal
    const clientMailingAddress1 = req.body.clientmailingaddress1
    const grossSalesDebitCredit = req.body.grosssalescreditdebit
    const clientMailingAddress2 = req.body.clientmailingaddress2
    const grossSalesCash = req.body.grosssalescash
    const cashOutsideClover = req.body.cashoutsideclover
    const commissionRate = req.body.commissionrate
    const clientCity = req.body.clientmailingcity
    const clientState = req.body.clientmailingstate
    const clientPostalCode = req.body.zip
    const taxesFees = req.body.taxesfees
    const additionalDonationLoanCost = req.body.additionaldonationloancost
    const courtesyDiscount = req.body.courtesydiscount

    const sql = `INSERT INTO input (job_name, 
                                        hours_staging_budget,
                                        market,
                                        hours_staging_actual,
                                        minimum_base,
                                        services,
                                        minimum_actual,
                                        sale_date,
                                        hours_estate_sale_budget,
                                        cashier, 
                                        hours_estate_sale_actual,
                                        salesperson, 
                                        disposal_fee,
                                        pos_id, 
                                        gross_sales_budget,
                                        disposal_load_count,
                                        trailer_num, 
                                        gross_sales_actual_clover,
                                        disposal_vendor_cost,
                                        opening_day, 
                                        ad_view, 
                                        gross_sales_8to10, 
                                        transactions_8to10, 
                                        emails_sent,
                                        gross_sales_opening_day,
                                        transactions_opening_day,
                                        client_name, 
                                        check_payable_to,
                                        client_email,
                                        transactions_total,
                                        client_mailing_address1,
                                        gross_sales_debit_credit,
                                        client_mailing_address2,
                                        gross_sales_cash,
                                        cash_outside_clover,
                                        commission_rate,
                                        client_city,
                                        client_state,
                                        client_postal_code,
                                        payment_due_date,
                                        taxes_fees,
                                        additional_donation_loan_cost,
                                        courtesy_discount
                                        ) 
                                        VALUES (
                                        ?,?,?,?,?,?,?,?,?,?,
                                        ?,?,?,?,?,?,?,?,?,?,
                                        ?,?,?,?,?,?,?,?,?,?,
                                        ?,?,?,?,?,?,?,?,?,?,
                                        ?,?,?
                                        )`

    pool.query(sql, [jobName,
        hoursStagingBudget,
        market,
        hoursStagingActual,
        minimumBase,
        services,
        minimumActual,
        saleDate,
        hoursEstateSaleBudget,
        cashier,
        hoursEstateSaleActual,
        salesPerson,
        disposalFee,
        posId,
        grossSalesBudget,
        disposalLoadCount,
        trailerNumber,
        grossSalesActualClover,
        disposalVendorCost,
        openingDay,
        adView,
        grossSales8to10,
        transactions8to10,
        emailsSent,
        grossSalesOpeningDay,
        transactionsOpeningDay,
        clientName,
        checkPayableTo,
        clientEmail,
        transactionTotal,
        clientMailingAddress1,
        grossSalesDebitCredit,
        clientMailingAddress2,
        grossSalesCash,
        cashOutsideClover,
        commissionRate,
        clientCity,
        clientState,
        clientPostalCode,
        paymentDueDate,
        taxesFees,
        additionalDonationLoanCost,
        courtesyDiscount
    ], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert data into input table")
            console.log(err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new input with id: " + results.insertedId)
        console.log("market is " + market)
        console.log("service is " + services)
        console.log("sale date is " + saleDate)
        res.end()
    })
    res.redirect('/')
})

// DELETE sale route
router.delete("/sales/delete/:job_id", (req, res) => {
    let id = req.params.job_id
    let sql = 'DELETE FROM input WHERE job_id = ' + id + ';'
    let query = pool.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(sql)
        console.log(rows[0].job_name)
        res.render('landing', {
            title: 'True Legacy Homes Sale Manager - Sales Detail',
            saleresult: rows[0]
        })
    })
})



module.exports = router;