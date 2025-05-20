const jwt=require('jsonwebtoken');
const Expense=require("../models/expense");
const xlsx=require("xlsx");
exports.addexpense=async(req,res)=>{
    const userId=req.user.id;
    try{
        const{icon,category,amount,date}=req.body;
        if(!category||!amount||!date){
            return res.status(400).json({message:"All fields are required"});
        }
        const newExpense=new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date)
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    }catch(err){
        res.status(400).json({message:"Server Error"});
    }
}
exports.getallexpense=async(req,res)=>{
    const userId=req.user.id;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        console.log(Date.now());
        res.json(expense);
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }
}

exports.deleteexpense=async(req,res)=>{
    const userId=req.user.id;
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted Successfully"});
    }catch(err){
        res.json(500).json({message:"Server error"});
    }
}

exports.downloadexpenseexcel=async(req,res)=>{
    const userId=req.user.id;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        const data=expense.map((item)=>({
            Category:item.category,
            Amount:item.amount,
            Date:item.date, 
    }));
    const wb=xlsx.utils.book_new();
    const ws=xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb,ws,"Expense");
    xlsx.writeFile(wb,"expense_details.xlsx");
    res.download('expense_details.xlsx');
    }catch(err){
        res.status(500).json({message:"server error"})
    }
}