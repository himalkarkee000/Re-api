const express = require("express")
const mainRoute = express()

//Route import
const authRouter =require("../modules/auth/auth.router")
const userRouters = require("../modules/user/user.router")


mainRoute.use('/auth',authRouter) // auth.router.js ==> routes
mainRoute.use('/user',userRouters)





module.exports= mainRoute;