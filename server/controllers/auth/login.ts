import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const login = async (req: Request, res: Response) => {
    console.log("login")

    const { email, password } = req.body

    let user: any
    try {
        user = await User.findOne({ email: email }).select('uuid email password').exec()
    } catch (err) {
        console.log(err)
    }
    const uuid = user.uuid

    if (!user) {
        return res
            .status(404)
            .json({ message: "No such user exists!" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        return res
            .status(400)
            .json({ message: "Password is wrong" })
    }

    const accessToken = jwt.sign({ uuid: uuid }, String(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: "10s"
    })

    const refreshToken = jwt.sign({ uuid: uuid }, String(process.env.REFRESH_TOKEN_SECRET), {
        expiresIn: "50s"
    })

    user.refreshToken = refreshToken
    try {
        await user.save()
    } catch (err) {
        console.log(err)
    }

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    return res
        .json(accessToken)

}

export default login