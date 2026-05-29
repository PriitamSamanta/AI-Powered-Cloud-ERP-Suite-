import { useQuery } from '@tanstack/react-query';

import {
    getDashboardKPIs,
    getEmployeesByDepartment,
    getAttendanceTrend,
    getLeaveDistribution,
    getFinanceSummary,
    getExpenseBreakdown,
    getProfitTrend,
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

    const attendanceTrendQuery = useQuery({
        queryKey: ['attendance-trend'],
        queryFn: getAttendanceTrend,
    });

    const leaveQuery = useQuery({
        queryKey: ['leave-distribution'],
        queryFn: getLeaveDistribution,
    });

    const financeSummaryQuery = useQuery({
        queryKey: ['finance-summary'],
        queryFn: getFinanceSummary,
    });

    const expenseBreakdownQuery = useQuery({
        queryKey: ['expense-breakdown'],
        queryFn: getExpenseBreakdown,
    });

    const profitTrendQuery = useQuery({
        queryKey: ['profit-trend'],
        queryFn: getProfitTrend,
    });

    return {
        kpiQuery,
        departmentQuery,
        attendanceTrendQuery,
        leaveQuery,
        financeSummaryQuery,
        expenseBreakdownQuery,
        profitTrendQuery,
    };
};