const { model } = require("mongoose");
const slugify = require("slugify")
const CategoryModel = require("./category.model");

class CategoryService{
    transformCreateData = (req)=>{
        const data ={
            ...req.body
        }
        if(req.file){
            
            data.image = req.file.filename;
        }
        data.slug = slugify(data.title,{
            lower : true
        })

        //"null",''
        if(!data.parentId || data.parentId === 'null'|| data.parentId ===""){
            data.parentId = null;
        }
        data.createdBy = req.authUser._id;
        return data;

    }
    transformUpdateData =(req,existingData) =>{
        const data ={
            ...req.body
        }
        if(req.file){
            data.image = req.file.filename;
        }else{
            data.image = existingData.image
        }
         //"null",''
         if(!data.parentId || data.parentId === 'null'|| data.parentId ===""){
            data.parentId = null;
        }
        data.updatedBy = req.authUser._id;
        return data;
    }
    store = async(data) =>{
        try{
            const category = new CategoryModel(data);
            return await category.save()

        }catch(exception){
            throw exception
        }
    }
    count = async({filter}) =>{
        try{
            const countData = await CategoryModel.countDocuments(filter);
            return countData
        }catch(execption){
            throw execption
        }
    }
    listAll = async({limit, skip,filter={}}) =>{
        try{
            const response = await CategoryModel.find(filter)
            .populate("parentId",["_id","title","slug"])
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
            const data = await CategoryModel.findOne(filter);
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
            const updateResponse = await CategoryModel.findOneAndUpdate(filter,{$set: data})
            return updateResponse
        } catch(exception){
            throw exception;
        }
    }
    deleteOne = async(filter) =>{
        try{
            const response = await CategoryModel.findOneAndDelete(filter)
            if(!response){
                throw({code : 404, message :"category does not exits"})
            }
        } catch(exception){
            throw exception
        }
    }
    getForHome = async()=>{
        try{
            const data = await CategoryModel.find({
                status :"active"
            })
            .populate("parentId",["_id","title","slug"])
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
const categorySvc = new CategoryService()
module.exports = categorySvc;