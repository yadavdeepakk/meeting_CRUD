import { Router } from "express";
import * as controller from "../modules/user/index/user.controller";

const router = Router();

router.post("/", controller.createUser);
router.get("/:id", controller.getUser);
router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;