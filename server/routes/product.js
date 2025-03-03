import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get("/product", async (req, res) => {
  try{
    const product = await Product.find();
    res.status(200).json(product);

  }catch(error){
    res.status(404).json({message: error.message});
  }
})


export default router;
