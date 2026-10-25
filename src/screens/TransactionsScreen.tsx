import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenWrapper } from '../components/layout';
import { Icon } from '../components/ui';
import { useExpenses } from '../features/expenses/hooks/useExpenses';
import type { Transaction, TransactionType } from '../features/expenses/types';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../theme';
import type { MainTabScreenProps } from '../types/navigation';
import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/date';

export type TransactionsScreenProps = MainTabScreenProps<'Transactions'>;

type FilterType = 'all' | TransactionType;

export const TransactionsScreen: React.FC<TransactionsScreenProps> = () => {
  const { transactions } = useExpenses();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'all') return transactions;
    return transactions.filter(tx => tx.type === activeFilter);
  }, [transactions, activeFilter]);

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const isIncome = item.type === 'income';

    return (
      <View style={styles.txRow}>
        <View style={styles.txLeft}>
          <View
            style={[
              styles.iconCircle,
              isIncome ? styles.incomeCircle : styles.expenseCircle,
            ]}
          >
            <Icon name={item.categoryIcon} size={22} />
          </View>
          <View style={styles.txInfo}>
            <Text style={styles.txTitle}>{item.title}</Text>
            <Text style={styles.txSubtitle}>
              {item.category} • {formatDate(item.date)}
            </Text>
          </View>
        </View>

        <View style={styles.txRight}>
          <Text
            style={[
              styles.amount,
              isIncome ? styles.incomeText : styles.expenseText,
            ]}
          >
            {isIncome ? '+' : '-'}
            {formatCurrency(item.amount)}
          </Text>
          {item.paymentMethod ? (
            <Text style={styles.paymentMethod}>{item.paymentMethod}</Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Transactions</Text>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['all', 'expense', 'income'] as const).map(filter => {
            const isActive = activeFilter === filter;
            const label =
              filter === 'all'
                ? 'All'
                : filter === 'expense'
                  ? 'Expenses'
                  : 'Income';

            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.7}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Transaction List */}
        <FlatList
          data={filteredTransactions}
          keyExtractor={item => item.id}
          renderItem={renderTransactionItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  screenTitle: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginVertical: spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterPill: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surfaceSecondary,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.textInverse,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeCircle: {
    backgroundColor: colors.successLight,
  },
  expenseCircle: {
    backgroundColor: colors.surfaceSecondary,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  txSubtitle: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
  txRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
  },
  incomeText: {
    color: colors.success,
  },
  expenseText: {
    color: colors.textPrimary,
  },
  paymentMethod: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
});
