import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const transactionSchema = new Schema(
  {
    buyer: {
      type: String,
      currency: "USD",
      get: (v) => v/100
    },
    amount: {
      type: String,
      currency: "USD",
      get: (v) => v/100
    },
      productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  
  },

  { timestamps:true, toJSON: {getters: true} }
);

const transaction = mongoose.model("transaction", transactionSchema);
export default transaction;