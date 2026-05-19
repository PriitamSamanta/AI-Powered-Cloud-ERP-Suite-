import axios from '@/lib/axios';

export const getDashboardKPIs = async () => {
  const response = await axios.get('/bi/kpis');
  return response.data;
};

export const getEmployeesByDepartment = async () => {
  const response = await axios.get(
    '/bi/charts/employees-by-department'
  );

  return response.data;
};

export const getAttendanceTrend = async () => {
  const response = await axios.get(
    '/bi/charts/attendance-trend'
  );

  return response.data;
};

export const getLeaveDistribution = async () => {
  const response = await axios.get(
    '/bi/charts/leave-distribution'
  );

  return response.data;
};