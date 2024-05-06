const { model } = require("mongoose");
const slugify = require("slugify")
const ProductModel = require("./product.model");

class ProductService{

    uniqueSlug = async(slug) =>{
        try{
            const productExits = await ProductModel.findOne({
                slug : slug
            })
            if(productExits){
                //not unique
                const time = Date.now;
                slug = slug+"-"+time;
               return  await this.uniqueSlug(slug)
            }else{
                //unique
                return slug
            }

        }catch(exception){
            throw(exception)
        }
    }

    transformCreateData = async(req)=>{
        try{
            const data ={
                ...req.body
            }
            console.log("file",req.file)
            if(req.files){
                let images = []
                req.files.map((image) =>{
                    images.push(image.filename);
                }) 
                data.image = images;
            
            }else{
                data.image = null;
            }
            let slug = slugify(data.title,{
                lower : true
            })

            slug = await this.uniqueSlug(slug)
            console.log("Slug",this.uniqueSlug)
            data.slug = slug
            
    
            //afterDiscount 
            data.afterDiscount = data.price - data.price*data.discount/100;
    
            //"null",''
            if(!data.sellerId || data.sellerId === 'null'|| data.sellerId ===""){
                data.sellerId = null;
            }
            //brand set null if not present
            if(!data.brand || data.brand === 'null'|| data.brand ===""){
                data.brand = null;
            }
            if(!data.categories || data.categories === 'null'|| data.categories ===""){
                data.categories = null;
            }
            data.createdBy = req.authUser._id;
            return data;
        }catch(exception){
            throw exception
        }

    }
    transformUpdateData =(req,existingData) =>{
        const data ={
            ...req.body
        }
        let images = [...existingData.images]
        if(req.files){
            req.file.map((image) =>{
                images.push(image.filename)
            })
            data.images = images
        }else{
            data.image = null;
        }
        //afterDiscount 
        data.afterDiscount = data.price - data.price*data.discount/100;
    
        //"null",''
        if(!data.sellerId || data.sellerId === 'null'|| data.sellerId ===""){
            data.sellerId = null;
        }
        if(!data.brand || data.brand === 'null'|| data.brand ===""){
            data.brand = null;
        }
        if(!data.categories || data.categories === 'null'|| data.categories ===""){
            data.categories = null;
        }
        
         
        data.updatedBy = req.authUser._id;
        return data;
    }
    store = async(data) =>{
        try{
            const product = new ProductModel(data);
            return await product.save()

        }catch(exception){
            throw exception
        }
    }
    count = async({filter}) =>{
        try{
            const countData = await ProductModel.countDocuments(filter);
            return countData
        }catch(execption){
            throw execption
        }
    }
    listAll = async({limit, skip,filter={}}) =>{
        try{
            const response = await ProductModel.find(filter)
            .populate("categories",["_id","title","slug"])
            .populate("brand",["_id","title","slug"])
            .populate("sellerId",["_id","name","email","role"])
            .populate("createdBy",["_id","name","email","roll"])
            .populate("updatedBy",["_id","name","email","roll"])
            .sort({_id : "desc"})
            .skip(skip)
            .limit(limit)
            
            return response;
        }catch(execption){
            throw execption
        }
    }
    findOne = async(filter) =>{
        try{
            const data = await ProductModel.findOne(filter)
            .populate("categories",["_id","title","slug"])
            .populate("brand",["_id","title","slug"])
            .populate("sellerId",["_id","name","email","role"])
            .populate("createdBy",["_id","name","email","roll"])
            .populate("updatedBy",["_id","name","email","roll"])
            if(!data){
                throw{ code : 400, message:"data not found"}
            }
            return data;
        }catch(exception){
            throw exception
        }
    }
    update = async(filter,data)=>{
        try{
            const updateResponse = await ProductModel.findOneAndUpdate(filter,{$set: data})
            return updateResponse
        } catch(exception){
            throw exception;
        }
    }
    deleteOne = async(filter) =>{
        try{
            const response = await ProductModel.findOneAndDelete(filter)
            if(!response){
                throw({code : 404, message :"product does not exits"})
            }
        } catch(exception){
            throw exception
        }
    }
    getForHome = async()=>{
        try{
            const data = await ProductModel.find({
                status :"active"
            })
            .populate("categories",["_id","title","slug"])
            .populate("brand",["_id","title","slug"])
            .populate("sellerId",["_id","title","slug"])
            .populate("createdBy",["_id","name","email","roll"])
            .populate("updatedBy",["_id","name","email","roll"])
            .sort({_id :"desc"})
            .limit(10)
            return data;
        } catch(exception){
            throw exception
        }
    }
}
const productSvc = new ProductService()
module.exports = productSvc;