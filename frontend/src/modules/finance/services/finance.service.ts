import api from "@/lib/axios";

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  recentIncome: [];
  recentExpense: [];
}

export const getFinanceSummary = async (): Promise<FinanceSummary> => {
  const response = await api.get("/finance/summary");
  return response.data;
};

export interface FinanceAccount {
  id: number;
  code: string;
  name: string;
  type: "ASSET" | "LIABILITY" | "EQUITY" | "INCOME" | "EXPENSE";
  description?: string;
  isActive: boolean;
}

export interface CreateAccountPayload {
  code: string;
  name: string;
  type: "ASSET" | "LIABILITY" | "EQUITY" | "INCOME" | "EXPENSE";
  description?: string;
}

export const getFinanceAccounts = async (): Promise<FinanceAccount[]> => {
  const response = await api.get("/finance/accounts");
  return response.data;
};

export const createFinanceAccount = async (
  data: CreateAccountPayload
): Promise<FinanceAccount> => {
  const response = await api.post("/finance/accounts", data);
  return response.data;
};

export interface FinanceIncome {
  id: number;
  title: string;
  amount: string;
  customerName?: string;
  paymentMethod: string;
  category: string;
  date: string;
  description?: string;
}

export interface CreateIncomePayload {
  title: string;
  amount: number;
  customerName?: string;
  paymentMethod: string;
  category: string;
  date: string;
  description?: string;
}

export const getFinanceIncome = async (): Promise<FinanceIncome[]> => {
  const response = await api.get("/finance/income");
  return response.data;
};

export const createFinanceIncome = async (
  data: CreateIncomePayload
): Promise<FinanceIncome> => {
  const response = await api.post("/finance/income", data);
  return response.data;
};

export interface FinanceExpense {
  id: number;
  title: string;
  amount: string;
  vendorName?: string;
  paymentMethod: string;
  category: string;
  date: string;
  description?: string;
}

export interface CreateExpensePayload {
  title: string;
  amount: number;
  vendorName?: string;
  paymentMethod: string;
  category: string;
  date: string;
  description?: string;
}

export const getFinanceExpense = async (): Promise<FinanceExpense[]> => {
  const response = await api.get("/finance/expense");
  return response.data;
};

export const createFinanceExpense = async (
  data: CreateExpensePayload
): Promise<FinanceExpense> => {
  const response = await api.post("/finance/expense", data);
  return response.data;
};

export interface JournalLine {
  id: number;
  type: "DEBIT" | "CREDIT";
  amount: string;
  description?: string;
  account: {
    id: number;
    code: string;
    name: string;
    type: string;
  };
}

export interface JournalEntry {
  id: number;
  entryNumber: string;
  date: string;
  description: string;
  referenceType: string;
  status: string;
  lines: JournalLine[];
}

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
  const response = await api.get("/finance/journal-entries");
  return response.data;
};

export interface FinancialPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: "OPEN" | "CLOSED";
}

export interface CreatePeriodPayload {
  name: string;
  startDate: string;
  endDate: string;
}

export const getFinancialPeriods = async (): Promise<FinancialPeriod[]> => {
  const response = await api.get("/finance/periods");
  return response.data;
};

export const createFinancialPeriod = async (
  data: CreatePeriodPayload
): Promise<FinancialPeriod> => {
  const response = await api.post("/finance/periods", data);
  return response.data;
};

export const closeFinancialPeriod = async (
  id: number
): Promise<FinancialPeriod> => {
  const response = await api.post(`/finance/periods/${id}/close`);
  return response.data;
};

export const reopenFinancialPeriod = async (
  id: number
): Promise<FinancialPeriod> => {
  const response = await api.post(`/finance/periods/${id}/reopen`);
  return response.data;
};