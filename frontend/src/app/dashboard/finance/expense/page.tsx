"use client";

import { useEffect, useState } from "react";
import {
  createFinanceExpense,
  FinanceExpense,
  getFinanceExpense,
} from "@/modules/finance/services/finance.service";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      alert("Failed to create expense");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expense</h1>
        <p className="mt-2 text-gray-500">Add and view company expenses.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Add Expense</h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              placeholder="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <Input
              placeholder="Vendor Name"
              value={form.vendorName}
              onChange={(e) =>
                setForm({ ...form, vendorName: e.target.value })
              }
            />

            <select
              className="rounded-md border px-3 py-2 text-sm"
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

            <Button type="submit" className="md:col-span-3">
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Expense List</h2>

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
                    <td>₹{item.amount}</td>
                    <td>{item.vendorName || "-"}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.category}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
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