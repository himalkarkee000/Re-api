const bcrypt = require("bcryptjs");

const {generateRandomString} = require('../../utilities/helpers');
const UserModel = require("../user/user.model")
class AuthService{
    transformRegisterData = (req) =>{
        try{
            
            let payload = req.body;

            payload.password = bcrypt.hashSync(payload.password, 10);

            //byceypt.compareSync(string ,hash)
            payload.status = 'inactive'
            payload.activationToken = generateRandomString(100)

            if(req.file){
                payload.image = req.file.filename;
            }
            return payload
        }catch(exception){
            throw exception;
        }
    }
    createUser = async(data) =>{
        try{
            const user = new UserModel(data)
            return await user.save()
        }catch(exception){
            throw exception;
        }
    }

    findOneUser = async(filter)=>{
        try{
            const userObj = await UserModel.findOne(filter);
            return userObj
        }catch(exception){
            throw exception
        }
    }
    updateUser =async(date, userId) =>{
        try{
            const result = await UserModel.findByIdAndUpdate(userId,{$set:date});
            return result;
        }catch(exception){
            throw exception
        }
    }
}
const authSvc = new AuthService()
module.exports = authSvc;
