import { Request, Response } from 'express';

export default class ExampleController
{
    public static exampleView = (req: Request, res: Response) => {
        res.render('example', req.query);
    }

    public static exampleView2 = (req: Request, res: Response) => {
        res.send('Hello World 2');
    }
}