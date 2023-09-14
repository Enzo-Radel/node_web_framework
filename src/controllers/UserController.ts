import { Request, Response } from 'express';

import User from "../models/User";

export default class UserController
{
    static index = (req: Request, res: Response) =>
    {
        User.getAllUsers()
            .then(user => {
                res.send(user);
            })
            .catch(error => {
                res.send(error);
            });
    }

    static store = (req: Request, res: Response) =>
    {
        let data = {
            "name": "user",
            "email": "user@teste",
            "password": 102030,
        }

        User.createUser(data)
            .then(user => {
                res.send(user);
            })
            .catch(error => {
                res.send(error);
            });
    }

    static show = (req: Request, res: Response) =>
    {
        User.findUser("")
            .then(user => {
                res.send(user);
            })
            .catch(error => {
                res.send(error);
            });
    }

    static update = (req: Request, res: Response) =>
    {
        let data = {
            "name": "user",
            "email": "user@teste",
            "password": 102030,
        }
        
        User.findUser("")
            .then(user => {
                user.updateUser(data)
                    .then(response => {
                        res.send(response);
                    })
                    .catch(error => {
                        res.send(error);
                    });
            })
            .catch(error => {
                res.send(error);
            });
    }

    static delete = (req: Request, res: Response) =>
    {
        User.findUser("")
            .then(user => {
                user.deleteUser()
                    .then(response => {
                        res.send(response);
                    })
                    .catch(error => {
                        res.send(error);
                    });
            })
            .catch(error => {
                res.send(error);
            });
    }
}