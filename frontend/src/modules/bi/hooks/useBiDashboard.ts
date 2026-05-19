import { useQuery } from '@tanstack/react-query';

import {
  getDashboardKPIs,
  getEmployeesByDepartment,
  getAttendanceTrend,
  getLeaveDistribution,
} from '../services/bi.service';

export const useBiDashboard = () => {
  const kpiQuery = useQuery({
    queryKey: ['bi-kpis'],
    queryFn: getDashboardKPIs,
  });

  const departmentQuery = useQuery({
    queryKey: ['employees-by-department'],
    queryFn: getEmployeesByDepartment,
  });

  const attendanceQuery = useQuery({
    queryKey: ['attendance-trend'],
    queryFn: getAttendanceTrend,
  });

  const leaveQuery = useQuery({
    queryKey: ['leave-distribution'],
    queryFn: getLeaveDistribution,
  });

  return {
    kpiQuery,
    departmentQuery,
    attendanceQuery,
    leaveQuery,
  };
};