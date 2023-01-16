import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const login = async (req: Request, res: Response) => {
    console.log("login")

    const { email, password } = req.body

    let user: any
    try {
        user = await User.findOne({ email: email }).select('uuid name email password image').exec()
    } catch (err) {
        return res.status(500).json({message: "Database not responding!"});
    }
    
    // if no user is found with the entered email address
    if (!user) {
        return res
        .status(404)
        .json({ message: "No such user exists!" })
    }
    
    const uuid = user.uuid
    // using bcryptjs's asynchronous comparison method to compare the entered password with the hashed password 
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        return res
            .status(400)
            .json({ message: "Password is wrong" })
    }

    // creating access token 
    const accessToken = jwt.sign({ uuid: uuid }, String(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: "10s"
    })

    // creating refresh token
    const refreshToken = jwt.sign({ uuid: uuid }, String(process.env.REFRESH_TOKEN_SECRET), {
        expiresIn: "60m"
    })

    // saving the refresh token in the user's database
    user.refreshToken = refreshToken
    try {
        await user.save()
    } catch (err) {
        return res.status(500).json({message: "Database not responding!"});
    }

    // creating the refresh token cookie
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    return res
        .status(200)
        .json({
            accessToken: accessToken,
            email: email,
            name: user.name,
            image: user.image
        })
}

export default login
