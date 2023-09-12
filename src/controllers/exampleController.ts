import { Request, Response } from 'express';

export default class ExampleController
{
    public static exampleView = (req: Request, res: Response) => {
        res.render('example', req.query);
    }
}