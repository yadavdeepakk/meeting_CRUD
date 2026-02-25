import { Op } from "sequelize";
import { Meeting } from "../module/meeting.model";

/* =========================
   CREATE MEETING
========================= */
export const createMeeting = async (data: any) => {
  const { startTime, endTime, userId } = data;

  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error("startTime must be before endTime");
  }

  const conflict = await Meeting.findOne({
    where: {
      userId,
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });

  if (conflict) {
    throw new Error("Time slot already booked");
  }

  return await Meeting.create(data);
};

/* =========================
   LIST MEETINGS (FILTERS)
========================= */
export const listMeetings = async (query: any) => {
  const { userId, startDate, endDate } = query;

  const where: any = {};

  if (userId) {
    where.userId = userId;
  }

  if (startDate && endDate) {
    where.startTime = {
      [Op.gte]: new Date(startDate),
    };

    where.endTime = {
      [Op.lte]: new Date(endDate),
    };
  }

  return await Meeting.findAll({ where });
};

/* =========================
   GET MEETING BY ID
========================= */
export const getMeeting = async (id: number) => {
  return await Meeting.findByPk(id);
};

/* =========================
   UPDATE MEETING
========================= */
export const updateMeeting = async (id: number, data: any) => {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  const startTime = data.startTime || meeting.startTime;
  const endTime = data.endTime || meeting.endTime;
  const userId = meeting.get("userId") as number;

  if (!userId) {
    throw new Error("Invalid meeting data: userId missing");
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error("startTime must be before endTime");
  }

  const conflict = await Meeting.findOne({
    where: {
      userId,
      id: { [Op.ne]: id }, // exclude current meeting
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });

  if (conflict) {
    throw new Error("Time slot already booked");
  }

  await meeting.update(data);
  return meeting;
};

/* =========================
   DELETE MEETING
========================= */
export const deleteMeeting = async (id: number) => {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  await meeting.destroy();
};