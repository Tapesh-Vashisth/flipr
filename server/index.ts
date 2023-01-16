import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import companyRouter from "./routes/companyRoutes";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();

// middleware
app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin:["http://localhost:3000", "https://stock-hub.netlify.app"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))
app.use(cookieParser());


// main
app.use('/api/users',userRouter);
app.use('/api/company',companyRouter);

const port = process.env.PORT || 5500;


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kfcheeo.mongodb.net/flipr?retryWrites=true&w=majority`).then(() => {
    console.log("database connected");
    app.listen(port, () => {
        console.log(`server listening on port ${port}`)
    });
}).catch((err) => {
    console.log(err);
})
