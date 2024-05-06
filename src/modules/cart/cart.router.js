const auth = require("../../middleware/auth.middleware")
const allowRole = require("../../middleware/rbac.middleware")
const { bodyValidator } = require("../../middleware/validate.middleware")
const cartDetailCtrl = require("./cart-detail.controller")
const { AddToCartDTO } = require("./cart-detail.dto")

const cartRouter = require("express").Router()




cartRouter.post('/add-to-cart',auth ,allowRole(['admin','buyer']),bodyValidator(AddToCartDTO),cartDetailCtrl.addToCart)

cartRouter.get("/my-cart-list",auth, cartDetailCtrl.listCart)



module.exports = cartRouter