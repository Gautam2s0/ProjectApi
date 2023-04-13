const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type:mongoose.Schema .ObjectId , required: false },
    productId:{ type:mongoose.Schema .ObjectId, required: true },
    quantity: {
          type: Number,
          default: 1,
        },
  },
  { timestamps: true }
);
const CartModel=mongoose.model("Cart", CartSchema);

module.exports = {
    CartModel
}
