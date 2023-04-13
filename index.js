
const express = require("express");
require("dotenv").config();
const { connection } = require("./Configs/db");
const { userRouter } = require("./Routes/User.route");
const { ProductsRoute } = require("./Routes/productRoute");
const { Cartrouter } = require("./Routes/Cart");
const cors = require("cors");
const app = express();
const session = require("express-session");
// const {authenticate}=require("./Middlewares/Auth.middleware")
const {OrderRouter}=require("./Routes/Order")


// middlewares:-
app.use(cors());
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.secretKey,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//     },
//   })
// );
app.get("/",(req,res)=>{
  res.send("home page")
})
app.use("/users", userRouter);
// app.use(authenticate)
app.use("/products",ProductsRoute)
app.use("/cart",Cartrouter)
app.use("/order",OrderRouter)


//connect to the server:-
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(`Cannot connect to DB: ${err}`);
  }
  console.log(`Server is running on http://localhost:${process.env.port}`);
});
