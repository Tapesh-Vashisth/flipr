import { Response, Request } from "express";
import User from "../../models/User";

const check = async (req: any, res: Response) => {
    console.log("check");
    const user = await User.findOne({uuid: req.uuid}).exec();
    
    if (!user) return res.status(404).json({message:'User Not Found'});

    return res.status(200).json({name: user.name, email: user.email, image: user.image});
}

export default check;