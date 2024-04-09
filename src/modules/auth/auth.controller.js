const Joi = require("joi")
const mailSvc = require("../../services/mail.service")
class AuthController {

    register =async(req,res,next)=>{
        //email,name, password, role, file(optional)
    // TODO: Validation
    //TODO : DB query to store
    //TODO : Verification send via email
    //TODo : Client Response

        //url ===> /path ===> params
        //const params = req.params
        try{
            const payload = req.body;


            await mailSvc.sendEmail(
                "himalkarkee000@gmail.com",
                "Test Email",
                "<strong>Hello there</strong>"
            )
        res.json({
            result :payload,
            message : "Register successfully",
            meta : null

        })
    }catch(exception){
        console.log(exception)
        next(exception)
    }
    }
    login =(req,res,next)=>{
        // TODO: DATA Validate
        //TODO : Ab query execute
        //TODO : OTP create
        // TODO : Client Response
    }
}

// single term pattern

const authCrtrl = new AuthController()
module.exports= authCrtrl;