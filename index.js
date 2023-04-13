const express=require("express")
const {connection}=require("./Configs/db")
const {ProductsRoute}=require("./Routes/Products")
const {OrderRouter}=require("./Routes/Order")
const {Cartrouter}=require("./Routes/Cart")
const {userRouter}=require("./Routes/User_route")
const cors=require("cors")


const app=express()

app.use(cors())
app.use(express.json())

app.use("/cart",Cartrouter)
app.use("/products",ProductsRoute)
app.use("/user",userRouter)
app.use("/order",OrderRouter)

app.get("/",(req,res)=>{
    res.send("home page")
})



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