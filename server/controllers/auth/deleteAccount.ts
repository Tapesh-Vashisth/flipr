import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"

const deleteAccount = async (req: Request, res: Response) => {
    console.log('delete account')
    const { email, password } = req.body

    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        return res.status(404).json({message:'User Not Found'});
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password)
    
    if (!passwordCompare) {
        return res
        .status(404)
        .json({ message: "Password is wrong!" })
    }
    
    let deletion: any
    try {
        deletion = await User.findOneAndDelete({ email: email }).exec()
    } catch (err) {
        return res.status(400).json({messge:'Some Error Occured'});
    }

    return res
        .status(200)
        .json({ message: "Account deleted successfully!" })
}

export default deleteAccount