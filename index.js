const express = require('express');
const mongoos = require('mongoose');
const Data = require('./dataBase/userDataSchema');
const bodyParser = require('body-parser');
const userRoutes = require('./routes');
const reg_Routes = require('./login');
const jwt = require('jsonwebtoken');

let app   = express();

app.use('/posts', async(req,res,next)=>{
    const token  = req.headers.authorization;
    // console.log(req.headers.authorization)
    if(token){
        jwt.verify(token,'DIDBYANOOP',function (err,decoded){
            if(err){
                
                return res.json({
                    status: 'Fail',
                    massage: "Not a valid token."
                })
            }
            req.user = decoded.data;
             console.log(req.body)
            next();
        })
    }
    else{
        return res.status(401).json({
            status: 'Fail',
            massage: 'Token not Found'
        })
    }
})

app.use(bodyParser.json());
app.use(userRoutes); 
app.use(reg_Routes);

mongoos.set('strictQuery', false);
mongoos.connect('mongodb://localhost/userData',  () => {
    console.log('connected to DB')
})


app.listen(3000, ()=>{console.log("Server is running on 3000 port")})
