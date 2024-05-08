const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const cartDetailCtrl = require("./cart-detail.controller");
const { AddToCartDTO, PlaceOrderDTO } = require("./cart-detail.dto");

const cartRouter = require("express").Router();

cartRouter.post(
  "/add-to-cart",
  auth,
  allowRole(["admin", "buyer"]),
  bodyValidator(AddToCartDTO),
  cartDetailCtrl.addToCart
);

cartRouter.get(
  "/my-cart-list",
  auth,
  allowRole(["admin", "customer"]),
  cartDetailCtrl.listCart
);

cartRouter.post(
  "/place-order",
  auth,
  allowRole(["admin", "customer"]),
  bodyValidator(PlaceOrderDTO),
  cartDetailCtrl.placeOrder
);
cartRouter.get("/my-orders",auth,allowRole(["admin", "customer"]),cartDetailCtrl.listMyOrder) 
cartRouter.get("/my-orders-list",auth,allowRole(['seller']),cartDetailCtrl.myOrder) 

cartRouter.get("/order-complete/:id",auth,allowRole(['admin','seller']),cartDetailCtrl.updateOrderStatus) 

module.exports = cartRouter;
