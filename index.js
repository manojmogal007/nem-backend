const express=require('express')
const {connection}=require('./configs/db')
require('dotenv').config()
const {userRouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
const cors=require('cors')


const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to database")
    }catch(err){
        console.log(err)
        console.log("Database connection error")
    }
    console.log(`Server started on port ${process.env.port}`)
})


