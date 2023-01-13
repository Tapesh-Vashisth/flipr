import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from './routes/userRoutes';

dotenv.config();

const app: Express = express();

// middleware
app.use(express.json());
app.use(cors());


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
