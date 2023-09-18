import { Request, Response } from 'express';

import User from "../models/User";

export default class UserController
{
    static index = (req: Request, res: Response) =>
    {
        User.getAll()
            .then(user => {
                res.send(user);
            })
            .catch(error => {
                res.send(error);
            });
    }

    // static store = (req: Request, res: Response) =>
    // {
    //     let data = req.body

    //     User.create(data)
    //         .then(user => {
    //             res.send(user);
    //         })
    //         .catch(error => {
    //             res.send(error);
    //         });
    // }

    // static show = (req: Request, res: Response) =>
    // {
    //     User.findUser(req.params.id)
    //         .then(user => {
    //             res.send(user);
    //         })
    //         .catch(error => {
    //             res.send(error);
    //         });
    // }

    // static update = (req: Request, res: Response) =>
    // {
    //     let data = req.body
        
    //     User.findUser(req.params.id)
    //         .then(user => {
    //             user.updateUser(data)
    //                 .then(response => {
    //                     res.send(response);
    //                 })
    //                 .catch(error => {
    //                     res.send(error);
    //                 });
    //         })
    //         .catch(error => {
    //             res.send(error);
    //         });
    // }

    // static delete = (req: Request, res: Response) =>
    // {
    //     User.findUser(req.params.id)
    //         .then(user => {
    //             user.deleteUser()
    //                 .then(response => {
    //                     res.send(response);
    //                 })
    //                 .catch(error => {
    //                     res.send(error);
    //                 });
    //         })
    //         .catch(error => {
    //             res.send(error);
    //         });
    // }
}