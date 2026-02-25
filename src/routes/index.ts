import { Router } from "express";
import userRoutes from "../modules/users/index/user.routes";
import meetingRoutes from "../modules/meetings/index/meet.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/meetings", meetingRoutes);

export default router;