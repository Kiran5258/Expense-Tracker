const express=require('express');
const {registeruser,loginuser,getuserinfo}=require('../controller/authcontroller');
const {protect}=require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router=express.Router();
router.post("/register",registeruser);

router.post('/login',loginuser);

router.get('/getuser',protect,getuserinfo);

router.post('/uploadimage',upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({messaage:"no file uploaded"});
    }
    const imageurl=`${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageurl});   
})
module.exports = router;