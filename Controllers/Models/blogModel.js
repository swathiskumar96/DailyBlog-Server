const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }, 
    genre:{
        type:String,
        required:true
    }, 
    date:{
        type:String,
        required:true
    }, 
    overview:{
        type:String,
        required:true
    }, 
    blogImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

})

const blogs = mongoose.model("blogs",blogSchema)
module.exports = blogs