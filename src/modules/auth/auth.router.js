// const express = require('express')
// const authRoute = express.Router();
const authRoute = require('express').Router();
const authCrtrl = require("./auth.controller")
const {bodyValidation} = require("../../middleware/validate.middleware")
const {registerDTO} = require("./auth.dto")
const {setPath,uploader}= require("../../middleware/uploader.middleware")
//express ====> Mount ====> Middleware

// request manipulate 
//next middleware call
//client respond



authRoute.post('/register',setPath('user'),uploader.single("images"),bodyValidation(registerDTO),authCrtrl.register)
authRoute.get("/activate/:token",authCrtrl.activate)
authRoute.post("/login",authCrtrl.login)

module.exports =authRoute