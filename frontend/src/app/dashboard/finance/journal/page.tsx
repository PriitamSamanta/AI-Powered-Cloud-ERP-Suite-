"use client";

import { useEffect, useState } from "react";
import {
  getJournalEntries,
  JournalEntry,
} from "@/modules/finance/services/finance.service";
import { Card, CardContent } from "@/components/ui/card";

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
      <div>
        <h1 className="text-3xl font-bold">Journal Entries</h1>
        <p className="mt-2 text-gray-500">
          View debit and credit accounting entries.
        </p>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">{entry.entryNumber}</h2>
                  <p className="text-sm text-gray-500">{entry.description}</p>
                </div>

                <div className="text-right text-sm text-gray-500">
                  <p>{new Date(entry.date).toLocaleDateString()}</p>
                  <p>{entry.referenceType}</p>
                </div>
              </div>

              <table className="w-full border-collapse text-sm">
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
                      <td>{line.type}</td>
                      <td>₹{line.amount}</td>
                      <td>{line.description || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}