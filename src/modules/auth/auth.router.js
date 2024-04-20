// const express = require('express')
// const authRoute = express.Router();
const authRoute = require('express').Router();
const authCrtrl = require("./auth.controller")
const {bodyValidator} = require("../../middleware/validate.middleware")
const {registerDTO,loginDTO} = require("./auth.dto")
const {setPath,uploader}= require("../../middleware/uploader.middleware")
//express ====> Mount ====> Middleware

// request manipulate 
//next middleware call
//client respond



authRoute.post('/register',setPath('user'),uploader.single("images"),bodyValidator(registerDTO),authCrtrl.register)
authRoute.get("/activate/:token",authCrtrl.activate)
authRoute.post("/login",bodyValidator(loginDTO),authCrtrl.login)
authRoute.get("/me",authCrtrl.getloggedIn)

module.exports =authRoute