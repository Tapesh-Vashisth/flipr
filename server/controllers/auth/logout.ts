import { Response } from "express";
import User from "../../models/User";

const logout = async (req: any, res: Response) => {
    console.log('logout')

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken = cookies?.jwt;

    // is refreshToken in db 
    const foundUser = await User.findOne({refreshToken});
    if (!foundUser){
        res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true})
        res.sendStatus(204);
    }
    
    // delete refreshToken in the database 
    foundUser!.refreshToken = "";
    await foundUser!.save();
    res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true})
    res.sendStatus(204);
}

export default logout;
