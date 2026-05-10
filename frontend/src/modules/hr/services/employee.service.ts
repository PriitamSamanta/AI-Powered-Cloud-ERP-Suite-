import api from "@/lib/axios";

export const getEmployees = async () => {
  const response = await api.get("/employees");

  return response.data;
};

export const onboardEmployee = async (data: any) => {
  const response = await api.post("/employees/onboard", data);

  return response.data;
};
