import { Op } from "sequelize";
import { Meeting } from "../module/meeting.model";

  //  crete meeting
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

  //  list meeting

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

  //  get meeting

export const getMeeting = async (id: number) => {
  return await Meeting.findByPk(id);
};


  //  Update meeting

export const updateMeeting = async (id: number, data: any) => {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  const startTime = data.startTime || meeting.startTime;
  const endTime = data.endTime || meeting.endTime;
  const userId = meeting.get("userId") as number;

  if (!userId) {
    throw new Error('userId missing');
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error("startTime must be before endTime");
  }

  const conflict = await Meeting.findOne({
    where: {
      userId,
      id: { [Op.ne]: id },
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });

  if (conflict) {
    throw new Error("slot already booked");
  }

  await meeting.update(data);
  return meeting;
};

  //  Delete meeting

export const deleteMeeting = async (id: number) => {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  await meeting.destroy();
};