import express from 'express';
const bcrypt = require('bcrypt');
import { Db, ObjectId } from 'mongodb';
import { Sale } from '../../types'
// Delete after testing users route with query included in this file (8/20/2021)
import { pool } from '../../config/database';
const { requiresAuth } = require('express-openid-connect');

class IndexRouter {
  readonly router: express.Router;
  readonly db: Db;
  constructor(db: Db) {
    this.router = express.Router();
    this.db = db;
  }

  async getRouter() {
    // Root route===================================================================
    // this.router.get("/login", (req, res) => {
    //     res.render("login", {
    //         title: 'True Legacy Homes'
    //     });
    // })

    // this.router.get("/register", (req, res) => {
    //     res.render("register", {
    //         title: 'True Legacy Homes'
    //     })
    // })

    // this.router.post('/register', (req, res) => {
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



    // this.router.get('/users', requiresAuth(), (req, res) => {
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
    this.router.get("/", (req, res) => {
      res.render("landing", {
        title: "True Legacy Homes",
      });
    });

    // For test - to get userInfo
    this.router.get('/user-info', async (req, res) => {
      // req.oidc is added by auth0 so it fails to match the Request type
      const userInfo = await req['oidc'].fetchUserInfo();
      res.json(userInfo);
    })

    // Main input form GET route
    this.router.get("/input1", requiresAuth(), (req, res) => {
      let sql = `SELECT * from market; SELECT * from service; SELECT * from cashier; 
        SELECT * from salesPerson; SELECT * from pos_id; SELECT * from trailer_number; 
        SELECT * from opening_day; SELECT * from state;`;
      pool.query(sql, (err, rows, results) => {
        // console.log(rows);
        if (err)
          throw err;
        res.render('input1', {
          title: 'True Legacy Homes Sale Manager New Sale',
          authUser: req['oidc'].user,
          marketArray: rows[0],
          serviceArray: rows[1],
          cashierArray: rows[2],
          salesPersonArray: rows[3],
          posIdArray: rows[4],
          trailerNumberArray: rows[5],
          openingDayArray: rows[6],
          stateArray: rows[7],
        });
      });
    })

    // All sales GET route
    this.router.get('/sales', requiresAuth(), async (req, res) => {
      const sales =
        await this.db.collection('sales').find().toArray() as Sale[];
      res.render('sales', {
        title: 'True Legacy Homes Sale Manager - All Sales',
        saleresults: sales,
        authUser: req['oidc'].user
      });
    })

    // EDIT GET ROUTE - edit a sale
    this.router.get("/sales/:id", requiresAuth(), async (req, res) => {
      // the order with the provided ID
      //render edit template with that sale
      const sale = await this.db.collection('sales')
        .findOne({ _id: new ObjectId(req.params.id) }) as Sale;

      res.render('salesdetail', {
        title: 'True Legacy Homes Sale Manager - Sales Detail',
        saleresult: sale,
        authUser: req['oidc'].user
      });
    });

    // POST request from the input form
    this.router.post('/input1/:id?', requiresAuth(), async (req, res) => {
      console.log("Trying to add a new sale")
      console.log("Job name is " + req.body.jobName)

      const sale: Sale = {
        jobName: req.body.jobName,
        hoursStagingBudget: req.body.hoursStagingBudget,
        market: req.body.market,
        hoursStagingActual: req.body.hoursStagingActual,
        minimumBase: req.body.minimumBase,
        services: req.body.services,
        minimumActual: req.body.minimumActual,
        saleDate: req.body.saleDate,
        hoursEstateSaleBudget: req.body.hoursEstateSaleBudget,
        //  minimumDiscount : req.body.minimumDiscount,
        cashier: req.body.cashier,
        hoursEstateSaleActual: req.body.hoursEstateSaleActual,
        salesPerson: req.body.salesPerson,
        disposalFee: req.body.disposalFee,
        posId: req.body.posId,
        grossSalesBudget: req.body.grossSalesBudget,
        disposalLoadCount: req.body.disposalLoadCount,
        trailerNumber: req.body.trailerNumber,
        grossSalesActualClover: req.body.grossSalesActualClover,
        disposalVendorCost: req.body.disposalVendorCost,
        openingDay: req.body.openingDay,
        adView: req.body.adView,
        grossSales8To10: req.body.grossSales8To10,
        transactions8To10: req.body.transactions8To10,
        emailsSent: req.body.emailsSent,
        grossSalesOpeningDay: req.body.grossSalesOpeningDay,
        transactionsOpeningDay: req.body.transactionsOpeningDay,
        clientName: req.body.clientName,
        checkPayableTo: req.body.checkPayableTo,
        paymentDueDate: req.body.paymentDueDate,
        clientEmail: req.body.clientEmail,
        transactionTotal: req.body.transactionTotal,
        clientMailingAddress1: req.body.clientMailingAddress1,
        grossSalesDebitCredit: req.body.grossSalesDebitCredit,
        clientMailingAddress2: req.body.clientMailingAddress2,
        grossSalesCash: req.body.grossSalesCash,
        cashOutsideClover: req.body.cashOutsideClover,
        commissionRate: req.body.commissionRate,
        clientCity: req.body.clientMailingCity,
        clientState: req.body.clientMailingState,
        clientPostalCode: req.body.clientPostalCode,
        taxesFees: req.body.taxesFees,
        additionalDonationLoanCost: req.body.additionalDonationLoanCost,
        courtesyDiscount: req.body.courtesyDiscount
      };

      try {
        let id = req.params.id;
        if (id) {
          const result = await this.db.collection('sales').updateOne(
            { '_id': new ObjectId(id) },
            { $set: sale },
            { upsert: true }
          );
          console.log("Updated a input with id: " + id)
        } else {
          const result = await this.db.collection('sales').insertOne(sale);
          console.log("Inserted a new input with id: " + id)
          id = result.insertedId;
        }
        if (!id) {
          throw new Error('Error while inserting or updating sale.');
        }
        console.log("market is " + sale.market)
        console.log("service is " + sale.services)
        console.log("sale date is " + sale.saleDate)
        res.json({ id: id });
        res.end();
      } catch (err) {
        console.log("Failed to insert data into input table")
        console.log(err)
        res.sendStatus(500)
        return
      }
    })

    // DELETE sale route
    this.router.delete("/sales/delete/:job_id", (req, res) => {
      let id = req.params.job_id
      let sql = 'DELETE FROM input WHERE job_id = ' + id + ';'
      let query = pool.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(sql)
        console.log(rows[0].jobName)
        res.render('landing', {
          title: 'True Legacy Homes Sale Manager - Sales Detail',
          saleresult: rows[0]
        });
      });
    });
    return this.router;
  }
}

export { IndexRouter };
