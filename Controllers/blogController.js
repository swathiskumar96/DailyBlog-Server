const blogs = require('../Controllers/Models/blogModel')


// add project
exports.addBlog = async (req,res)=>{
    console.log("Inside add blog request");

    console.log(req.payload)
    console.log(req.body);
    console.log(req.file);
    const {title,author,genre,date,overview} = req.body
    const userId = req.payload
    const blogImage = req.file.filename
    try{
        const existingBlog = await blogs.findOne({title})
        if(existingBlog){
            res.status(406).json("Blog already available in our system, kindly upload another")
        }else{
const newblog = new blogs({
    title,author,genre,date,overview,blogImage,userId
})
await newblog.save()
res.status(200).json(newblog)
        }

    }catch(err){
        res.status(401).json(err)
    }

}


//get all blogs
exports.getAllBlogs = async (req,res)=>{
    const searchKey = req.query.search
    const query ={
           genre : {
            $regex: searchKey, $options:'i'
           }
    }
    try{
        const allBlogs = await blogs.find(query)
        res.status(200).json(allBlogs)

    }catch(err){
        res.status(401).json(err)
    }
}

//get user blogs
exports.getUserBlogs = async (req,res)=>{
    const userId = req.payload
    try{
        const userBlogs = await blogs.find({userId})
        res.status(200).json(userBlogs)

    }catch(err){
        res.status(401).json(err)
    }
}

//get home blogs

exports.getHomeBlogs = async (req,res)=>{
    try{
        const homeBlogs = await blogs.find().limit(3)
        res.status(200).json(homeBlogs)

    }catch(err){
        res.status(401).json(err)
    }
}

//edit blog
exports.editBlog = async (req,res) =>{
    console.log("Inside edit blog");
    const {pid} = req.params
    const userId = req.payload
    const {title,author,genre,date,overview,blogImage} = req.body
    const uploadImage = req.file?req.file.filename:blogImage
    try{
         const updatedBlog = await blogs.findByIdAndUpdate({_id:pid},{
            title,author,genre,date,overview,blogImage:uploadImage,userId
         },{new:true})
         await updatedBlog.save()
         res.status(200).json(updatedBlog)
    }catch(err){
        res.status(401).json(err)
    }

}


//remove blog
exports.removeBlog = async(req,res)=>{
    console.log("Inside remove blog");
    const {pid} = req.params
    try{
        const blogDetails = await blogs.findByIdAndDelete({_id:pid})
        res.status(200).json(blogDetails)
    }catch(err){
        res.status(401).json(err)
    }
}
