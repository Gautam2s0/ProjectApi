const express=require("express")
const {connection}=require("./Configs/db")
const {ProductsRoute}=require("./Routes/Products")
const {orderRoute}=require("./Routes/Order")
const {cartRoute}=require("./Routes/Cart")
const {userRoute}=require("./Routes/User_route")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})
app.use("/cart",cartRoute)
app.use("/product",ProductsRoute)
app.use("/user",userRoute)
app.use("/order",orderRoute)

app.listen(port=process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("connected db")
    }
    catch(err){
        console.log(`not connect db: err:${err}`)
    }
    console.log(`server is running at port 8080 `)
})