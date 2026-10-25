import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Icon } from '../../../components/ui';
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from '../../../theme';
import { formatCurrency } from '../../../utils/currency';
import { formatDate } from '../../../utils/date';
import type { Transaction } from '../types';

export interface RecentTransactionsListProps {
  transactions: Transaction[];
  onSeeAllPress?: () => void;
  onTransactionPress?: (transaction: Transaction) => void;
}

export const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({
  transactions,
  onSeeAllPress,
  onTransactionPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        {onSeeAllPress ? (
          <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Card variant="flat" style={styles.card}>
        {transactions.map((tx, index) => {
          const isIncome = tx.type === 'income';
          const isLast = index === transactions.length - 1;

          return (
            <TouchableOpacity
              key={tx.id}
              activeOpacity={0.7}
              onPress={() => onTransactionPress?.(tx)}
              style={[styles.item, isLast && styles.noBorder]}
            >
              <View style={styles.leftContent}>
                <View
                  style={[
                    styles.iconCircle,
                    isIncome ? styles.incomeBg : styles.expenseBg,
                  ]}
                >
                  <Icon name={tx.categoryIcon} size={22} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {tx.title}
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    {tx.category} • {formatDate(tx.date)}
                  </Text>
                </View>
              </View>

              <View style={styles.amountContainer}>
                <Text
                  style={[
                    styles.amountText,
                    isIncome ? styles.incomeText : styles.expenseText,
                  ]}
                >
                  {isIncome ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </Text>
                {tx.paymentMethod ? (
                  <Text style={styles.paymentMethod}>{tx.paymentMethod}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  card: {
    padding: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeBg: {
    backgroundColor: colors.successLight,
  },
  expenseBg: {
    backgroundColor: colors.surfaceSecondary,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  itemSubtitle: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountText: {
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
