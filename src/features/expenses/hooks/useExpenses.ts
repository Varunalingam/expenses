import { useCallback, useMemo, useState } from 'react';
import { colors } from '../../../theme';
import type { CategorySpending, ExpenseSummary, Transaction } from '../types';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Whole Foods Market',
    category: 'Groceries',
    categoryIcon: 'food',
    amount: 86.42,
    type: 'expense',
    date: new Date().toISOString(),
    paymentMethod: 'Apple Pay',
  },
  {
    id: 'tx-2',
    title: 'Salary Deposit',
    category: 'Income',
    categoryIcon: 'income',
    amount: 3450.0,
    type: 'income',
    date: new Date().toISOString(),
    paymentMethod: 'Direct Deposit',
  },
  {
    id: 'tx-3',
    title: 'Uber Ride',
    category: 'Transport',
    categoryIcon: 'transport',
    amount: 24.5,
    type: 'expense',
    date: new Date(Date.now() - 86400000).toISOString(),
    paymentMethod: 'Credit Card',
  },
  {
    id: 'tx-4',
    title: 'Electric & Gas Bill',
    category: 'Utilities',
    categoryIcon: 'bills',
    amount: 112.3,
    type: 'expense',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'tx-5',
    title: 'Nike Store',
    category: 'Shopping',
    categoryIcon: 'shopping',
    amount: 129.99,
    type: 'expense',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    paymentMethod: 'Apple Pay',
  },
];

const INITIAL_CATEGORIES: CategorySpending[] = [
  {
    id: 'cat-1',
    name: 'Food & Dining',
    spent: 420.5,
    allocated: 650.0,
    icon: 'food',
    color: colors.categories.food,
  },
  {
    id: 'cat-2',
    name: 'Shopping',
    spent: 285.2,
    allocated: 400.0,
    icon: 'shopping',
    color: colors.categories.shopping,
  },
  {
    id: 'cat-3',
    name: 'Transport',
    spent: 145.0,
    allocated: 250.0,
    icon: 'transport',
    color: colors.categories.transport,
  },
  {
    id: 'cat-4',
    name: 'Bills & Utilities',
    spent: 310.8,
    allocated: 450.0,
    icon: 'bills',
    color: colors.categories.bills,
  },
];

export const useExpenses = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [categories] = useState<CategorySpending[]>(INITIAL_CATEGORIES);

  const summary = useMemo<ExpenseSummary>(() => {
    let monthlyIncome = 0;
    let monthlyExpense = 0;

    for (const tx of transactions) {
      if (tx.type === 'income') {
        monthlyIncome += tx.amount;
      } else {
        monthlyExpense += tx.amount;
      }
    }

    const totalBalance = 8450.75 + monthlyIncome - monthlyExpense;
    const monthlyBudget = 2500.0;
    const savingsRate =
      monthlyIncome > 0
        ? Math.round(((monthlyIncome - monthlyExpense) / monthlyIncome) * 100)
        : 0;

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpense,
      savingsRate,
      monthlyBudget,
      totalSpentThisMonth: monthlyExpense,
    };
  }, [transactions]);

  const addTransaction = useCallback((newTx: Omit<Transaction, 'id'>) => {
    const txWithId: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    setTransactions(prev => [txWithId, ...prev]);
  }, []);

  return {
    transactions,
    categories,
    summary,
    addTransaction,
  };
};
