const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middlewares/auth');
const blogController = require('../controller/blogController');
const commentController = require('../controller/commentController');
//testing
router.get('/test', (req, res) => res.json({msg:'working!'}))


//required routers are listed below:
/*
    routers for users table:--
    1)login
    2)register
    3)logout
    4)refresh
     these are the routes controlled by auth controller
*/ 
//REGISTER
router.post('/register', authController.register);

//LOGIN
router.post('/login', authController.login);

//LOGOUT
router.post('/logout',auth, authController.logout);

//REFRESH
router.get('/refresh', authController.refresh);


/*
    routers for blogs table:--
    1)CRUD operations on blog
    2)read all blog posts
    3)read a specific blog post by id
*/ 

//create blog
router.post('/blog',auth,blogController.create);
//get all blogs
router.get('/blog/all',auth,blogController.getAll);
//GET blog by id
router.get('/blog/:id',auth,blogController.getById);
//update blog
router.put('/blog',auth,blogController.update);
//delete blog
router.delete('/blog/:id',auth,blogController.delete);


/*
    routers for comments:--
    1)create a new comment
    2)read comments by blogs id that shows which user commented what at the blog
*/ 

//create comment
router.post('/comment',auth,commentController.create);
//get comments
router.get('/comment/:id',auth,commentController.getById);


module.exports = router;