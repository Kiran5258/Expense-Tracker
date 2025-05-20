const express=require('express');
const {
    addexpense,
    getallexpense,
    deleteexpense,
    downloadexpenseexcel
}=require('../controller/expensecontroller');
const {protect}=require("../middleware/authMiddleware");

const router=express.Router();

router.post('/add',protect,addexpense);
router.get('/get',protect,getallexpense);
router.get('/downloadexcel',protect,downloadexpenseexcel);
router.delete("/:id",protect,deleteexpense);

module.exports=router;