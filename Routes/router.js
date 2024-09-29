const express = require('express')
const userController = require('../Controllers/userController')
const blogController = require('../Controllers/blogController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')



const router = new express.Router()


//register
router.post('/register',userController.register)

router.post('/login',userController.login)

//add blog route
router.post("/add-blog",jwtMiddleware,multerConfig.single('blogImage'),blogController.addBlog)

//get all blogs
router.get('/all-blogs',blogController.getAllBlogs)

//get user blogs
router.get('/user-blogs',jwtMiddleware,blogController.getUserBlogs)

//get home blogs
router.get('/home-blogs',blogController.getHomeBlogs)

//edit project
router.put('/edit-blog/:pid',jwtMiddleware,multerConfig.single('blogImage'),
blogController.editBlog)

//remove project
router.delete('/remove-blog/:pid',jwtMiddleware,blogController.removeBlog)

//edit user
router.put('/edit-user',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)

// Get all users
router.get('/all-users', jwtMiddleware, userController.getAllUsers);

router.delete('/delete-user/:uid', jwtMiddleware, userController.deleteUser);





//export router
module.exports = router