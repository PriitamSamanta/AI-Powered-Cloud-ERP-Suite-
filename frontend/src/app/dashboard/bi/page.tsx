'use client';

import { useBiDashboard } from '@/modules/bi/hooks/useBiDashboard';
import StatCard from '@/components/shared/stat-card';
import {
    Users,
    UserCheck,
    CalendarCheck,
    Clock,
    Wallet,
    Download,
    FileText,
    RefreshCw,
} from 'lucide-react';
import { exportDashboardPdf } from '@/modules/bi/utils/exportPdf';
import { exportDashboardCsv } from '@/modules/bi/utils/exportCsv';
import ChartCard from '@/modules/bi/components/ChartCard';
import EmployeesByDepartmentChart from '@/modules/bi/charts/EmployeesByDepartmentChart';
import AttendanceTrendChart from '@/modules/bi/charts/AttendanceTrendChart';
import LeaveDistributionChart from '@/modules/bi/charts/LeaveDistributionChart';
import RevenueExpenseChart from '@/modules/bi/charts/RevenueExpenseChart';
import ProfitTrendChart from '@/modules/bi/charts/ProfitTrendChart';
import ExpenseBreakdownChart from '@/modules/bi/charts/ExpenseBreakdownChart';
import RecentActivityCard from '@/modules/bi/components/RecentActivityCard';
import ExecutiveBanner from '@/modules/bi/components/ExecutiveBanner';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function BiDashboardPage() {
    const [period, setPeriod] = useState('month');
    const [lastUpdated, setLastUpdated] = useState(new Date());

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

    const attendancePercentage =
        kpis?.totalEmployees
            ? Math.round(
                (kpis.presentToday /
                    kpis.totalEmployees) *
                100
            )
            : 0;

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
        return (
            <div className="space-y-6">
                <div className="h-32 animate-pulse rounded-3xl bg-slate-200" />

                <div className="grid gap-4 md:grid-cols-4">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="h-40 animate-pulse rounded-3xl bg-slate-200"
                        />
                    ))}
                </div>
            </div>
        );
    }

    const refreshDashboard = async () => {
        await Promise.all([
            kpiQuery.refetch(),
            departmentQuery.refetch(),
            attendanceTrendQuery.refetch(),
            leaveQuery.refetch(),
            financeSummaryQuery.refetch(),
            expenseBreakdownQuery.refetch(),
            profitTrendQuery.refetch(),
        ]);

        setLastUpdated(new Date());
    };



    return (



        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Business Intelligence
                    </h1>

                    <p className="text-slate-500">
                        Enterprise analytics dashboard
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">
                        Updated:
                        {' '}
                        {lastUpdated.toLocaleTimeString()}
                    </span>

                    <Button
                        onClick={refreshDashboard}
                        variant="outline"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Analytics Overview
                    </h2>

                    <p className="text-sm text-slate-500">
                        Real-time business intelligence
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <Button className={
                            period === 'today'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white'
                        } onClick={() => setPeriod('today')}>
                            Today
                        </Button>

                        <Button className={
                            period === 'week'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white'
                        } onClick={() => setPeriod('week')}>
                            Week
                        </Button>

                        <Button className={
                            period === 'month'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white'
                        } onClick={() => setPeriod('month')}>
                            Month
                        </Button>

                        <Button className={
                            period === 'year'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white'
                        } onClick={() => setPeriod('year')}>
                            Year
                        </Button>
                    </div>

                    <Button
                        onClick={() =>
                            exportDashboardCsv({
                                totalEmployees:
                                    kpis?.totalEmployees ?? 0,
                                activeEmployees:
                                    kpis?.activeEmployees ?? 0,
                                presentToday:
                                    kpis?.presentToday ?? 0,
                                revenue:
                                    financeSummary?.totalIncome ?? 0,
                                expenses:
                                    financeSummary?.totalExpense ?? 0,
                                profit:
                                    financeSummary?.netProfit ?? 0,
                            })
                        }
                        className="rounded-xl"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() =>
                            exportDashboardPdf({
                                totalEmployees:
                                    kpis?.totalEmployees ?? 0,
                                activeEmployees:
                                    kpis?.activeEmployees ?? 0,
                                presentToday:
                                    kpis?.presentToday ?? 0,
                                revenue:
                                    financeSummary?.totalIncome ?? 0,
                                expenses:
                                    financeSummary?.totalExpense ?? 0,
                                profit:
                                    financeSummary?.netProfit ?? 0,
                            })
                        }
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>



            {/* Executive Summary */}

            <ExecutiveBanner
                totalEmployees={
                    kpis?.totalEmployees ?? 0
                }
                revenue={
                    financeSummary?.totalIncome ?? 0
                }
                profit={
                    financeSummary?.netProfit ?? 0
                }
                attendance={attendancePercentage}
            />

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
                    className="bg-gradient-to-r from-blue-600 to-cyan-500"
                    trend="+12.4%"
                    trendType="up"
                />

                <StatCard
                    title="Expenses"
                    value={`₹${financeSummary?.totalExpense ?? 0}`}
                    icon={Wallet}
                    className="bg-gradient-to-r from-red-500 to-orange-500"
                    trend="-3.1%"
                    trendType="down"
                />

                <StatCard
                    title="Profit"
                    value={`₹${financeSummary?.netProfit ?? 0}`}
                    icon={Wallet}
                    className="bg-gradient-to-r from-emerald-500 to-green-600"
                    trend="+18.2%"
                    trendType="up"
                />
            </div>

            {/* Row 1 */}
            <div className="grid gap-6 xl:grid-cols-2">
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
            <div className="grid gap-6 xl:grid-cols-2">
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
            <div className="grid gap-6 xl:grid-cols-2">
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
        </div >


    );
}