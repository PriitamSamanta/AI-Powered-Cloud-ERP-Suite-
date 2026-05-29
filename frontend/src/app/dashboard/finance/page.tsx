"use client";

import { useEffect, useState } from "react";
import { getFinanceSummary, FinanceSummary } from "@/modules/finance/services/finance.service";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

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
      <div>
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Track income, expenses and net profit.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <h2 className="mt-2 text-2xl font-bold">
                ₹{summary?.totalIncome || 0}
              </h2>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">Total Expense</p>
              <h2 className="mt-2 text-2xl font-bold">
                ₹{summary?.totalExpense || 0}
              </h2>
            </div>
            <TrendingDown className="h-8 w-8 text-gray-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-500">Net Profit</p>
              <h2 className="mt-2 text-2xl font-bold">
                ₹{summary?.netProfit || 0}
              </h2>
            </div>
            <Wallet className="h-8 w-8 text-gray-500" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}