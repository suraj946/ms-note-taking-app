const express = require('express');
const router = express.Router();
const User = require("../Models/User");
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchuser");

router.post('/createuser', [
    body('name','Name must be atleast 3 character').isLength({min:3}),
    body('password', 'Password must be atleast 5 character').isLength({min:5}),
    body('email','Please enter a valid email').isEmail()
],async(req, res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors:errors.array()});
    }
    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success, error:"email address already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword
        });
        const data = {
            user:{
                id:user.id
            }
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.status(200).json({success, authToken});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

router.post('/login', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],async(req, res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return  res.status(400).json({success, error:errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error:"Login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error:"Login with correct credentials"});
        }
        const data = {
            user:{
                id:user.id
            }
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.status(200).json({success, authToken});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

router.post('/getuser', fetchUser, async(req, res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;