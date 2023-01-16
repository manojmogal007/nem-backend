const express=require("express")
const {Postmodel}=require("../models/post.model")
const {authentication}=require("../middlewares/authentication.middleware")


const postRouter=express.Router()
postRouter.use(authentication)


postRouter.get("/",async(req,res)=>{
    const query=req.query
    try{
        if(query.device){
            const posts=await Postmodel.find({$and:[{device:query.device},{user_id:req.body.user_id}]})
            res.send({"msg":"All posts","posts":posts})
        }else if(query.device1 && query.device2){
            const posts=await Postmodel.find({$and:[{user_id:req.body.user_id},{$or:[{device:query.device1},{device:query.device2}]}]})
            res.send({"msg":"All posts","posts":posts})
        }else{
            const posts=await Postmodel.find({user_id:req.body.user_id})
            res.send({"msg":"All posts","posts":posts})
        }

        // const posts=await Postmodel.find()
        // res.send({"msg":"All posts","posts":posts})
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

postRouter.post("/create",async(req,res)=>{
    const new_post=req.body
    try{
        const post=new Postmodel(new_post)
        await post.save()
        res.send({"msg":"Post added"})
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const updated_post=req.body
    const id=req.params.id
    const post=await Postmodel.findOne({_id:id})
    const postuser_id=post.user_id
    const updated_post_id=updated_post.user_id
    try{
        if(postuser_id!==updated_post_id){
            res.send({"msg":"You are not authorized"})
        }else{
            await Postmodel.findByIdAndUpdate({_id:id},updated_post)
            res.send({"msg":"Post updated"})
        }
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const updated_post=req.body
    const id=req.params.id
    const post=await Postmodel.findOne({_id:id})
    const postuser_id=post.user_id
    const updated_post_id=updated_post.user_id
    try{
        if(postuser_id!==updated_post_id){
            res.send({"msg":"You are not authorized"})
        }else{
            await Postmodel.findByIdAndDelete({_id:id})
            res.send({"msg":"Post deleted"})
        }
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

module.exports={postRouter}


// {
//     "email":"manoj@gmail.com",
//     "password":"manoj@12"
//   }


// {
//     "title":"travel",
//     "body":"buggy",
//     "device":"pc"
//   }