const { Db } = require("mongodb")
const Joi = require("joi");//input validation library
const User = require("../models/user");
const bcrypt = require("bcryptjs");//pkg for hashing passwords

//password will be a regular expression where we define minimum and max characters in pssword atleast one capital and one small letter
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
//contains all the logic of handling the user requests that come from routes
const authController = {
   async register(req,res,next) {
//  1)user input validation
        //data send by the user should be in accordance with this schema below
    const userRegistrationSchema = Joi.object({
        username: Joi.string().min(5).max(30).required(),
        name: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(passwordPattern).required(),
        confirmPassword: Joi.ref('password')
    });
        //validating the schema that whether data send by user is right or not
        const {error} = userRegistrationSchema.validate(req.body); //if error not find null will be stored in error   
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
        const userToRegister = new User({
            username: username,//if key and value both are same we can write only one no eror occurs
            email: email,
            name: name,
            password: hashedPassword
        });
        await userToRegister.save();
//    6)send response to user
        return res.status(201).json({user})
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
             user = await user.findOne({username:username});

            if(!user){
                const error = {
                    status: 401,
                    message: 'invalid username'
                }
                return next(error);
            }

            //match password
            const match = await bcrypt.compare(password, user.password);

            if(!error){
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
        
        return res.status(200).json({user:user});
        
        // 2)if validation error, send error message using middlewares
        // 3)match user name and password
        // 4)return response


    }
}
module.exports = authController;