const express = require('express');
const mongoos = require('mongoose');
const Data = require('./dataBase/userDataSchema');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


let reg_log_app = express.Router();
reg_log_app.use(bodyParser.json());

reg_log_app.post('/register', async (req, res) => {
    console.log("yes")
    try {
        const { email, password } = req.body;
        const user = await Data.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: "Failed",
                massage: "User Already exists with given email"
            })
        }
        user = await Data.create(req.body);
        res.json({
            status: "Success",
            massage: "User succesfully register"
        })
    }
    catch(e){
        res.json({
            status:"Failed ",
            massage:e.massage
        })
    }
    
    
});
reg_log_app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Data.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                status: "Failed",
                massage: "There no register user with this email!"
            })
        }
        const token = await jwt.sign({
            exp: Math.floor(Date.now() / 1000)+(60*60),
            data: user._id
        },'DIDBYANOOP');
        console.log(token)
        return res.json({
            status:"success",
            massage:"Login succesful",
            token
        })
    }
    catch(e){
        res.json({
            status:"Failed Catch",
            massage:e.massage
        })
    }
    
    
});


module.exports = reg_log_app;