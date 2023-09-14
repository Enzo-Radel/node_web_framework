import { Request, Response } from 'express';

import User from "../models/User";

export default class UserController
{
    public static test = (req: Request, res: Response) => {
        let data = {
            "name": "user4",
            "email": "user4@teste",
            "password": 102030,
        }

        // CREATE
        // User.createUser(data)
        //     .then(user => {
        //         res.send(user);
        //     })
        //     .catch(error => {
        //         res.send(error);
        //     });

        // GET ALL
        // User.getAllUsers()
        //     .then(user => {
        //         res.send(user);
        //     })
        //     .catch(error => {
        //         res.send(error);
        //     });

        // FIND
        // User.findUser()
        //     .then(user => {
        //         res.send(user);
        //     })
        //     .catch(error => {
        //         res.send(error);
        //     });

        // DELETE
        // User.findUser()
        //     .then(user => {
        //         user.deleteUser()
        //             .then(response => {
        //                 res.send(response);
        //             })
        //             .catch(error => {
        //                 res.send(error);
        //             });
        //     })
        //     .catch(error => {
        //         res.send(error);
        //     });

        // UPDATE
        // User.findUser()
        //     .then(user => {
        //         user.updateUser(data)
        //             .then(response => {
        //                 res.send(response);
        //             })
        //             .catch(error => {
        //                 res.send(error);
        //             });
        //     })
        //     .catch(error => {
        //         res.send(error);
        //     });
    }
}