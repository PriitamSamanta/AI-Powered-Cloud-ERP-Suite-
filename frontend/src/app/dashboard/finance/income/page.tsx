"use client";

import { useEffect, useState } from "react";
import {
  createFinanceIncome,
  FinanceIncome,
  getFinanceIncome,
} from "@/modules/finance/services/finance.service";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div>
        <h1 className="text-3xl font-bold">Income</h1>
        <p className="mt-2 text-gray-500">Add and view company income.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Add Income</h2>

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
              placeholder="Customer Name"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
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
              Add Income
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
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
                    <td>₹{item.amount}</td>
                    <td>{item.customerName || "-"}</td>
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