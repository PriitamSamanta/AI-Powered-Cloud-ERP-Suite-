'use client';
import PageHeader from '@/components/shared/page-header';
import { useBiDashboard } from '@/modules/bi/hooks/useBiDashboard';
import StatCard from '@/components/shared/stat-card';
import {
    Users,
    UserCheck,
    CalendarCheck,
    Clock,
    Wallet,
} from 'lucide-react';
import ChartCard from '@/modules/bi/components/ChartCard';
import EmployeesByDepartmentChart from '@/modules/bi/charts/EmployeesByDepartmentChart';
import AttendanceTrendChart from '@/modules/bi/charts/AttendanceTrendChart';
import LeaveDistributionChart from '@/modules/bi/charts/LeaveDistributionChart';
import RevenueExpenseChart from '@/modules/bi/charts/RevenueExpenseChart';
import ProfitTrendChart from '@/modules/bi/charts/ProfitTrendChart';
import ExpenseBreakdownChart from '@/modules/bi/charts/ExpenseBreakdownChart';
import RecentActivityCard from '@/modules/bi/components/RecentActivityCard';
import { useState } from 'react';

export default function BiDashboardPage() {
     const [period, setPeriod] = useState('month');

    const { kpiQuery, departmentQuery, attendanceTrendQuery, leaveQuery, financeSummaryQuery, expenseBreakdownQuery, profitTrendQuery } = useBiDashboard();
    const kpis = kpiQuery.data;
    const departmentData = departmentQuery.data ?? [];
    const attendanceTrendData = attendanceTrendQuery.data ?? [];
    const leaveData = leaveQuery.data ?? [];
    const financeSummary = financeSummaryQuery.data;
    const activities = financeSummary
        ? [
            ...financeSummary.recentIncome.map(
                (item: any) => ({
                    ...item,
                    type: 'income',
                })
            ),

            ...financeSummary.recentExpense.map(
                (item: any) => ({
                    ...item,
                    type: 'expense',
                })
            ),
        ]
        : [];

    const profitTrendData = profitTrendQuery.data ?? [];

    const expenseBreakdownData = expenseBreakdownQuery.data ?? [];

    const revenueExpenseData = financeSummary
        ? [
            {
                name: 'Income',
                amount: financeSummary.totalIncome,
            },
            {
                name: 'Expense',
                amount: financeSummary.totalExpense,
            },
        ]
        : [];

    if (kpiQuery.isLoading) {
        return <div>Loading dashboard...</div>;
    }

   

    return (

        <div className="space-y-8">
            <PageHeader
                title="Business Intelligence"
                description="Enterprise analytics dashboard"
            />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Analytics Overview
                    </h2>

                    <p className="text-sm text-slate-500">
                        Real-time business intelligence
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className={
                        period === 'today'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white'
                    } onClick={() => setPeriod('today')}>
                        Today
                    </button>

                    <button className={
                        period === 'week'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white'
                    } onClick={() => setPeriod('week')}>
                        Week
                    </button>

                    <button className={
                        period === 'month'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white'
                    } onClick={() => setPeriod('month')}>
                        Month
                    </button>

                    <button className={
                        period === 'year'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white'
                    } onClick={() => setPeriod('year')}>
                        Year
                    </button>
                </div>
            </div>

            {/* Executive Summary */}
            <div
                className="
      rounded-3xl
      bg-gradient-to-r
      from-slate-900
      to-slate-800
      p-8
      text-white
    "
            >
                <h2 className="text-3xl font-bold">
                    Executive Overview
                </h2>

                <p className="mt-2 text-slate-300">
                    Monitor workforce performance,
                    attendance, payroll and financial
                    insights from a single dashboard.
                </p>
            </div>

            {/* KPI Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Employees"
                    value={kpis?.totalEmployees || 0}
                    icon={Users}
                />

                <StatCard
                    title="Active Employees"
                    value={kpis?.activeEmployees || 0}
                    icon={UserCheck}
                />

                <StatCard
                    title="Present Today"
                    value={kpis?.presentToday || 0}
                    icon={CalendarCheck}
                />

                <StatCard
                    title="On Leave"
                    value={kpis?.onLeaveToday || 0}
                    icon={Clock}
                />

                <StatCard
                    title="Payroll Cost"
                    value={`₹${kpis?.monthlyPayrollCost || 0}`}
                    icon={Wallet}
                />

                <StatCard
                    title="Revenue"
                    value={`₹${financeSummary?.totalIncome ?? 0}`}
                    icon={Wallet}
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                />

                <StatCard
                    title="Expenses"
                    value={`₹${financeSummary?.totalExpense ?? 0}`}
                    icon={Wallet}
                    className="bg-gradient-to-br from-red-500 to-rose-600 text-white"
                />

                <StatCard
                    title="Profit"
                    value={`₹${financeSummary?.netProfit ?? 0}`}
                    icon={Wallet}
                    className="bg-gradient-to-br from-emerald-500 to-green-600 text-white"
                />
            </div>

            {/* Row 1 */}
            <div className="grid gap-6 lg:grid-cols-2">
                <ChartCard title="Employees By Department">
                    <EmployeesByDepartmentChart
                        data={departmentData}
                    />
                </ChartCard>

                <ChartCard title="Attendance Trend">
                    <AttendanceTrendChart
                        data={attendanceTrendData}
                    />
                </ChartCard>
            </div>

            {/* Row 2 */}
            <div className="grid gap-6 lg:grid-cols-2">
                <ChartCard title="Leave Distribution">
                    <LeaveDistributionChart
                        data={leaveData}
                    />
                </ChartCard>

                <ChartCard title="Revenue vs Expense">
                    <RevenueExpenseChart
                        data={revenueExpenseData}
                    />
                </ChartCard>
            </div>

            {/* Row 3 */}
            <div className="grid gap-6 lg:grid-cols-2">
                <ChartCard title="Profit Trend">
                    <ProfitTrendChart
                        data={profitTrendData}
                    />
                </ChartCard>

                <RecentActivityCard
                    activities={activities}
                />
            </div>

            {/* Row 4 */}
            <ChartCard title="Expense Breakdown">
                <ExpenseBreakdownChart
                    data={expenseBreakdownData}
                />
            </ChartCard>
        </div>


    );
}