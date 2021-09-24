const { 
    create,
    getAll,
    getOneById,
    updateOne,
    deleteOne
} = require('./sales.service');

module.exports = {
    createSales: (req, res)=>{
        const body = req.body;
        create(body, (err, results) =>  {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
    getAll: (req, res) => {
        getAll((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getOneById: (req, res) => {
        const id = req.params.id;
        getOneById(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updateOne: (req, res) => {
        const body = req.body;
        updateOne(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    }
};