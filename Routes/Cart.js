const cartRoute = require("express").Router();

cartRoute.get("/",(req,res)=>{
    res.send("cart")
})

module.exports = {cartRoute }
