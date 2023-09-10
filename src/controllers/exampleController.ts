import { Request, Response } from 'express';

const exampleView = (req: Request, res: Response) => {
    // res.render("example", {
    // });
    res.send('Hello World');
}

const exampleView2 = (req: Request, res: Response) => {
    // res.render("example", {
    // });
    res.send('Hello World 2');
}

module.exports = {
    exampleView,
    exampleView2
}