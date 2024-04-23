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
}
const bannerCtrl = new BannerController()
module.exports = bannerCtrl;