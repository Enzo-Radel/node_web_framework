import { Request, Response } from 'express';

import User from "../models/User";

export default class UserController
{
    public static test = (req: Request, res: Response) => {
        let user = new User();
        user.data = {
            "name": "enzo",
            "email": "enzo@radel",
            "password": 102030
        };
        
        res.send(user.insert());
    }
}