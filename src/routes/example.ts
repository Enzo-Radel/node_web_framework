import { Router } from "express";

import ExampleController from "../controllers/ExampleController";

export const exampleRouter = Router();

exampleRouter.get("/", ExampleController.exampleView);