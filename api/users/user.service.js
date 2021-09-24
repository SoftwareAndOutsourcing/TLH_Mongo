const pool = require("../../config/database")

module.exports = {
    // the CREATE user service
    create: (data, callBack) => {
        pool.query(
            `insert into users(first_name,last_name,username,email_address,password)
            values(?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                date.username,
                data.email_address,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    //  the GET all users service
    getUsers: callBack => {
        let sql = 'SELECT * FROM users'
        // let query = pool.query(sql, (err, rows)=>{
        //     if(err){
        //         return callBack(err)
        //     }
        //         return callBack(null, rows)
        // })
        pool.query(
            sql,
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
            )
    },
    // the GET USER by Id service
    getUserById: (id, callBack) => {
        pool.query(
            `SELECT *
            FROM client, sales, jobs
            WHERE client.client_id = ? AND sales.client_id = client.client_id AND jobs.client_id = sales.client_id;`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                    return callBack(null, results[0]);
            }
        )
    },
    //  the UPDATE USER service
    updateUser: (data, callBack) => {
        pool.query(
            'update users set first_name=?, last_name=?, email_address=?, username=?, password=? where userID=?',
            [
                data.first_name,
                data.last_name,
                data.username,
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
    // the DELETE USER service
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where userID = ?`,
            [data.userID],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                    return callBack(null, results[0]);
            }
        )
    },
    // the LOGIN service
    login: (req, res) => {
        const body = req.body;
        getUserByUsername: (username, callBack) => {
            pool.query(
                `select * from users where username = ?`,          
                [usernamme],
                (error, results, fields) => {
                    if(error){
                        return callBack(error);
                    }
                        console.log("results[0].password = " + results[0].password)
                        console.log(results[0])
                        return callBack(null, results[0]) 
                }
            )
        }
    },
}