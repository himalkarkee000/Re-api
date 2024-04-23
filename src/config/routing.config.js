const express = require("express")
const mainRoute = express()

//Route import
const authRouter =require("../modules/auth/auth.router")
const userRouters = require("../modules/user/user.router")
const bannerRouter = require("../modules/banner/banner.router")


mainRoute.use('/auth',authRouter) // auth.router.js ==> routes
mainRoute.use('/user',userRouters)
mainRoute.use("/banner",bannerRouter)





module.exports= mainRoute;