"use client";

import { useEffect, useState } from "react";
import {
  createFinanceIncome,
  FinanceIncome,
  getFinanceIncome,
} from "@/modules/finance/services/finance.service";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/page-header";
import FormSection from "@/components/shared/form-section";
import TableWrapper from "@/components/shared/table-wrapper";
import StatCard from "@/components/shared/stat-card";

import {
  TrendingUp,
  IndianRupee,
  Receipt,
  Building2,
  Download,
  FileText,
} from "lucide-react";

export default function FinanceIncomePage() {
  const [income, setIncome] = useState<FinanceIncome[]>([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    customerName: "",
    paymentMethod: "CASH",
    category: "",
    date: "",
    description: "",
  });

  const fetchIncome = async () => {
    const data = await getFinanceIncome();
    setIncome(data);
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createFinanceIncome({
        ...form,
        amount: Number(form.amount),
      });

      setForm({
        title: "",
        amount: "",
        customerName: "",
        paymentMethod: "CASH",
        category: "",
        date: "",
        description: "",
      });

      fetchIncome();
    } catch (error) {
      console.error(error);
      alert("Failed to create income");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Income Management"
        description="Track and manage company revenue streams."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Income"
          value={`₹${income.reduce(
            (sum, item) => sum + Number(item.amount),
            0
          ).toLocaleString()}`}
          icon={IndianRupee}
          trend="+12.4%"
          trendType="up"
        />

        <StatCard
          title="Transactions"
          value={income.length}
          icon={Receipt}
          trend="+6.2%"
          trendType="up"
        />

        <StatCard
          title="Customers"
          value={
            new Set(
              income.map(
                (item) => item.customerName
              )
            ).size
          }
          icon={Building2}
          trend="+3.1%"
          trendType="up"
        />

        <StatCard
          title="Growth"
          value="18.2%"
          icon={TrendingUp}
          trend="+5.4%"
          trendType="up"
        />
      </div>

      <FormSection
        title="Add Income"
        description="Record new revenue transactions."
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div
              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-emerald-50
            "
            >
              <TrendingUp className="h-7 w-7 text-emerald-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Add Income
              </h2>

              <p className="text-slate-500">
                Record company revenue and payments.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
            <Input
              className="
              h-12
              rounded-xl
              border-slate-200
            "
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              className="
                h-12
                rounded-xl
                border-slate-200
              "
              placeholder="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <Input
              className="
                h-12
                rounded-xl
                border-slate-200
              "
              placeholder="Customer Name"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
            />

            <select
              className="
                h-12
                rounded-xl
                border
                border-slate-200
                px-3
              "
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value })
              }
            >
              <option value="CASH">CASH</option>
              <option value="BANK">BANK</option>
              <option value="UPI">UPI</option>
            </select>

            <Input
              className="
                h-12
                rounded-xl
                border-slate-200
              "
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <Input
              className="
                h-12
                rounded-xl
                border-slate-200
              "
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <Input
              placeholder="Description"
              className="md:col-span-3  h-12
              rounded-xl
              border-slate-200"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <Button
              type="submit"
              className="
                h-12
                rounded-xl
                bg-emerald-600
                hover:bg-emerald-700
                md:col-span-3
              "
            >
              Add Income
            </Button>
          </form>
        </CardContent>
      </FormSection>


      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search income..."
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
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Income List</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">Title</th>
                  <th>Amount</th>
                  <th>Customer</th>
                  <th>Method</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {income.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 font-medium">{item.title}</td>
                    <td className="font-semibold text-emerald-600">
                      ₹{Number(item.amount).toLocaleString()}
                    </td>
                    <td>{item.customerName || "-"}</td>
                    <td>{item.paymentMethod}</td>
                    <td>
                      <span
                        className="
                          rounded-full
                          bg-blue-100
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-blue-700
                        "
                      >
                        {item.category}
                      </span>
                    </td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </TableWrapper>
    </div>
  );
}