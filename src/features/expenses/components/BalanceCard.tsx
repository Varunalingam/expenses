import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from '../../../components/ui';
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from '../../../theme';
import { formatCurrency } from '../../../utils/currency';
import type { ExpenseSummary } from '../types';

export interface BalanceCardProps {
  summary: ExpenseSummary;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ summary }) => {
  const budgetRatio = Math.min(
    1,
    summary.totalSpentThisMonth / (summary.monthlyBudget || 1),
  );
  const budgetPercentage = Math.round(budgetRatio * 100);

  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.label}>Total Balance</Text>
      <Text style={styles.balance}>{formatCurrency(summary.totalBalance)}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.iconCircleIncome}>
            <Icon name="arrowUp" size={16} />
          </View>
          <View>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.incomeValue}>
              +{formatCurrency(summary.monthlyIncome)}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <View style={styles.iconCircleExpense}>
            <Icon name="arrowDown" size={16} />
          </View>
          <View>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.expenseValue}>
              -{formatCurrency(summary.monthlyExpense)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.budgetHeader}>
          <Text style={styles.budgetLabel}>Monthly Budget</Text>
          <Text style={styles.budgetPercentage}>{budgetPercentage}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${budgetPercentage}%` }]}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.xs,
  },
  balance: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  iconCircleIncome: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleExpense: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: colors.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
  },
  incomeValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.success,
  },
  expenseValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.danger,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  budgetContainer: {
    marginTop: spacing.md,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  budgetLabel: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  budgetPercentage: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  progressBarBackground: {
    height: 6,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surfaceSecondary,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
  },
});
