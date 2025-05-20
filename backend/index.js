require("dotenv").config();
const express=require('express');
const path=require('path');
const cors=require('cors');
const connectDb=require('./config/db');
const authroutes=require('./routes/authroutes');
const incomeroutes=require('./routes/incomeroutes');
const expenseroutes=require('./routes/expenseroutes');
const dashboardroutes=require('./routes/dashboardroutes');
const app=express();

app.use(
    cors({
        origin:process.env.CLIENT_URL || "",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
)

app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

connectDb();

app.use('/api/v1/auth',authroutes);
app.use('/api/v1/income',incomeroutes);
app.use('/api/v1/expense',expenseroutes);
app.use('/api/v1/dashboard',dashboardroutes);

const port =process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server running on port ${port}`));