import api from "@/lib/axios";

export const getHRDashboard = async () => {
  const response = await api.get("/dashboard/hr");

  return response.data;
};
