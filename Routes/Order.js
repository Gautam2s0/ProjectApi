const {OrderModel }= require("../Modals/OrderModal");
const {verifyTokenAndAdmin,} = require("../Middlewares/VerifyTokenAndAdmin");
const {AddUserIdInCart}=require("../Middlewares/AddUserIdInCart")

const { mongoose } = require("mongoose");

const OrderRouter = require("express").Router();


//  USER SIDE

//********************** CREATE   Logged User only ***************************

OrderRouter.post("/add",AddUserIdInCart, async (req, res) => {
    const userId=req.userId
   console.log(userId)
  try {
    const newOrder = new OrderModel({...req.body,userId});
    const savedOrder = await newOrder.save();
    console.log({newOrder})
    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//****************************** GET USER ORDERS  --> user can access only own cart itmes **************************

OrderRouter.get("/",AddUserIdInCart, async (req, res) => {
  const id=new mongoose.Types.ObjectId(req.userId)
  // console.log(req.params.id
  try {
     const orders=await OrderModel.aggregate([
      {
        $match: {
          userId: id,
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      }
    ])
    const order=await OrderModel.find().populate("productId")
    orders.length>0?res.status(200).send(orders):res.status(200).send({msg:"looks like you did't place any order so for"})
  } catch (err) {
    res.status(500).send(err);
  }
    
});

OrderRouter.patch("/cancel/:id",AddUserIdInCart, async (req, res) => {
  // console.log(req.params.id)
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      {_id:req.params.id},
      {
        $set: {isCanceled:true},
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
    
});


//  ADMIN SIDE

// *************  UPDATE --> Only Admin has access*********************

OrderRouter.patch("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  // console.log(req.params.id)
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      {_id:req.params.id},
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
    
});

//**************************  DELETE  Only Admin has access to preform  ****************************

OrderRouter.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

// *******************************GET ALL  (Total order)-->  Only Admin has access to preform  ****************


OrderRouter.get("/all", verifyTokenAndAdmin, async (req, res) => {

  try {
    const orders = await OrderModel.find()
    orders.length > 0
      ? res.status(200).send(cart)
      : res.status(200).send("No orders placed yet");
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = {
    
    OrderRouter
    
};
