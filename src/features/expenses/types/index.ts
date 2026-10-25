import type { IconName } from '../../../constants/icons';

export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  categoryIcon: IconName;
  amount: number;
  type: TransactionType;
  date: string;
  paymentMethod?: string;
}

export interface CategorySpending {
  id: string;
  name: string;
  spent: number;
  allocated: number;
  icon: IconName;
  color: string;
}

export interface ExpenseSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  savingsRate: number;
  monthlyBudget: number;
  totalSpentThisMonth: number;
}
