import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import product from "./models/product.js";
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from "./data/data.js";
import Product from "./models/product.js";
import transactionRoutes from "./routes/transaction.js";
import Transaction from "./models/transaction.js"
import transaction from "./models/transaction.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

console.log("hello");

app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

const dbURI = process.env.MONGO_URL;

mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 15000
})
.then(() => {
    console.log('Database connected successfully');
    app.listen(process.env.PORT || 9000, () => {
        console.log(`Server Port ${process.env.PORT || 9000}`);
        // insertKpis(kpis); 
    });
    //Product.insertMany(products);
    Transaction.insertMany(transactions);
})
.catch(err => {
    console.error('Database connection error:', err);
});










// async function insertKpis(kpis) {
//     try {
//         await KPI.insertMany(kpis);
//         console.log('Kpis inserted successfully');
//     } catch (error) {
//         console.error('Error inserting kpis:', error);
//     }
// }
