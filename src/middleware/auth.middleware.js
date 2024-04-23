require("dotenv").config()
const jwt = require("jsonwebtoken")
const authSvc = require("../modules/auth/auth.service")

const auth = async(req,res,next) =>{
    try{

        let token = req.headers['authorization'] || null;

        if(!token){
            next({code :401, message:"Token/ Access code require"})
        }
        // Bearer token ===> ["bearer","token"].pop()
        token = token.split(" ").pop()
        //token verify
        // Signature,expiry, formating
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(tokenData)
        const userDetail = await authSvc.findOneUser({
            _id : tokenData.sub
        })
        if(!userDetail){
            next({code:401 , message:"User details does not exit anymore"})
        }
        req.authUser = userDetail;
        next() // allow the user access
    
    }catch(exception){
        console.log("Exception",exception)
        next({code:401, message:"Unauthorized access"})
    }
}

module.exports = auth