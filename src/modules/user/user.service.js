const UserModel = require("./user.model");

class UserService {
        count = async({filter}) =>{
            try{
                const countData = await UserModel.countDocuments(filter);
                return countData;
            }catch(execption){
                throw execption
            }
        }
        listAll = async({limit, skip,filter={}}) =>{
            try{
                const response = await UserModel.find(filter)
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

}
const userSvc = new UserService()
module.exports = userSvc;