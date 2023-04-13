const userRoute = require("express").Router();

userRoute.get("/",(req,res)=>{
    res.send("uswer")
})
//CREATE ,  Only Admin Authorised middleware(verifyTokenAndAdmin)



module.exports = {userRoute}
