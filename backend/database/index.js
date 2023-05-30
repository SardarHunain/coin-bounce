//contains all the connection code

const mongoose = require('mongoose');
const {MONGODB_CONNECTION_STRING} = require('../config/index');

const dbConnect = async()=>{
    try 
    {
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect("mongodb+srv://hunain:123abc@cluster0.owwex4k.mongodb.net/?retryWrites=true&w=majority");    
        console.log(`database connected to host:   ${conn.connection.host}`);
    } 
    catch (error) 
    {
        console.log(`error:- ${error}`);    
    }
   
}

module.exports = dbConnect;