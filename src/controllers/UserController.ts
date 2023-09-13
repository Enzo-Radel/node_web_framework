import { Request, Response } from 'express';

import User from "../models/User";

export default class UserController
{
    public static test = (req: Request, res: Response) => {
        let data = {
            "name": "user3",
            "email": "user3@teste",
            "password": 102030,
        };

        // User.createUser(data)
        //     .then(user => {
        //         res.send(user);
        //     })
        //     .catch(error => {
        //         res.send(error);
        //     });

        User.getAllUsers()
            .then(user => {
                res.send(user);
            })
            .catch(error => {
                res.send(error);
            });
    }
}