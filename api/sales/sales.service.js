const pool = require("../../config/database")

module.exports = {
    create: (data, callBack) => {
        // insert data into the 'input' table from the form
        pool.query(
            `insert into input(
                client_name, 
                client_street_number, 
                client_street_name, 
                client_suite_number, 
                client_city, 
                client_state, 
                client_postal_code, 
                job_name, 
                market, 
                services, 
                sale_date, 
                cashier, 
                salesperson, 
                pos_id, 
                trailer_num, 
                opening_day, 
                ad_view, 
                emails_sent, 
                gross_sales_budget, 
                gross_sales_actual_clover, 
                gross_sales_debit_credit, 
                gross_sales_cash, 
                gross_sales_8to10, 
                gross_sales_opening_day, 
                cash_outside_clover,
                minimum_base, 
                minimum_actual, 
                commission_rate, 
                client_share, 
                client_payment, 
                gross_profit, 
                labor_rate, 
                transactions_total, 
                transactions_8to10, 
                transactions_opening_day, 
                taxes_fees, 
                disposal_fee, 
                disposal_load_count, 
                disposal_vendor_cost, 
                hours_staging_budget, 
                hours_estate_sale_budget, 
                hours_staging_actual, 
                hours_estate_sale_actual, 
                additional_billable_hours, 
                post_sale_donation_and_debris_hours
                )

            values(?,?,?,?,?,?,?,?,?,?,?,
                    ?,?,?,?,?,?,?,?,?,?,?,?,
                    ?,?,?,?,?,?,?,?,?,?,?,?,
                    ?,?,?,?,?,?,?,?,?,?
                )`,
            [
                data.client_name,  
                data.client_street_number, 
                data.client_street_name, 
                data.client_suite_number, 
                data.client_city, 
                data.client_state, 
                data.client_postal_code, 
                data.job_name, 
                data.market, 
                data.services, 
                data.sale_date, 
                data.cashier, 
                data.salesperson, 
                data.pos_id, 
                data.trailer_num, 
                data.opening_day, 
                data.ad_view, 
                data.emails_sent, 
                data.gross_sales_budget, 
                data.gross_sales_actual_clover, 
                data.gross_sales_debit_credit, 
                data.gross_sales_cash, 
                data.gross_sales_8to10, 
                data.gross_sales_opening_day, 
                data.cash_outside_clover, 
                data.minimum_base, 
                data.minimum_actual, 
                data.commission_rate, 
                data.client_share, 
                data.client_payment, 
                data.gross_profit, 
                data.labor_rate, 
                data.transactions_total, 
                data.transactions_8to10, 
                data.transactions_opening_day, 
                data.taxes_fees, 
                data.disposal_fee, 
                data.disposal_load_count, 
                data.disposal_vendor_cost, 
                data.hours_staging_budget, 
                data.hours_estate_sale_budget, 
                data.hours_staging_actual, 
                data.hours_estate_sale_actual, 
                data.additional_billable_hours, 
                data.post_sale_donation_and_debris_hours
            ],
            (error, results, fields) => {
                if (error) {
                return callBack(error)
                }
                return callBack(null, results)
            }
        )
        // Insert data into the 'client' table from the 'insert' table
        pool.query(
            `INSERT INTO client (
                client_name,
                client_street_number, 
                client_street_name, 
                client_suite_number, 
                client_city, 
                client_state, 
                client_postal_code,
                client_id
                ) 
                SELECT 
                client_name,
                client_street_number, 
                client_street_name, 
                client_suite_number, 
                client_city, 
                client_state, 
                client_postal_code,
                client_id
                FROM input;`,
                [
                    data.client_name,
                    data.client_street_number, 
                    data.client_street_name, 
                    data.client_city, 
                    data.client_state, 
                    data.client_postal_code,
                    data.client_id
                ],
                (error, results, fields) => {
                    if (error) {
                    return callBack(error)
                    }
                    return callBack(null, results)
                }
        )
        // Insert data into the 'sales' table from the 'insert' table
        pool.query(
            `INSERT INTO sales (
                gross_sales_budget,
                gross_sales_actual_clover,
                gross_sales_debit_credit,
                gross_sales_cash,
                gross_sales_8to10,
                gross_sales_opening_day,
                cash_outside_clover,
                minimum_base,
                minimum_actual,
                commission_rate,
                client_share,
                client_payment,
                gross_profit,
                labor_rate,
                transactions_total,
                transactions_8to10,
                transactions_opening_day,
                taxes_fees,
                disposal_fee,
                disposal_load_count,
                disposal_vendor_cost,
                hours_staging_budget,
                hours_estate_sale_budget,
                hours_staging_actual,
                hours_estate_sale_actual,
                additional_billable_hours,
                post_sale_donation_and_debris_hours,
                client_id
                ) 
                SELECT
                gross_sales_budget,
                gross_sales_actual_clover,
                gross_sales_debit_credit,
                gross_sales_cash,
                gross_sales_8to10,
                gross_sales_opening_day,
                cash_outside_clover,
                minimum_base,
                minimum_actual,
                commission_rate,
                client_share,
                client_payment,
                gross_profit,
                labor_rate,
                transactions_total,
                transactions_8to10,
                transactions_opening_day,
                taxes_fees,
                disposal_fee,
                disposal_load_count,
                disposal_vendor_cost,
                hours_staging_budget,
                hours_estate_sale_budget,
                hours_staging_actual,
                hours_estate_sale_actual,
                additional_billable_hours,
                post_sale_donation_and_debris_hours,
                client_id
                FROM input;`,
                [
                    data.gross_sales_budget,
                    data.gross_sales_actual_clover,
                    data.gross_sales_debit_credit,
                    data.gross_sales_cash,
                    data.gross_sales_8to10,
                    data.gross_sales_opening_day,
                    data.cash_outside_clover,
                    data.minimum_base,
                    data.minimum_actual,
                    data.commission_rate,
                    data.client_share,
                    data.client_payment,
                    data.gross_profit,
                    data.labor_rate,
                    data.transactions_total,
                    data.transactions_8to10,
                    data.transactions_opening_day,
                    data.taxes_fees,
                    data.disposal_fee,
                    data.disposal_load_count,
                    data.disposal_vendor_cost,
                    data.hours_staging_budget,
                    data.hours_estate_sale_budget,
                    data.hours_staging_actual,
                    data.hours_estate_sale_actual,
                    data.additional_billable_hours,
                    data.post_sale_donation_and_debris_hours,
                    data.client_id
                ],
                (error, results, fields) => {
                    if (error) {
                    return callBack(error)
                    }
                    return callBack(null, results)
                }
        )
        // Insert data into the 'jobs' table from the 'input' table
        pool.query(
            `INSERT INTO jobs (
                job_name, 
                market, 
                services, 
                sale_date, 
                cashier, 
                salesperson, 
                pos_id, 
                trailer_num, 
                opening_day, 
                ad_view, 
                emails_sent,
                client_id
                ) 
                SELECT 
                job_name, 
                market, 
                services, 
                sale_date, 
                cashier, 
                salesperson, 
                pos_id, 
                trailer_num, 
                opening_day, 
                ad_view, 
                emails_sent,
                client_id
                FROM input;`,
                [
                    data.job_name, 
                    data.market, 
                    data.services, 
                    data.sale_date, 
                    data.cashier, 
                    data.salesperson, 
                    data.pos_id,
                    data.trailer_num, 
                    data.opening_day, 
                    data.ad_view, 
                    data.emails_sent,
                    data.client_id
                ],
                (error, results, fields) => {
                    if (error) {
                    return callBack(error)
                    }
                    return callBack(null, results)
                }
        )

    },
    // Get all sales for the sales.ejs template
    getAll: callBack => {
        pool.query(
            `SELECT *
            FROM client, sales, jobs
            WHERE client.client_id = sales.client_id AND sales.client_id = jobs.client_id;`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    // Get a sale by sale_id
    getOneById: (id, callBack) => {
        pool.query(
            `select * from client, sales, jobs where sales.sales_id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                    return callBack(null, results[0]);
            }
        )
    },
    updateOne: (data, callBack) => {
        pool.query(
            'update client, sales, jobs set first_name=?, last_name=?, email_address=?, password=? where userID=?',
            [
                data.first_name,
                data.last_name,
                data.email_address,
                data.password,
                data.userID
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error); 
                }
                    return callBack(null, results[0]);
            }
        )
    },
}