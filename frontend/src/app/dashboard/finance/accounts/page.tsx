"use client";

import { useEffect, useState } from "react";
import {
  createFinanceAccount,
  FinanceAccount,
  getFinanceAccounts,
} from "@/modules/finance/services/finance.service";
import PageHeader from "@/components/shared/page-header";
import FormSection from "@/components/shared/form-section";
import TableWrapper from "@/components/shared/table-wrapper";
import StatCard from "@/components/shared/stat-card";

import {
  Landmark,
  Building2,
  Wallet,
  Receipt,
  Download,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type AccountType = "ASSET" | "LIABILITY" | "EQUITY" | "INCOME" | "EXPENSE";

export default function FinanceAccountsPage() {
  const [accounts, setAccounts] = useState<FinanceAccount[]>([]);
  const [form, setForm] = useState({
    code: "",
    name: "",
    type: "ASSET" as AccountType,
    description: "",
  });

  const fetchAccounts = async () => {
    const data = await getFinanceAccounts();
    setAccounts(data);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createFinanceAccount(form);
      setForm({
        code: "",
        name: "",
        type: "ASSET",
        description: "",
      });
      fetchAccounts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Chart of Accounts"
        description="Manage accounting accounts used throughout the ERP."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Accounts"
          value={accounts.length}
          icon={Landmark}
          trend="+2.1%"
          trendType="up"
        />

        <StatCard
          title="Assets"
          value={
            accounts.filter(
              (a) => a.type === "ASSET"
            ).length
          }
          icon={Wallet}
        />

        <StatCard
          title="Income Accounts"
          value={
            accounts.filter(
              (a) => a.type === "INCOME"
            ).length
          }
          icon={Receipt}
        />

        <StatCard
          title="Active Accounts"
          value={
            accounts.filter(
              (a) => a.isActive
            ).length
          }
          icon={Building2}
        />
      </div>

      <FormSection
        title="Create Account"
        description="Add a new account to the chart of accounts."
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
            <Landmark className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Create Account
            </h2>

            <p className="text-slate-500">
              Configure accounts used by journal entries.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
          <Input
            className="
              h-12
              rounded-xl
              border-slate-200
            "
            placeholder="Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />

          <Input
            className="
              h-12
              rounded-xl
              border-slate-200
            "
            placeholder="Account Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="
              h-12
              rounded-xl
              border
              border-slate-200
              px-3
            "
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as AccountType })
            }
          >
            <option value="ASSET">ASSET</option>
            <option value="LIABILITY">LIABILITY</option>
            <option value="EQUITY">EQUITY</option>
            <option value="INCOME">INCOME</option>
            <option value="EXPENSE">EXPENSE</option>
          </select>

          <Input
            className="
              h-12
              rounded-xl
              border-slate-200
            "
            placeholder="Description"
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
              bg-blue-600
              hover:bg-blue-700
              md:col-span-4
            "
          >
            Create Account
          </Button>
        </form>
      </FormSection>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search accounts..."
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
          Chart of Accounts
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-b">
                  <td className="py-3 font-medium">{account.code}</td>
                  <td>{account.name}</td>
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
                      {account.type}
                    </span>
                  </td>
                  <td>{account.description || "-"}</td>
                  <td>
                    <span
                      className={
                        account.isActive
                          ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                          : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                      }
                    >
                      {account.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
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