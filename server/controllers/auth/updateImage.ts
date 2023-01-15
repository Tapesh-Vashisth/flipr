import { Request, Response } from "express";
import User from "../../models/User";

const updateImage = async (req: Request, res: Response) => {

    const { image, email } = req.body

    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    user.image = image

    try {
        user.save()
    } catch (err) {
        console.log(err)
    }

    return res
        .status(200)
        .json({ message: "Image updated successfully!" })

}

export default updateImage