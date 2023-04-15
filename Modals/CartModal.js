const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type:mongoose.Schema .ObjectId , required: false },
    productId:{ type:mongoose.Schema .ObjectId, required: true },
    quantity: 1 ,
    rating:{ type: Number, required: true },
    categories: { type: String },
    title: { type: String, required: true},
    price: { type: Number, required: true },
    realPrice:{ type: Number, required: true },
    mainImage:{type:String,require:true}
  },
  { timestamps: true }
);
const CartModel=mongoose.model("Cart", CartSchema);

module.exports = {
    CartModel
}
