const Joi = require("joi")
require("dotenv").config()
const mailSvc = require("../../services/mail.service")
const {generateRandomString} = require('../../utilities/helpers');
const bcrypt = require("bcryptjs")
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

            payload.password = bcrypt.hashSync(payload.password, 10);

            //byceypt.compareSync(string ,hash)
            payload.status = 'inactive'
            payload.activationToken = generateRandomString(100)

            if(req.file){
                payload.image = req.file.filename;
            }

            //TODO: DB Store
            const registeredData ={
                ...payload,
                _id : 123
            }

            await mailSvc.sendEmail(
                "himalkarkee000@gmail.com",
                "Activate your account",
                `Dear ${registeredData.name} </br>
                <p>You have register your account with username <strong>${registeredData.email}</strong>.</p>
                <p>Please click the link below or copy and paste the url in browser to activate</p>
                <a href="${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}"> ${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}</a></br>
                <p>Regard,</p>
                <p>${process.env.SMTP_FROM}</p>
                <p><small><em>Please do not reply to this email via any mail service.</em></small></p>
                `
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
    activate = (req, res,  next)=>{
        try{
            const token = req.params.token
        }catch(exception){
            next(exception)
        }
    }
}

// single term pattern

const authCrtrl = new AuthController()
module.exports= authCrtrl;