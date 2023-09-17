import { Router } from "express";

import UserController from "../controllers/UserController";

export const userRouter = Router();

userRouter.get("/", UserController.index);
userRouter.post("/", UserController.store);
userRouter.get("/:id", UserController.show);
userRouter.put("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);