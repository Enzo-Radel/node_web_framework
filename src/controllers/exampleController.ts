import { Request, Response } from 'express';

export const exampleView = (req: Request, res: Response) => {
    res.send('Hello World');
}

export const exampleView2 = (req: Request, res: Response) => {
    res.send('Hello World 2');
}