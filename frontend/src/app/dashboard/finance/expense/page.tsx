"use client";

import { useEffect, useState } from "react";
import {
  createFinanceExpense,
  FinanceExpense,
  getFinanceExpense,
} from "@/modules/finance/services/finance.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/page-header";
import FormSection from "@/components/shared/form-section";
import TableWrapper from "@/components/shared/table-wrapper";
import StatCard from "@/components/shared/stat-card";
import { toast } from "sonner";

import {
  TrendingDown,
  IndianRupee,
  Receipt,
  Building2,
  Download,
  FileText,
} from "lucide-react";

export default function FinanceExpensePage() {
  const [expense, setExpense] = useState<FinanceExpense[]>([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    vendorName: "",
    paymentMethod: "CASH",
    category: "",
    date: "",
    description: "",
  });

  const fetchExpense = async () => {
    const data = await getFinanceExpense();
    setExpense(data);
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createFinanceExpense({
        ...form,
        amount: Number(form.amount),
      });

      setForm({
        title: "",
        amount: "",
        vendorName: "",
        paymentMethod: "CASH",
        category: "",
        date: "",
        description: "",
      });

      fetchExpense();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create expense");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense Management"
        description="Track and manage company expenses."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value={`₹${expense
            .reduce(
              (sum, item) =>
                sum + Number(item.amount),
              0
            )
            .toLocaleString()}`}
          icon={IndianRupee}
          trend="+8.1%"
          trendType="up"
        />

        <StatCard
          title="Transactions"
          value={expense.length}
          icon={Receipt}
          trend="+5.2%"
          trendType="up"
        />

        <StatCard
          title="Vendors"
          value={
            new Set(
              expense.map(
                (item) => item.vendorName
              )
            ).size
          }
          icon={Building2}
          trend="+2.7%"
          trendType="up"
        />

        <StatCard
          title="Expense Growth"
          value="11.4%"
          icon={TrendingDown}
          trend="+1.2%"
          trendType="down"
        />
      </div>

      <FormSection
        title="Add Expense"
        description="Record company expenses and payments."
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
              bg-red-50
            "
          >
            <TrendingDown className="h-7 w-7 text-red-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Add Expense
            </h2>

            <p className="text-slate-500">
              Record company expenditures.
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
            placeholder="Vendor Name"
            value={form.vendorName}
            onChange={(e) =>
              setForm({ ...form, vendorName: e.target.value })
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
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <Input
            placeholder="Description"
            className="md:col-span-3"
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
              bg-red-600
              hover:bg-red-700
              md:col-span-3
            "
          >
            Add Expense
          </Button>
        </form>
      </FormSection>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search expenses..."
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
          Expense Records
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Title</th>
                <th>Amount</th>
                <th>Vendor</th>
                <th>Method</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {expense.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 font-medium">{item.title}</td>
                  <td>
                    <span
                      className="
                        rounded-full
                        bg-red-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-red-700
                      "
                    >
                      {item.category}
                    </span>
                  </td>
                  <td>{item.vendorName || "-"}</td>
                  <td>
                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-slate-700
                      "
                    >
                      {item.paymentMethod}
                    </span>
                  </td>
                  <td>{item.category}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWrapper>
    </div >
  );
}