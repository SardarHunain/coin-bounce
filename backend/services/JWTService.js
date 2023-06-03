const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = '6cebfe01e45f16427666fff53a4b9a6c082f1c809e667073e9c65d109d9a3638d59c0da6b8bb390f5673b3c72e9d0aedbd16b71bf2147541a31f292372e36b61' ;
const REFRESH_TOKEN_SECRET = '038a3b6ea4a126aa4322aa6e13260812754afa0ac8664f14174932687a1a220015d0a143bd36953caaf2cd9a4db2f11124c43d72d578978ac06391ef07731108';  
const RefreshToken = require('../models/token');

class JWTService{
    //sign access token
    static signAccessToken(payload,expiryTime ){
        return jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn:expiryTime});
    }
    //sign refresh token
    static signRefreshToken(payload,expiryTime){
        return jwt.sign(payload,REFRESH_TOKEN_SECRET,{expiresIn:expiryTime});
    }
    //verify access token
    static verifyAccessToken(token){
        return jwt.verify(token,ACCESS_TOKEN_SECRET);
    }
    //verify refresh token
    static verifyRefreshToken(token){
        return jwt.verify(token,REFRESH_TOKEN_SECRET);
    }
    //store refresh token
    static async storeRefreshToken(token,userId)
    {
        try
        {
            const newToken = new RefreshToken({
                token: token,
                userId: userId
            });

            //store in db
            await newToken.save();
        }
        catch(error)
        {
            console.log(error);
        }
    }
}

module.exports = JWTService;