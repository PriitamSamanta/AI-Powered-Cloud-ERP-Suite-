"use client";

import { useEffect, useState } from "react";
import {
  getJournalEntries,
  JournalEntry,
} from "@/modules/finance/services/finance.service";
import PageHeader from "@/components/shared/page-header";
import StatCard from "@/components/shared/stat-card";
import TableWrapper from "@/components/shared/table-wrapper";

import {
  BookOpen,
  Receipt,
  Landmark,
  IndianRupee,
} from "lucide-react";

export default function FinanceJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const fetchEntries = async () => {
    const data = await getJournalEntries();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Journal Entries"
        description="Monitor accounting transactions and ledger activity."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Journal Entries"
          value={entries.length}
          icon={BookOpen}
          trend="+4.2%"
          trendType="up"
        />

        <StatCard
          title="Transactions"
          value={entries.reduce(
            (sum, entry) => sum + entry.lines.length,
            0
          )}
          icon={Receipt}
          trend="+6.8%"
          trendType="up"
        />

        <StatCard
          title="Accounts Used"
          value={
            new Set(
              entries.flatMap((entry) =>
                entry.lines.map(
                  (line) => line.account.id
                )
              )
            ).size
          }
          icon={Landmark}
          trend="+2.4%"
          trendType="up"
        />

        <StatCard
          title="Volume"
          value={`₹${entries
            .flatMap((entry) => entry.lines)
            .reduce(
              (sum, line) =>
                sum + Number(line.amount),
              0
            )
            .toLocaleString()}`}
          icon={IndianRupee}
          trend="+8.3%"
          trendType="up"
        />
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
            "
          >

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900"><span
                  className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-blue-700
                  "
                >
                  {entry.entryNumber}
                </span></h2>
                <p className="text-sm text-gray-500">{entry.description}</p>
              </div>

              <div className="text-right text-sm text-gray-500">
                <p>{new Date(entry.date).toLocaleDateString()}</p>
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
                  {entry.referenceType}
                </span>
              </div>
            </div>

            <TableWrapper>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Account</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                  </tr>
                </thead>

                <tbody>
                  {entry.lines.map((line) => (
                    <tr key={line.id} className="border-b">
                      <td className="py-2">
                        {line.account.code} - {line.account.name}
                      </td>
                      <td>
                        <span
                          className={
                            line.type === "DEBIT"
                              ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                              : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                          }
                        >
                          {line.type}
                        </span>
                      </td>
                      <td className="font-semibold text-blue-600">
                        ₹{Number(line.amount).toLocaleString()}
                      </td>
                      <td>{line.description || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapper>

          </div>
        ))}
      </div>
    </div>
  );
}