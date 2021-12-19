import { Request, Response } from "express";

export const login = (req:Request, res: Response) => {
    
    const { username, password } = req.body;
    
    return res.json({
        username, password
    })

};