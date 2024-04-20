const express = require('express');
require("./db.config")
const helmet = require("helmet")
const cors =require("cors")
const Joi = require("joi")

const app = express();


app.use(helmet());
app.use(cors())

const mainRouter = require("./routing.config");

// const parser = require("body-parser");

const router =express.Router()

//throttle
//sanitization


//body parser
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

// static middleware
app.use('/assets/images',express.static('./public/images'))

router.get('/health',(req,res, next)=>{
    res.json({
        result:"hello there",
        message:" Succcess OK",
        meta : null
    })
})

app.use(router)

app.use(mainRouter)
// routing
// app.use("/",(request,respond)=>{
//     respond.status(404).json({
//         result :"pass",
//         message :"Success",
//         meta : "null"
//     })
// })


//404 
app.use((req,res, next)=>{
    //throw new Error ({message: "Resouce not found "},code : 404)
    next({code : 404, message :"Resource Not Found"})
});
//Error handling middleware
app.use((error, req, res, next)=>{
    //next(args)
    const statusCode = error.code || 500; //server error
    const data = error.data|| null;
    const msg = error.message || "Internal server error";
    // console.log(statusCode,data,msg)
    res.status(statusCode).json({
        result:data,
        message:msg,
        meta: null
    })
    if(error instanceof Joi.ValidationError){
        statusCode:422;
        msg:"Validation fail";
        data :{};
        const errorDetail = error.details
        if(Array.isArray(errorDetail)){
            errorDetail.map((errorDetail)=>{
                data[errorObj.context.label] = errorObj.message
            })
        }
    }
})

module.exports= app;