
const {ProductModel} = require("../Modals/ProductModal");
const {verifyTokenAndAdmin}=require("../Middlewares/VerifyTokenAndAdmin");

const ProductsRoute = require("express").Router();


//CREATE ,  Only Admin Authorised middleware(verifyTokenAndAdmin)


ProductsRoute.post("/add",verifyTokenAndAdmin, async (req, res) => {
  try {
    // const savedProduct = await newProduct.insetmany(req.bo);
   const savedProduct=new ProductModel(req.body)
    await savedProduct.save()
    res.status(200).send(savedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});


//UPDATE, Only Admin Authorised, middleware(verifyTokenAndAdmin)

ProductsRoute.patch("/update/:id",verifyTokenAndAdmin, async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    
    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE   Only Admin Authorised, middleware(verifyTokenAndAdmin)

ProductsRoute.delete("/:id",verifyTokenAndAdmin, async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET , Product by id ,Anyone can access

ProductsRoute.get("/:id", async (req, res) => { 
  try {
    const product = await ProductModel.findById(req.params.id);
    product?res.status(200).send(product):
    res.status(200).send("Product is not available");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET ALL ,Product, Anyone can access

ProductsRoute.get("/", async (req, res) => {
  let  limit=req.query.limit|| 200
  const page=req.query.page||1
  let categories=req.query.categories||["shirts","jacket","coatpant","tshirts"]
  let color=req.query.color||["black","grey","white","red","blue"]
  let  order=req.query.order=="asc"?1:-1 ||1
  let price=req.query.price||1000000

  
  try {
  
    // const d=await ProductModel.find({},{categories,color})
    const d=await ProductModel.find({color:{$in:color},price:{$lte:price},categories:{$in:categories}}).sort({price:order}).limit(limit).skip(limit*(page-1))
    d.length>0?res.status(200).send(d):res.status(200).send({
      data:[],
      msg:"No data present as per query"
    })
  } catch (err) {
    
    res.status(500).send(err.message);
  }
});

module.exports = {ProductsRoute}
