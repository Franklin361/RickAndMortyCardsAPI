import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import UserModel from "../models/User";

import { generateJWT } from "../helpers/jsonWebToken";



export const login = async(req: Request, res: Response) => {

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(400).json({
            msg: 'The user was not found in the database'
        });
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
        return res.status(400).json({
            msg: 'The credentials are wrong'
        });
    }

    const token = await generateJWT(user.id);

    return res.json({
        user,
        token,
        message: 'Authentication successfully verified'
    })

};


export const signUp = async (req: Request, res: Response) => {

    const { username, password, email } = req.body;

    const existEmailUser = await UserModel.findOne({ email });
    const existNicknameUser = await UserModel.findOne({ username });

    if (existEmailUser) {
        return res.status(400).json({
            message: 'Error  -- e-mail already exists --'
        })
    }

    if (existNicknameUser) {
        return res.status(400).json({
            message: 'Error  -- username already exists --'
        })
    }

    const newUser = new UserModel({ username, password, email });

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    const token = await generateJWT(newUser.id);

    await newUser.save();

    return res.json({
        user: newUser,
        message: 'User created successfully',
        token
    })

};

export interface IGetUserAuthInfoRequest extends Request {
    uid?: string
}

export const renewToken = async(req: IGetUserAuthInfoRequest, res: Response) => {
    
    const { uid } = req;

    const token = await generateJWT(uid!);

    const user = await UserModel.findById(uid);

    res.json({
        user,
        token
    });
};
