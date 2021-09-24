const { 
    createSales,
    getAll,
    getOneById
 } = require('./sales.controller')
const router = require('express').Router();

router.post('/', createSales);
router.get('/', getAll);
router.get('/:id', getOneById);

module.exports = router;