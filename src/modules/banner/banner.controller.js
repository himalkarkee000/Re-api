const bannerSvc = require("./banner.service");

class BannerController {
    create = async(req,res,next) =>{
        try{
            const payload = bannerSvc.transformCreateData(req)
            const createBanner = await bannerSvc.store(payload)
            res.json({
                result : createBanner,
                message :"Banner Created Successfully",
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

            const data = await bannerSvc.listAll({
                limit : limit,
                skip : skip,
                filter : filter

        });
        const countData = await bannerSvc.count({
            filter : filter
        })
            res.json({
                result : data,
                message:"Banner list",
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
            const detail = await bannerSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result : detail,
                message : " Banner detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }

    update = async(req,res,next) =>{
        try{
            const existingData = await bannerSvc.findOne({
                _id : req.params.id
            })
            const payload = bannerSvc.transformUpdateData(req, existingData);
            const updateStatus = await bannerSvc.update({_id: req.params.id}, payload);
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
            const exists = await bannerSvc.findOne({_id: req.params.id})
            const status = await bannerSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : "Banner deleted successfully",
                meta : null
            })

        } catch(exception){
            next(exception)
        }
    }
    listForHome = async(req,res, next)=>{
        try{
                const list = await bannerSvc.getForHome()
                res.json({
                    result : list,
                    message : "Banner listed successfully",
                    meta : null
                })
        } catch (exception){
            next(exception)
        }
    }
}
const bannerCtrl = new BannerController()
module.exports = bannerCtrl;