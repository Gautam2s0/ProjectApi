const orderRoute = require("express").Router();

orderRoute.get("/",(req,res)=>{
    res.send("order")
})

module.exports = {orderRoute}
