import { Express, Response, Request, NextFunction } from "express";
const jwt = require('jsonwebtoken');
require("dotenv").config()

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    console.log("verifyJwt");

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer')) return res.status(401).send();
    const token = authHeader.split(' ')[1];
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err) return res.status(401).send(); //invalid token
            req.uuid = decoded.uuid;
            next();
        }
    );
}

export default verifyJWT;