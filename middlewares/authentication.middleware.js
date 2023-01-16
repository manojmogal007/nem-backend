
const jwt=require('jsonwebtoken')


const authentication=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        var decoded = jwt.verify(token, 'media');
        if(decoded){
            console.log(decoded)
            const user_id=decoded.user_id
            req.body.user_id=user_id
            next()
        }else{
            res.send({"msg":"Login first"})
        }
    }else{
        res.send({"msg":"Login first"})
    }
}


module.exports={authentication}