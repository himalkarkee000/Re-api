const multer = require('multer')
const fs = require('fs')
const {generateRandomString} = require("../utilities/helpers")

const setPath = (path)=>{
    return(req,res,next)=>{
        req.uploadDir = path
        next()
    }

}


const myStorage = multer.diskStorage({
    destination : (req,file,cb) =>{
        const path = "./public/uploads/"+ req.uploadDir
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{
                recursive:true
            })
        }
        cb(null, path)
    },
    filename :(req,file,cb)=>{
        //  /users/user-1.jpg ====> /users/user-1.jpg

        // const randomNo = Math.ceil(Math.random()*9999)

        // console.log(file)

        //"filename.ext"=> ["filename","ext"].pop()==>'ext'

        const ext = file.originalname.split(".")
        const filename = Date.now()+"-"+generateRandomString(10)+"."+ext;
        cb(null,filename);

    }
})

const imageFilter = (req,file,cb) =>{
    const ext = file.originalname.split(".").pop()
    const allowed = ['jpg','jpeg','png','svg','webp','gif','bmp']
    if(allowed.includes(ext.toLowerCase())){
        cb(null,true)
    }else{
        cb({code: 400, message :"Image formate not supported" })
    }
}
const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits:{
        fileSize:3000000
    }
});
module.exports = {
    uploader,
    setPath
}