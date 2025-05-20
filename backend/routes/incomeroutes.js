const express=require('express');

const {
    addincome,
    getallincome,
    deleteincome,
    downloadincomeexcel
}=require('../controller/incomecontroller');
const {protect}=require("../middleware/authMiddleware");

const router=express.Router();

router.post('/add',protect,addincome);
router.get('/get',protect,getallincome);
router.get('/downloadexcel',protect,downloadincomeexcel);
router.delete("/:id",protect,deleteincome);

module.exports=router;