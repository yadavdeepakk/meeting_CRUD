import { Router } from "express";
import * as controller from "./meeting.controller";

const router = Router();

router.post("/", controller.createMeeting);
router.get("/", controller.listMeetings);
router.get("/:id", controller.getMeeting);
router.put("/:id", controller.updateMeeting);
router.delete("/:id", controller.deleteMeeting);

export default router;