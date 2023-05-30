const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
//testing
router.get('/test', (req, res) => res.json({msg:'working!'}))


//required routers are listed below:
/*
    routers for users table:--
    1)login
    2)register
    3)logout
    4)refresh
*/ 
//REGISTER
router.post('/register', authController.register);
//LOGIN
router.post('/login', authController.login);
/*
    routers for blogs table:--
    1)CRUD operations on blog
    2)read all blog posts
    3)read a specific blog post by id
*/ 

/*
    routers for comments:--
    1)create a new comment
    2)read comments by blogs id that shows which user commented what at the blog
*/ 
module.exports = router;