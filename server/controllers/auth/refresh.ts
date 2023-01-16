import { Express, Request, Response } from "express";
import User from "../../models/User"
require("dotenv").config();
const jwt = require("jsonwebtoken");

const refreshToken = async (req: Request, res: Response) => {
    console.log("refresh");
    
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(403);
    } 
    
    // accessing the refresh token cookie
    const refreshtoken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshtoken}).exec();
    if (!foundUser)
        return res.status(403).json({message:'Logged Out'});

    // evaluate jwt 
    jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err || foundUser.uuid !== decoded.uuid) return res.sendStatus(403);

            const accessToken = jwt.sign(
                {uuid: foundUser.uuid},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "10s"}
            )

            res.json({accessToken});
        }
    )
}   

export default refreshToken;