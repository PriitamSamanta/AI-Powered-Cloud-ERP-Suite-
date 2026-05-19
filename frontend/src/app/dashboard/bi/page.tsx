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

export default function BiDashboardPage() {

    const { kpiQuery } = useBiDashboard();
    const kpis = kpiQuery.data;

    if (kpiQuery.isLoading) {
        return <div>Loading dashboard...</div>;
    }
    return (
        <div className="space-y-6">
            <PageHeader
                title="Business Intelligence"
                description="Enterprise analytics dashboard"
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
            </div>
        </div>
    );
}