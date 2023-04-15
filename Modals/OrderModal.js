const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, required: true },
    productId: {type:mongoose.Schema.ObjectId},

    quantity: 1 ,
    rating:{ type: Number, required: true },
    categories: { type: String },
    title: { type: String},
    price: { type: Number},
    realPrice:{ type: Number},
    mainImage:{type:String} ,

    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    isCanceled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports={
    OrderModel
}