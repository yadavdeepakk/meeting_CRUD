import { Request, Response } from "express";
import * as meetingService from "../service/meeting.service";

// Creating Meeting below
export const createMeeting = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const meeting = await meetingService.createMeeting({
      ...req.body,
      userId,
    });
    console.log("User from middleware:", req.user);

    return res.status(201).json(meeting);
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Unable to create meeting",
    });
  }
  
};

// List meetings
export const listMeetings = async (req: Request, res: Response) => {
  try {
    const meetings = await meetingService.listMeetings(req.query);
    return res.status(200).json(meetings);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to fetch meetings",
    });
  }
};

// Get meetings
export const getMeeting = async (req: Request, res: Response) => {
  try {
    const meeting = await meetingService.getMeeting(Number(req.params.id));

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    return res.status(200).json(meeting);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to fetch meeting",
    });
  }
};

// Update meeting
export const updateMeeting = async (req: Request, res: Response) => {
  try {
    const updatedMeeting = await meetingService.updateMeeting(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(updatedMeeting);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to update meeting",
    });
  }
};

// Delete meeting
export const deleteMeeting = async (req: Request, res: Response) => {
  try {
    await meetingService.deleteMeeting(Number(req.params.id));

    return res.status(200).json({
      message: "Meeting deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to delete meeting",
    });
  }
};