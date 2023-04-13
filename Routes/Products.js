
const ProductsRoute = require("express").Router();

ProductsRoute.get("/",(req,res)=>{
    res.send("products")
})
//CREATE ,  Only Admin Authorised middleware(verifyTokenAndAdmin)



module.exports = {ProductsRoute}
