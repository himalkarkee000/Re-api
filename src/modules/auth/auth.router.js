// const express = require('express')
// const authRoute = express.Router();
const authRoute = require('express').Router();
const authCrtrl = require("./auth.controller")
const auth = require("../../middleware/auth.middleware")
const allowRole = require("../../middleware/rbac.middleware")
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
authRoute.get("/me",auth,authCrtrl.getloggedIn)
authRoute.get("/admin",auth,allowRole(['admin','seller']),authCrtrl.adminAccess)
module.exports =authRoute