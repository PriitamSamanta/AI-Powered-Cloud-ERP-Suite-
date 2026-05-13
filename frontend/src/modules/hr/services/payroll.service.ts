import api from "@/lib/axios";

export const getPayrolls = async () => {
  const response = await api.get("/payroll");

  return response.data;
};

export const generatePayroll = async (data: any) => {
  const response = await api.post("/payroll", data);

  return response.data;
};

export const downloadPayslip = async (id: number) => {
  const response = await api.get(`/payroll/${id}/payslip`, {
    responseType: "blob",
  });

  return response.data;
};
