import { Router } from "express";

import { exampleView, exampleView2 } from "../controllers/exampleController";
export const router = Router();

router.get("/", exampleView);
router.get("/2", exampleView2);