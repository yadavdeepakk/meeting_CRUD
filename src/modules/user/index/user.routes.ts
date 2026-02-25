import { Router } from "express";
import * as controller from "./user.controller";

const router = Router();

router.post("/", controller.createUser);
router.get("/:id", controller.getUser);

export default router;