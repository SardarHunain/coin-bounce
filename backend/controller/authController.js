//const { Db } = require("mongodb")
const Joi = require("joi");//input validation library
const User = require("../models/user");
const bcrypt = require("bcryptjs");//pkg for hashing passwords
const UserDTO = require("../dto/user");
const JWTService = require("../services/JWTService");
const RefreshToken = require('../models/token');
const { response } = require("express");

//password will be a regular expression where we define minimum and max characters in pssword atleast one capital and one  small letter
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;
//contains all the logic of handling the user requests that come from routes
const authController = {
   async register(req,res,next) {
//  1)user input validation
        //data send by the user should be in accordance with this schema below
    const userRegisterSchema = Joi.object({
        username: Joi.string().min(5).max(30).required(),
        name: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(passwordPattern).required(),
        confirmPassword: Joi.ref('password')
    }); 
        //validating the schema that whether data send by user is right or not
        const {error} = userRegisterSchema.validate(req.body); //if error not find null will be stored in error   
//  2)if error in validation return error via middleware. Middleware is a function that works between request and response. used for error handling
    if(error)
    {
        return next(error);//it will call the middleware function
    }
//  3)if email or username is already registered return an error
    const {username,name,email,password} = req.body;
        //check if email is unique
        try{
            const emailInUse = await User.exists({email});
            const usernameInUse = await User.exists({username});

            if(emailInUse)
            {
                const error = {
                    status : 409,//status of conflict error
                    message : 'email already registered use another email'
                }
                return next(error);
            }
            if(usernameInUse)
            {
                const error = {
                    status : 409,//status of conflict error
                    message : 'user name not available use another email'
                }
                return next(error);
            }
        }
        catch(error){
            return next(error);
        }

//    4)password hash
        //hash means the password enterd by user will be converted into a random string having any characters. It is irreversible.
        const hashedPassword = await bcrypt.hash(password,10);
        

//    5)store user data in Db
        let accessToken;
        let refreshToken;
        let user;

        try{
            const userToRegister = new User({
                username,//if key and value both are same we can write only one no eror occurs
                name,
                email,
                password: hashedPassword
            });
            //console.log(userToRegister);
            user = await userToRegister.save();
            
           //token generation
            accessToken = JWTService.signAccessToken({_id:user._id},'30m');
            refreshToken = JWTService.signRefreshToken({_id:user._id},'60m');
        }
        
        catch(error){
            return next(error);
        }
        //store refresh token in db
        await JWTService.storeRefreshToken(refreshToken,User._id);


        res.cookie('accessToken',accessToken,{
            maxAge: 1000*60*60*24,//expiry time of cookie
            httpOnly: true//it means cookie is only accessible at backend. javascript or browser cannot access it
        });

        res.cookie('refreshToken',refreshToken,{
            maxAge: 1000*60*60*24,//expiry time of cookie
            httpOnly: true//it means cookie is only accessible at backend. javascript or browser cannot access it
        });
        
//    6)send response to user
        const userDto = new UserDTO(user);
        
        return res.status(201).json({user:userDto,auth:true});       
},


    async login(req,res,next){
        // 1)validate user input
        const userLoginSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(), 
            password: Joi.string().pattern(passwordPattern).required(),
        });
        
        
        const {error} = userLoginSchema.validate(req.body);
        
        if(error){
            return next(error);
        }

        const {username, password} = req.body;

        let user;
        try{
            //match username
             user = await User.findOne({username});
            console.log(user);
            if(!user){
                const error = {
                    status: 401,
                    message: 'invalid username'
                }
                return next(error);
            }

            //match password
            const match = await bcrypt.compare(password, user.password);

            if(!match){
                const error = {
                status : 401,
                message: 'invalid password'
                }
                return next(error);
            }
        }
        catch(error){
            return next(error);
        }
        
        const accessToken = JWTService.signAccessToken({_id:user._id},'30m'); 
        const refreshToken = JWTService.signRefreshToken({_id:user._id},'60m');         

        //update refresh token in db
        try 
        {
           await RefreshToken.updateOne({
            _id:user._id
            },
            {token:refreshToken},
            {upsert:true}
            )
        }
        catch(error)
        {
            return next(error);
        }
        res.cookie('accessToken',accessToken,{
            maxAge: 1000*60*60*24,//expiry time of cookie
            httpOnly: true//it means cookie is only accessible at backend. javascript or browser cannot access it
        });

        res.cookie('refreshToken',refreshToken,{
            maxAge: 1000*60*60*24,//expiry time of cookie
            httpOnly: true//it means cookie is only accessible at backend. javascript or browser cannot access it
        });
        


        const userDto = new UserDTO(user);
        return res.status(200).json({user:userDto,auth:true});
        
        // 2)if validation error, send error message using middlewares
        // 3)match user name and password
        // 4)return response


    },

    //logout controller
    async logout(req,res,next){
        const {refreshToken}=req.cookies;
        //delete refresh token from database
        try{
            await RefreshToken.deleteOne({token:refreshToken});
        }
        catch(error){
            return next(error);
        }

        //clear cookie
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        //response
        res.status(200).json({user: null,auth:false});
    },
    async refresh(req, res, next) {
        //1. get refresh token from cookies

        //2. verify refresh token

        //3. generate new refresh tokens

        //4. update db, return response

        const originalRefreshToken = req.cookies.refreshToken;
        
        let id;
        try{
            id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
        }
        catch(e){
            const error = {
                status:401,
                message: 'unauthorized'
            }
            return next(error); 
        }

        try{
            const match = RefreshToken.findOne({_id : id,token:originalRefreshToken});
            if(!match) {
                const error = {
                    status:401,
                    message: 'unauthorized'
                }
                return next(error);
            }
        }
        catch(e)
        {
            return next(e); 
        }

        try{
            const accessToken = JWTService.signAccessToken({_id:id},'30m');
            const refreshToken = JWTService.signRefreshToken({_id:id},'60m');

            await RefreshToken.updateOne({_id:id},{token: refreshToken});

            res.cookie('accessToken',accessToken,{
                maxAge:1000*60*60*24 ,
                httpOnly:true
            });

            res.cookie('refreshToken',refreshToken,{
                maxAge:1000*60*60*24 ,
                httpOnly:true
            });
        }
        catch(e){
            return next(error);
        }

        const user = await User.findOne({_id:id});
        const userDto = new UserDTO(user);

        return res.status(200).json({user:userDto,auth:true});
    }
}
module.exports = authController;