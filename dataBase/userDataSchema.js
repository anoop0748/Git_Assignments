const mongoose = require('mongoose');
const blogSchema =  new mongoose.Schema({
    name : {type: String,required:true},
    email : {type: String, required: true,unique:true},
    password : {type: Number, required : true}
})

const data = mongoose.model('userData',blogSchema);
module.exports = data;