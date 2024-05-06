const productSvc = require("./product.service");

class ProductController {
    create = async(req,res,next) =>{
        try{
            const payload = await productSvc.transformCreateData(req)
            const createProduct = await productSvc.store(payload)
            res.json({
                result : createProduct,
                message :"Product Created Successfully",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    index= async(req,res,next) =>{
        try{
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15;
            const skip = (page - 1) * limit;


        // 1- 100
        // per page ====>15
        // 1 - 15 ====> page 1
        // 16- 30 ===> page 2
        // 31 - 45 ===> page 3

        let filter = {};
        // filter
        if(req.query.search){
            // ? search = filter
            filter ={
                title : new RegExp(req.query.search,"i")
            }
        }

            const data = await productSvc.listAll({
                limit : limit,
                skip : skip,
                filter : filter

        });
        const countData = await productSvc.count({
            filter : filter
        })
            res.json({
                result : data,
                message:"Product list",
                meta : {
                    limit : limit,
                    page : page,
                    total : countData
                }
    
            })
        }catch(exception){
            next(exception)
        }
    }
    show = async(req,res,next) =>{
        try{
            const detail = await productSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result : detail,
                message : " Product detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }

    update = async(req,res,next) =>{
        try{
            const existingData = await productSvc.findOne({
                _id : req.params.id
            })
            const payload = productSvc.transformUpdateData(req, existingData);
            const updateStatus = await productSvc.update({_id: req.params.id}, payload);
            res.json({
                result : updateStatus,
                message :"Data updated",
                meta : null
            })
        } catch(exception){
            next(exception)
        }
    }
    delete =async(req,res,next)=>{
        try{
            const exists = await productSvc.findOne({_id: req.params.id})
            const status = await productSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : "Product deleted successfully",
                meta : null
            })

        } catch(exception){
            next(exception)
        }
    }
    listForHome = async(req,res, next)=>{
        try{
                const list = await productSvc.getForHome()
                res.json({
                    result : list,
                    message : "Product listed successfully",
                    meta : null
                })
        } catch (exception){
            next(exception)
        }
    }
    getProductDetailBySlug = async(req,res,next)=>{
        try{
            const slug = req.params.slug;
            const filter = {
                slug : slug,
                status : "active"

            }
            const productDetail = await productSvc.findOne(filter)
            const relatedFilter = {
                categories: {$in : productDetail.categories},
                _id:{$ne : productDetail._id},
                status : "active"
            }
            const relatedProducts = await productSvc.listAll({limit:12,skip:0,filter:relatedFilter});
            res.json({
                result :{
                    detail : productDetail,
                    relatedProduct: relatedProducts
                },
                message :"Product List",
                meta : null
            })

        } catch(exception){
            next(exception)
        }
    }
}
const productCtrl = new ProductController()
module.exports = productCtrl;