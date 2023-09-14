import { Router } from "express";

import UserController from "../controllers/UserController";

export const userRouter = Router();

userRouter.get("/", UserController.index);
userRouter.get("/store", UserController.store);
userRouter.get("/show", UserController.show);
userRouter.get("/update", UserController.update);
userRouter.get("/delete", UserController.delete);