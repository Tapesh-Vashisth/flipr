"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
require("dotenv").config();
const verifyJWT = (req, res, next) => {
    console.log("verifyJwt");
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer')))
        return res.status(401).send();
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).send(); //invalid token
        req.uuid = decoded.uuid;
        next();
    });
};
exports.default = verifyJWT;
