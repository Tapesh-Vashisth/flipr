import express from 'express'
import { Request,Response } from 'express'
// import User from '../models/User';

const handleUserLogin = async(req:Request,res:Response)=>{
    const b = req.body;
    const user:[]|null=null;
    // const user = await User.findOne({email:b.email}).exec();

    if(!user)
    {
        return res.status(404).json({message:'not authorized'});
    }

    const check:string|null=null;
    //  = user.password===b.password;

    if(!check)
    {
        return res.status(401).json({message:'wrong password not authorized'});
    }

    res.status(200).json(user);
}

const handleUserRegister = async(req:Request,res:Response)=>{
    const b = req.body;
    const user:[]|null=null;

    // const user = await User.findOne({email:b.email}).exec();

    if(user)
    {
        return res.status(409).json({message:'username already exists'});
    }

    // const newUser = await new User({
    //     username:b.username,
    //     password:b.password
    // });

    // await newUser.save();

    // res.status(200).json(user);
}

export {handleUserLogin,handleUserRegister};