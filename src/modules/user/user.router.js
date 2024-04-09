const userRouters = require('express').Router();
// const express = require("express");
// const userRouters = express();

const authCrtrl = require("../auth/auth.controller")
userRouters
  .route("/")
  .post((req, res, next) => {})
  .get((req, res, next) => {});
// userRouters.post('/',(req,res,next)=>{
//     //create
// })

// userRouters.get('/',(req,res,next)=>{
//     //list all
// })

userRouters.route("/:id")
  .get((req, res, next) => {
    //view details
  })
  .patch((req, res, next) => {
    //Update
  })
  .delete((req, res, next) => {
    //delete
  })

// userRouters.get('/:id',(req,res,next)=>{
//     //view details
// })

// userRouters.patch('/:id',(req,res,next)=>{
//     //update
// })

// userRouters.delete('/:id',(req,res,next)=>{
//     //Delete
// })


//CRUD
  // /user/:id/history-order


module.exports = userRouters;
