const express = require('express');
const mongoos = require('mongoose');
const Data = require('./dataBase/post');
const bodyParser = require('body-parser');


let allCredRout   = express();
allCredRout.use(bodyParser.json());

allCredRout.post('/posts', async(req,res)=>{
    
    try{
        console.log(req.body)
        const post = await Data.create({
            title:req.body.title,
            body: req.body.body,
            image:req.body.image
        });
        console.log(post)
        res.json({
            status:"success",
            post:post
        })
    }
    catch(e){
        res.json({
            status:'Fail In Routs',
            massage: e.massage
        })
    }
});
allCredRout.get('/posts', async(req,res)=>{
   
    try{
        const post = await Data.find();
        console.log(post)
        res.json({
            status:"success",
            post
        })
    }
    catch(e){
        res.json({
            status:'Fail in routs',
            massage: e.massage
        })
    }
});

allCredRout.get('/posts/:postId', async(req,res)=>{
    try{
        let insertedData = await Data.find({_id:req.params.postId});
        res.json({
            status:'successes',
            massage:insertedData
        })
    }catch(e){
        res.json({
            status:'Fail',
            massage: e.massage
        })
    }
});


allCredRout.put('/posts/:postId', async(req,res)=> {
    
    try {
        
        let updatedData = await Data.updateOne({_id:req.params.postId},req.body);
        
        res.json({
            status:'successes',
            massage:updatedData
        })

    } catch (e) {
        let id  = req.params.postId;
        let dataToUp = req.body;
        console.log('Anoop')
        res.json({
            status:'Fail',
            massage: e.massage
        })
    }
})
allCredRout.delete('/posts/:postId', async(req,res)=>{
    try{
        // let id = req.query.id;
        let id  = req.params.postId
        
        let deleted = await Data.deleteOne({_id:id})
        res.json({
            status:'successes',
            massage:deleted
        })
    }catch(e){
        res.json({
            status: 'Fail',
            massage: e.massage
        })
    }
})



module.exports = allCredRout;