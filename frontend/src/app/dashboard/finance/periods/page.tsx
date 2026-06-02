"use client";

import { useEffect, useState } from "react";
import {
  closeFinancialPeriod,
  createFinancialPeriod,
  FinancialPeriod,
  getFinancialPeriods,
  reopenFinancialPeriod,
} from "@/modules/finance/services/finance.service";
import PageHeader from "@/components/shared/page-header";
import FormSection from "@/components/shared/form-section";
import TableWrapper from "@/components/shared/table-wrapper";
import StatCard from "@/components/shared/stat-card";
import { toast } from "sonner";
import {
  CalendarRange,
  Lock,
  Unlock,
  Clock3,
  Download,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FinancePeriodsPage() {
  const [periods, setPeriods] = useState<FinancialPeriod[]>([]);
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const fetchPeriods = async () => {
    const data = await getFinancialPeriods();
    setPeriods(data);
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createFinancialPeriod(form);
      setForm({
        name: "",
        startDate: "",
        endDate: "",
      });
      fetchPeriods();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create period");
    }
  };

  const handleClose = async (id: number) => {
    await closeFinancialPeriod(id);
    fetchPeriods();
  };

  const handleReopen = async (id: number) => {
    await reopenFinancialPeriod(id);
    fetchPeriods();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Periods"
        description="Manage accounting periods and control transaction posting."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Periods"
          value={periods.length}
          icon={CalendarRange}
          trend="+1.2%"
          trendType="up"
        />

        <StatCard
          title="Open Periods"
          value={
            periods.filter(
              (period) =>
                period.status === "OPEN"
            ).length
          }
          icon={Unlock}
        />

        <StatCard
          title="Closed Periods"
          value={
            periods.filter(
              (period) =>
                period.status === "CLOSED"
            ).length
          }
          icon={Lock}
        />

        <StatCard
          title="Current Period"
          value={
            periods.find(
              (period) =>
                period.status === "OPEN"
            )?.name || "-"
          }
          icon={Clock3}
        />
      </div>

      <FormSection
        title="Create Financial Period"
        description="Define accounting periods for transaction control."
      >

        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
            "
          >
            <CalendarRange className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Create Period
            </h2>

            <p className="text-slate-500">
              Define a new accounting period.
            </p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-4">
          <Input
            className="
              h-12
              rounded-xl
              border-slate-200
            "
            placeholder="Period Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            className="
              h-12
              rounded-xl
              border-slate-200
            "
            type="date"
            value={form.startDate}
            onChange={(e) =>
              setForm({ ...form, startDate: e.target.value })
            }
          />

          <Input
            className="
              h-12
              rounded-xl
              border-slate-200
            "
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />

          <Button
            type="submit"
            className="
              h-12
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
            "
          >
            Create Period
          </Button>
        </form>

      </FormSection>


      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search periods..."
          className="max-w-md rounded-2xl"
        />

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>

          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <TableWrapper>

        <h2 className="mb-6 text-2xl font-bold">
          Financial Periods
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {periods.map((period) => (
                <tr key={period.id} className="border-b">
                  <td className="py-3 font-medium">{period.name}</td>
                  <td>{new Date(period.startDate).toLocaleDateString()}</td>
                  <td>{new Date(period.endDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={
                        period.status === "OPEN"
                          ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                          : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                      }
                    >
                      {period.status}
                    </span>
                  </td>
                  <td>
                    {period.status === "OPEN" ? (
                      <Button
                        className="rounded-xl"
                        size="sm"
                        variant="outline"
                        onClick={() => handleClose(period.id)}
                      >
                        Close
                      </Button>
                    ) : (
                      <Button
                        className="rounded-xl"
                        size="sm"
                        variant="outline"
                        onClick={() => handleReopen(period.id)}
                      >
                        Reopen
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </TableWrapper>
    </div>
  );
}