const { Db } = require("mongodb")

//contains all the logic of handling the user requests that come from routes
const authController = {
   async register(req,res,next) {
/*  1)user input validation
    2)if error in validation return error cia middleware
    3)if email or username is already registered return an error
    4)password hash
    5)store user data in Db
    6)send response to user
*/   
},
    async login(){}
}
module.exports = authController;