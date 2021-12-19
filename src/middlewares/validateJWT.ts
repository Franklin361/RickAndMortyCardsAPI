import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

type tokenUID = { uid: string };

export interface IGetUserAuthInfoRequest extends Request {
    uid?: string
}

export const validateJWT = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                message: 'There is no token in the request'
            })
        }

        const { uid } = jwt.verify(token, process.env.JWT_KEY!) as tokenUID;

        req.uid = uid;

        next();

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            message: 'Token no valid'
        })
    }
};