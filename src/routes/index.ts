import { Router } from "express";
import userRoutes from "./user.routes";
import meetingRoutes from "./meet.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/meetings", meetingRoutes);

export default router;