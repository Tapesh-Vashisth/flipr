import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"

const editAccountDetails: any = async (req: Request, res: Response) => {
    console.log("update account")

    const { name, email, password, newPassword } = req.body

    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        return res.status(404).json({message:'User Not Found'});
    }

    if (name !== user.name) {
        user.name = name
    }

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare) {
        return res
            .status(409)
            .json({ message: "Wrong password entered : Cannot edit account details!" })
    }

    if (newPassword.length > 0) {
        const hashedPassword = bcrypt.hashSync(newPassword, 5)
        user.password = hashedPassword
    }

    try {
        await user.save();
    } catch (err) {
        return res.status(400).json({message:'Some Error Occured'});
    }

    return res
        .status(200)
        .json({ message: "Account details changed successfully!" })
}

export default editAccountDetails;  ``
