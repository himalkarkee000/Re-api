const brandSvc = require("./brand.service");

class BrandController {
    create = async(req,res,next) =>{
        try{
            const payload = brandSvc.transformCreateData(req)
            const createBrand = await brandSvc.store(payload)
            res.json({
                result : createBrand,
                message :"Brand Created Successfully",
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

            const data = await brandSvc.listAll({
                limit : limit,
                skip : skip,
                filter : filter

        });
        const countData = await brandSvc.count({
            filter : filter
        })
            res.json({
                result : data,
                message:"Brand list",
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
            const detail = await brandSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result : detail,
                message : " Brand detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }

    update = async(req,res,next) =>{
        try{
            const existingData = await brandSvc.findOne({
                _id : req.params.id
            })
            const payload = brandSvc.transformUpdateData(req, existingData);
            const updateStatus = await brandSvc.update({_id: req.params.id}, payload);
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
            const exists = await brandSvc.findOne({_id: req.params.id})
            const status = await brandSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : "Brand deleted successfully",
                meta : null
            })

        } catch(exception){
            next(exception)
        }
    }
    listForHome = async(req,res, next)=>{
        try{
                const list = await brandSvc.getForHome()
                res.json({
                    result : list,
                    message : "Brand listed successfully",
                    meta : null
                })
        } catch (exception){
            next(exception)
        }
    }
    getBrandBySlug = async(req,res,next) =>{
        try{

            const slug = req.params.slug;
            const detail = await brandSvc.findOne({
                slug : slug,
                status :"active"
            })
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15;
            const skip = (page - 1) * limit;
            let filter = {
                status : "active",
                brand : "detail._id"
            };
            // filter
            if(req.query.search){
                // ? search = filter
                filter ={
                    ...filter,
                    title : new RegExp(req.query.search,"i"),
                    summary : new RegExp(req.query.search,"i"),
                    description : new RegExp(req.query.search,"i")
                }
            }
            const total = await productSvc.count(filter);
            
            const relatedProducts = await  productSvc.listAll({
                limit : limit,
                skip : skip,
                filter :filter
            })
            res.json({
                result :{
                    catDetail: detail,
                    productList :relatedProducts
                },
                message :"Product list by brand slug",
                metal : {
                    page : page,
                    limit : limit,
                    total: total

                }
            })
        }catch(exception){
            next(exception)
        }
    }
}
const brandCtrl = new BrandController()
module.exports = brandCtrl;