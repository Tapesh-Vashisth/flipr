import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"

const editAccountDetails = async (req: Request, res: Response) => {

    const { name, email, password, newPassword } = req.body

    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (name !== user.name) {
        user.name = name
    }

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare && password.length > 0 && newPassword.length > 0) {
        return res
            .status(400)
            .json({ message: "Incorrect password entered!" })
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 5)
    if (newPassword) {
        user.password = hashedPassword
    }

    try {
        user.save()
    } catch (err) {
        console.log(err)
    }

    return res
        .status(200)
        .json({ message: "Account details changed successfully!" })

}