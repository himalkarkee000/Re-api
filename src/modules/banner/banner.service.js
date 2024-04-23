const { model } = require("mongoose")

class BannerService{
    transformCreateData = (req)=>{
        const data ={
            ...req.body
        }
        if(req.file){
            throw{code: 400, message :"image is required"}
        }else{
            data.image = req.file.filename;
        }
        data.createdBy = req.authUser._id;
        return data;

    }
    store = async(data) =>{
        try{
            const banner = new BannerModel(data);
            return await banner.save()

        }catch(exception){
            throw exception
        }
    }
}
const bannerSvc = new BannerService()
module.exports = bannerSvc;