const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const postSchema =  new Schema({
    title : {type: String,required:true},
    body : {type: String, },
    image:{type:String},
    user : {type: ObjectId, ref:'userData'}
})

const post_data = mongoose.model('userpost',postSchema);
module.exports = post_data;