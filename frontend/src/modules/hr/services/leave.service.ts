import api from "@/lib/axios";

export const getLeaves = async () => {
  const response = await api.get("/leave");

  return response.data;
};

export const applyLeave = async (data: any) => {
  const response = await api.post("/leave", data);

  return response.data;
};

export const updateLeaveStatus = async (id: number, status: string) => {
  const response = await api.put(`/leave/${id}/status`, {
    status,
  });

  return response.data;
};
