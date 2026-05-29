"use client";

import { useEffect, useState } from "react";
import {
  closeFinancialPeriod,
  createFinancialPeriod,
  FinancialPeriod,
  getFinancialPeriods,
  reopenFinancialPeriod,
} from "@/modules/finance/services/finance.service";
import { Card, CardContent } from "@/components/ui/card";
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
      alert("Failed to create period");
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
      <div>
        <h1 className="text-3xl font-bold">Financial Periods</h1>
        <p className="mt-2 text-gray-500">
          Create, close and reopen financial periods.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Create Period</h2>

          <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-4">
            <Input
              placeholder="Period Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
            />

            <Input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />

            <Button type="submit">Create Period</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Period List</h2>

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
                    <td>{period.status}</td>
                    <td>
                      {period.status === "OPEN" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleClose(period.id)}
                        >
                          Close
                        </Button>
                      ) : (
                        <Button
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
        </CardContent>
      </Card>
    </div>
  );
}