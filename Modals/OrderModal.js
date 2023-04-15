const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    userId: { type: mongoose.Schema.ObjectId, required: true ,ref:"user"},
    productId: {type:mongoose.Schema.ObjectId,ref:"Product"},
    quantity: {
          type: Number,
          default: 1,
    },
=======
    userId: { type: mongoose.Schema.ObjectId, required: true },
    productId: {type:mongoose.Schema.ObjectId},

    quantity: 1 ,
    rating:{ type: Number, required: true },
    categories: { type: String },
    title: { type: String},
    price: { type: Number},
    realPrice:{ type: Number},
    mainImage:{type:String} ,

>>>>>>> a22449433b1397907259bd0239bc858499fe57e3
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