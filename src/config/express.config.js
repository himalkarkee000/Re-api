const express = require('express');
const mongoose = require("mongoose")

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
    // console.log(error instanceof mongoose.MongooseError)
    let statusCode = error.code || 500; //server error
    let data = error.data|| null;
    let msg = error.message || "Internal server error";
    // console.log(statusCode,data,msg)
   
    if(error instanceof Joi.ValidationError){
        statusCode= 422
        msg= "Validation fail"
        data ={};
        const errorDetail = error.details
        if(Array.isArray(errorDetail)){
            errorDetail.map((errorObj)=>{
                data[errorObj.context.label] = errorObj.message
            })
        }
    }
    // error message // uniqueness fail
    if(+statusCode === 11000){
        statusCode = 400
        data ={};
        const fields = Object.keys(error.keyPattern)
        fields.map((fieldname)=>{
            data[fieldname]= fieldname+"should be unique"
        })
        msg = "Validation error"
    }
    res.status(statusCode).json({
        result:data,
        message:msg,
        meta: null
    })
})

module.exports= app;