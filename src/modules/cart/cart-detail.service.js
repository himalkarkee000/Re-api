const CartDetailModel = require("./cart-detail.model");
const orderModel = require("./order.model");

class CartDetailService {
  transformCartObject = (product, quantity, user) => {
    let currentCartproduct = {
      buyerId: user._id,
      productId: product._id,
      orderId: null,
      productDetail: {
        title: product.title,
        slug: product.slug,
        price: product.price,
        afterDiscount: product.afterDiscount,
        discount: product.discount,
      },
      quantity: quantity,
      amount: product.afterDiscount * quantity,
      sellerId: product?.sellerId,
      status: "pending",
      isPaid: false,
      createdBy: user._id,
      updatedBy: user._id,
    };
    return currentCartproduct;
  };
  findOne = async (filter) => {
    try {
      const result = await CartDetailModel.findOne(filter);
      return result;
    } catch (exception) {
      next(exception);
    }
  };
  removeFromCartById = async (id) => {
    try {
      const removed = await cartDetailSvc.removeFromCartById(_id);

      if (remove) {
        return remove;
      } else {
        throw { code: 404, message: "Data does not exit" };
      }
    } catch (exception) {
      next(exception);
    }
  };
  createCart = async(data) =>{
    try{
        const cart = new CartDetailModel(data);
        return await cart.save()
    } catch (exception) {
      next(exception);
    }
  }
  findAll = async(filter) =>{
    try{
      const detail = await CartDetailModel.find(filter)
      .populate('orderId')
      .populate('buyerId',['_id','name','email','role'])
      .populate("productId")
    return detail;
    } catch(exception){
      throw exception
    }
  }
  placeOrder = async(data,cartId) =>{
    try{

      const order = new orderModel(data)
      //order created 

      await CartDetailModel.updateMany({
        _id: {$in : [...cartId]}
      },{
        $set :{
          orderId : order._id,
          status:"ordered"
        }
      })
      return order;
    } catch(exception){
      throw exception
    }
  }
  getOrderList = async(filter) =>{
    try{
      const orderList = await orderModel.find(filter)
      .populate("buyerId",["_id","name","email","phone","address"])
      .populate("cartDetail")
      .sort({"createdBy": "desc"})
      return orderList

    } catch(exception){
      throw exception
    }
  }
  updateCartDetail = async(filter,updateBody) =>{
    try{
      const status = await orderModel.updateOne(filter,{
        $set : updateBody
      })
      await this.updateCartDetail({
        orderId : filter._id,
        status : "ordered"
      })

    } catch(exception){
      throw exception
    }
  }
}

const cartDetailSvc = new CartDetailService();
module.exports = cartDetailSvc;
