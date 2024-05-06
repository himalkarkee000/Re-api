const productSvc = require("../product/product.service");
const cartDetailSvc = require("./cart-detail.service");

class CartDetailController {
  addToCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const productDetail = await productSvc.findOne({
        _id: productId,
      });

      const newCartObject = cartDetailSvc.transformCartObject(
        productDetail,
        quantity,
        req.authUser
      );
      const existing = await cartDetailSvc.findOne({
        status: "pending",
        productId: productId,
        buyerId: req.authUser._id,
        orderId: null,
      });

      if (existing) {
        //update
        if (quantity <= 0) {
          //remove from cart
          const removed = await cartDetailSvc.removeFromCartById(existing._id);
          res.json({
            result: removed,
            message: "cart item removed successfully",
            meta: null,
          });
        } else {
          existing.quantity = quantity;
          existing.amount = productDetail.afterDiscount * quantity;
          existing.productDetail.price = productDetail.price;
          existing.productDetail.discount = productDetail.discount;
          existing.productDetail.afterDiscount = productDetail.afterDiscount;

          const update = await existing.save();
          res.json({
            result: existing,
            message: "cart Updated Successfully.",
            meta: null,
          });
        }
      } else {
          //store operation
        if(quantity>=1){
            
            const cart = await cartDetailSvc.createCart(newCartObject);
            res.json({
              result: cart,
              message: "Product add in cart",
              meta: null,
            });
        }else{
            throw{ code : 422, message :"Quantity should be always grater or equal to 1"}
        }
      }
    } catch (exception) {
      next(exception);
    }
  };
  listCart = async(req,res,next) =>{
    try{
        const loggedInUser =req.authUser;
        let filter = {
            orderId : null
        }
        let cartItems = null;
        //admin
        if(loggedInUser.role === 'admin'){
            cartItems = await cartDetailSvc.findAll(filter)
        } else if(loggedInUser.role === 'seller'){

          filter =  {
            ...filter,
            sellerId : loggedInUser._id,
            sellerId: {$ne: null}
          }
          cartItems = await cartDetailSvc.findAll(filter)

        }else if(loggedInUser.role === 'customer'){
          filter ={
            ...filter,
            buyerId : loggedInUser._id
          }
          cartItems = await cartDetailSvc.findAll(filter)

        }
        res.json({
          result :cartItems,
          message : "Your cart List",
          meta : null

        })
    } catch(exception){
        next(exception)
    }
  }
}

const cartDetailCtrl = new CartDetailController();
module.exports = cartDetailCtrl;
