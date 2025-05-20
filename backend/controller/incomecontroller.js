const jwt=require('jsonwebtoken');
const User=require('../models/user');
const Income=require("../models/income");
const xlsx=require("xlsx");
exports.addincome=async(req,res)=>{
    const userId=req.user.id;
    try{
        const{icon,source,amount,date}=req.body;
        if(!source||!amount||!date){
            return res.status(400).json({message:"All fields are required"});
        }
        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });
        await newIncome.save();
        res.status(201).json(newIncome);
    }catch(err){
        res.status(400).json({message:"Server Error"});
    }
}
exports.getallincome=async(req,res)=>{
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
        res.json(income);
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }
}

exports.deleteincome=async(req,res)=>{
    const userId=req.user.id;
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted Successfully"});
    }catch(err){
        res.json(500).json({message:"Server error"});
    }
}

exports.downloadincomeexcel=async(req,res)=>{
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
        const data=income.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date, 
    }));
    const wb=xlsx.utils.book_new();
    const ws=xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb,ws,"Income");
    xlsx.writeFile(wb,"income_details.xlsx");
    res.download('income_details.xlsx');
    }catch(err){
        res.status(500).json({message:"server error"})
    }
}