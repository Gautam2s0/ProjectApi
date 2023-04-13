const { CartModel } = require("../Modals/CartModal");
const { verifyTokenAndAdmin } = require("../Middlewares/VerifyTokenAndAdmin");
const { AddUserIdInCart } = require("../Middlewares/AddUserIdInCart");


const mongoose = require("mongoose");

const Cartrouter = require("express").Router();

//CREATE  Only logged user middleware verifyToken,

Cartrouter.post("/add", AddUserIdInCart, async (req, res) => {
  const userId = req.userId;
  const productId = req.body.productId;
  const newCart = new CartModel({ userId, productId });

  const existProduct = await CartModel.find({
    $and: [{ productId }, { userId }],
  });
// Cartrouter.get("/",AddUserIdInCart,async(req,res)=>{
//   const userId=req.userId
//   var id = mongoose.Types.ObjectId(userId);


 
//   console.log({userId:id})
//   try{
//     const data=await CartModel.aggregate([
//       {
//         $match:{
//           userId:id        }
//       },
//       {
//         $lookup:{
//           from:"products",
//           localField:"productId",
//           foreignField:"_id",
//           as:"cart"
//         }
//       }
//     ])
//     res.send(data)
//   }
//   catch(err){
//     res.send(err)
//   }
// })



Cartrouter.post("/add",  AddUserIdInCart,async (req, res) => {
  const userId=req.userId
  const productId=req.body.productId
  const newCart = new CartModel({userId,productId});
  
  const existProduct=await CartModel.find({$and:[{productId},{userId}]})
  const existuser=await activeCartModel.find({userId})
  console.log({existuser})


  
  try {
    if (existProduct.length > 0) {
      res.status(200).send("Item already present in cart");
    } else {
      const savedCart = await newCart.save();
      res.status(200).send({
        msg: "item added in your cart",
        item: savedCart,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


//UPDATE   Only logged user and own cart --> middleware --> verifyTokenAndAuthorization

Cartrouter.patch("/update/:id", async (req, res) => {
  const quantity = req.body.quantity;
  // console.log({quantity})
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE  Only logged user and own cart --> middleware --> verifyTokenAndAuthorization

Cartrouter.delete("/delete/:id", async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart has been deleted...");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET USER CART Only logged user --> middleware --> verifyTo(/cart/userid)

Cartrouter.get("/usercart", AddUserIdInCart, async (req, res) => {
  const userId = req.userId;
  var id = mongoose.Types.ObjectId(userId);
  try {
    const cart = await CartModel.aggregate([
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
          as: "cart",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$cart", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { cart: 0 } },
      // {
      //   $group: {
      //     _id: {
      //       _id:"$_id",
      //       categories: "$categories",
      //       rating: "$rating",
      //       title: "$title",
      //       price: "$price",
      //       realPrice: "$realPrice",
      //       brand: "$brand",
      //       description: "$description",
      //       color: "$color",
      //       discount: "$discount",
      //       Images: "$Images",
      //       mainImage: "$mainImage",
      //       quantity: "$quantity",
      //     },
      //   },
      // },
    ]);

    cart.length > 0
      ? res.status(200).send(cart)
      : res.status(200).send("No items in your cart");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// //GET ALL cart items--> only Admin middleware--> verifyTokenAndAdmin

Cartrouter.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await CartModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "cart",
        },
      },
     
    ]);
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

Cartrouter.get("/alluser", async (req, res) => {
  try {
    const allcart = await CartModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $group: {
          _id: { user: "$user" },
          // itmes: { "$addToSet": "$_id" },
          count: { $sum: 1 },
        },
      },
    ]);
    allcart.length > 0
      ? res.status(200).send(allcart)
      : res.status(200).send("Nobody user have items in own cart");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = { Cartrouter };

})



module.exports = {Cartrouter};
