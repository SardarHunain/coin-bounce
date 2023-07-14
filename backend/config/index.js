//here we will import all the environement variables
const PORT = process.env.PORT||3000;
const MONGODB_CONNECTION_STRING = "mongodb+srv://hunain:123abc@cluster0.owwex4k.mongodb.net/?retryWrites=true&w=majority";
BACKEND_SERVER_PATH = 'http://localhost:3000';
//exporting above two variables in form of object
module.exports =  {
    PORT,
    MONGODB_CONNECTION_STRING,
    BACKEND_SERVER_PATH
}
