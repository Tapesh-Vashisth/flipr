import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();

// middleware
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))
app.use(cookieParser());


// main
app.use('/users',userRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World From the Typescript Server!</h1>')
});

const port = process.env.PORT || 5500;


mongoose.connect('mongodb+srv://flipr:flipr123@cluster0.kfcheeo.mongodb.net/flipr?retryWrites=true&w=majority').then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
})
