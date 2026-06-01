import api from "@/lib/axios";

export const getAttendance = async () => {
  const response = await api.get("/attendance");

  return response.data;
};

export const getMyAttendance =
  async () => {
    const response = await api.get(
      "/attendance/my"
    );

    return response.data;
  };

export const checkIn = async () => {
  const response = await api.post(
    "/attendance/checkin"
  );

  return response.data;
};

export const checkOut = async (
  attendanceId: number
) => {
  const response = await api.post(
    `/attendance/checkout/${attendanceId}`
  );

  return response.data;
};
