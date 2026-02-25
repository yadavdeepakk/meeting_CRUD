import { Router } from "express";
import * as controller from "../modules/meeting/index/meeting.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

//public routes
router.get("/", controller.listMeetings);
router.get("/:id", controller.getMeeting);

// protected routes
router.post("/", protect, controller.createMeeting);
router.put("/:id", protect, controller.updateMeeting);
router.delete("/:id", protect, controller.deleteMeeting);

export default router;