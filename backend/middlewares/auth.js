const JWTService = require('../services/JWTService');
const User = require('../models/user');
const UserDTO = require('../dtos/user');

const auth = async(req,res,next)=>{
    //refresh, access token validation
    const {refreshToken,accessToken} = req.cookies;

    if(!refreshToken||!accessToken)
    {
        const error = {
            status: 401,
            message: 'unauthorized'
        }
        return next(error);
    }
    let_id;
    try{
        _id = JWTService.verifyAccessToken(accessToken);
    }
    catch(error){
        return next(error);
    }

    let user;
    try{
        user = await User.findOne({_id: _id});
    }
    catch(error){
        return next(error);
    }
    const userDto = new UserDto(user);
    req.user = userDto;
    
    next();
}