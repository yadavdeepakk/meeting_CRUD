import { Router } from "express";
import userRoutes from "../modules/user/index/user.routes";
import meetingRoutes from "../modules/meeting/index/meet.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/meetings", meetingRoutes);

export default router;