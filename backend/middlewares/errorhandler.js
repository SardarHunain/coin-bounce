//Imp Note:- error provided by joi is a validation error
const {ValidationError} = require('joi');

const errorhandler = (error,req,res,next) => {
    //setting default error
    let status = 500;
    let data = {
        message: 'Internal Server Error'
    }
    if(error instanceof ValidationError) {
        status = 401;
        data.message = error.message;

        return res.status(status).json(data);
    }

    if(error.status){//if error has a status property in it than we wll change its status from 500
        status = error.status;
    }

    if(error.message){
        data.message = error.message;
    }

    return res.status(status).json(data);
}

module.exports = errorhandler;