const express=require('express');
const {protect}=require('../middleware/authMiddleware');
const {getDashRouter}=require('../controller/dashboardcontroller');

const router=express.Router();

router.get('/',protect,getDashRouter);

module.exports=router;