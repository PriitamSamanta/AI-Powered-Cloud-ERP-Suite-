"use client";

import { useEffect, useState } from "react";
import { getFinanceSummary, FinanceSummary } from "@/modules/finance/services/finance.service";

import PageHeader from "@/components/shared/page-header";
import StatCard from "@/components/shared/stat-card";
import { TrendingDown, TrendingUp, Wallet, Landmark } from "lucide-react";

export default function FinanceDashboardPage() {
  const [summary, setSummary] = useState<FinanceSummary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getFinanceSummary();
        setSummary(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance Dashboard"
        description="Monitor revenue, expenses and profitability."
      />

      {/* Executive Banner */}
      <div
        className="
        rounded-3xl
        bg-gradient-to-r
        from-slate-900
        via-slate-800
        to-slate-900
        p-8
        text-white
        shadow-xl
      "
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Financial Overview
            </h1>

            <p className="mt-2 text-slate-300">
              Track income, expenses and business profitability
              in real time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div>
              <p className="text-sm text-slate-400">
                Revenue
              </p>

              <h2 className="mt-1 text-2xl font-bold text-emerald-400">
                ₹{summary?.totalIncome ?? 0}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Expenses
              </p>

              <h2 className="mt-1 text-2xl font-bold text-red-400">
                ₹{summary?.totalExpense ?? 0}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Profit
              </p>

              <h2 className="mt-1 text-2xl font-bold text-cyan-400">
                ₹{summary?.netProfit ?? 0}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Margin
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {summary?.totalIncome
                  ? Math.round(
                    (summary.netProfit /
                      summary.totalIncome) *
                    100
                  )
                  : 0}
                %
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`₹${summary?.totalIncome ?? 0}`}
          icon={TrendingUp}
          trend="+12.4%"
          trendType="up"
        />

        <StatCard
          title="Total Expenses"
          value={`₹${summary?.totalExpense ?? 0}`}
          icon={TrendingDown}
          trend="-3.1%"
          trendType="down"
        />

        <StatCard
          title="Net Profit"
          value={`₹${summary?.netProfit ?? 0}`}
          icon={Wallet}
          trend="+18.2%"
          trendType="up"
        />

        <StatCard
          title="Profit Margin"
          value={`${summary?.totalIncome
              ? Math.round(
                (summary.netProfit /
                  summary.totalIncome) *
                100
              )
              : 0
            }%`}
          icon={Landmark}
          trend="+5.4%"
          trendType="up"
        />
      </div>
    </div>
  );
}