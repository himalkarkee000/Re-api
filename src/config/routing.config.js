const express = require("express")
const mainRoute = express()

//Route import
const authRouter =require("../modules/auth/auth.router")
const userRouters = require("../modules/user/user.router")
const bannerRouter = require("../modules/banner/banner.router")
const brandRouter = require("../modules/brand/brand.router")
const categoryRouter = require("../modules/category/category.router")
const productRouter = require("../modules/product/product.router")
const cartRouter = require("../modules/cart/cart.router")


mainRoute.use('/auth',authRouter) // auth.router.js ==> routes
mainRoute.use('/user',userRouters)
mainRoute.use("/banner",bannerRouter)
mainRoute.use("/brand",brandRouter)
mainRoute.use("/category",categoryRouter)
mainRoute.use("/product",productRouter)
mainRoute.use("/order",cartRouter)





module.exports= mainRoute;