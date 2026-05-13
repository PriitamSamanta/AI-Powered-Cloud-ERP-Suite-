import api from "@/lib/axios";

export const getAttendance = async () => {
  const response = await api.get("/attendance");

  return response.data;
};
