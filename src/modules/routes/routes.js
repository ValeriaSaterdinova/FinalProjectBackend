const express = require('express');
const router = express.Router();

const{
    getAllBuys,
    createNewBuy,
    changeBuyInfo,
    deleteBuy
} = require('../controllers/buy.controllers');

router.get('/allBuys', getAllBuys);
router.post('/createBuys', createNewBuy );
router.patch('/updateBuy', changeBuyInfo);
router.delete('/deleteBuy', deleteBuy);

module.exports = router;
