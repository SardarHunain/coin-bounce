const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({ 
    name: {type: String,required: true},
    username: {type: String,required: true},
    email: {type: String,required: true},
    password: {type: String,required: true}
},
    {timestamps:true}
);

//by using first arguement i-e User we will import our schema wherever required
//using 3rd arguement name connection will be stored in database
module.exports = mongoose.model('User',userSchema,'users');
