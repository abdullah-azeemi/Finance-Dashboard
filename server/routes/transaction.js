import express from "express";
import Transaction from "../models/transaction.js";

const router = express.Router();

router.get("/transaction", async (req, res) => {
  try{
    const transaction = await Transaction.find().limit(50).sort({createdOn: -1});
    res.status(200).json(transaction);

  }catch(error){
    res.status(404).json({message: error.message});
  }
})


export default router;
