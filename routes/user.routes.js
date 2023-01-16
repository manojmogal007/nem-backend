const express=require('express')
const {Usermodel}=require('../models/user.model')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userRouter=express.Router()

// userRouter.get("/",async(req,res)=>{
//     res.send("Welcome to users")
// })

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                console.log(err)
                res.send({"msg":"Signup unsuccessful"}) 
            }else{
                const user=new Usermodel({name,email,gender,password:hash})
                await user.save()
                res.send({"msg":"Signup successful"})
            }
        });
    }catch(err){
        console.log(err)
        res.send({"msg":"Signup unsuccessful"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await Usermodel.find({email})

    try{
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=>{
                // result == false
                if(result){
                    var token = jwt.sign({ user_id: user[0]._id }, 'media');
                    res.send({"msg":"Login successful","token":token})
                }else{
                    console.log(err)
                    res.send({"msg":"Please try again"})
                }
            });
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Please try again"})
    }
})

module.exports={userRouter}