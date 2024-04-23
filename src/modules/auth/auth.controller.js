const Joi = require("joi")
require("dotenv").config()
const mailSvc = require("../../services/mail.service")
const {generateRandomString} = require('../../utilities/helpers');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSvc = require("./auth.service");
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
            const data = authSvc.transformRegisterData(req)
            

            //TODO: DB Store
            const registeredData = await authSvc.createUser(data);

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
            result :registeredData,
            message : "Register successfully",
            meta : null

        })
    }catch(exception){
        console.log(exception)
        next(exception)
    }
    }
    login =async(req,res,next)=>{
        // TODO: DATA Validate
        //TODO : Ab query execute
        //TODO : OTP create
        // TODO : Client Response

        try{
            const {email , password} =req.body;

            //validate email exits

            const userDetails = await authSvc.findOneUser({
                email : email
            })
        // if user doesnt exist

        if(!userDetails){
            throw {code: 400, message:"User does not exit"}
        }
        //user do exits
        if(bcrypt.compareSync(password,userDetails.password)){
            //passsword do match
            if(userDetails.status !=='active'){
                throw {code: 400, message:"Your account has not activate please contact to the administration"}
            }
            //user is active
            const accessToken = jwt.sign({
                sub: userDetails._id
            },process.env.JWT_SECRET)

            const refreshToken = jwt.sign({
                sub: userDetails._id
            },process.env.JWT_SECRET,{
                expiresIn:"7d"
            })

            res.json({
                result :{
                    detail:{
                        _id: userDetails._id,
                        name: userDetails.name,
                        email: userDetails.email,
                        status: userDetails.status,
                        role: userDetails.role,
                        image: userDetails.image,
                    }
                },
                token :{
                    accessToken: accessToken,
                    refreshToken :""
                }
            })
        }else{
            throw {code: 400, message:"Crendentials does not match"}
        }
        }catch(exception){
            next(exception)
        }
    }
    activate = async(req, res,  next)=>{
        try{
            const token = req.params.token
            const associatedUser = await authSvc.findOneUser({
                activationToken :token
            })
            if(!associatedUser) {
                throw{code:400, message :"Token does not exits"}
            }
            const updateResult = await authSvc.updateUser({
                activationToken :null,
                status :"active"
            },associatedUser._id);

            res.json({
                result :updateResult,
                message :"Your account has been activate succesfully",
                meta : null
            })
        } catch(exception){
            next(exception)
        }
    }
    getloggedIn = async(req, res, next)=>{
        try{
            const loggedInUser = req.authUser;
            const response ={
                _id: loggedInUser._id,
                name: loggedInUser.name,
                email:loggedInUser.email ,
                role: loggedInUser.role,
                status: loggedInUser.status,
                image:loggedInUser?. image
                
            }
            res.json({
                result : loggedInUser,
                message : " Your Profile",
                meta : null
            })


        }catch(exception){
            next(exception)
        }
    }
    adminAccess = async(req,res,next)=>{
        try{
            res.json({
                result :"I am only access by admin",
                message:" Only by admin",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
}

// single term pattern

const authCrtrl = new AuthController()
module.exports= authCrtrl;