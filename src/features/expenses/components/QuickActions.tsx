import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../../components/ui';
import type { IconName } from '../../../constants/icons';
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from '../../../theme';

interface ActionItem {
  id: string;
  label: string;
  icon: IconName;
  onPress: () => void;
}

export interface QuickActionsProps {
  onAddExpense?: () => void;
  onAddIncome?: () => void;
  onScanReceipt?: () => void;
  onViewBudgets?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddExpense,
  onAddIncome,
  onScanReceipt,
  onViewBudgets,
}) => {
  const actions: ActionItem[] = [
    {
      id: 'add',
      label: 'Add Expense',
      icon: 'plus',
      onPress: () => onAddExpense?.(),
    },
    {
      id: 'income',
      label: 'Add Income',
      icon: 'income',
      onPress: () => onAddIncome?.(),
    },
    {
      id: 'receipt',
      label: 'Receipts',
      icon: 'receipt',
      onPress: () => onScanReceipt?.(),
    },
    {
      id: 'budget',
      label: 'Budgets',
      icon: 'budget',
      onPress: () => onViewBudgets?.(),
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map(action => (
        <TouchableOpacity
          key={action.id}
          activeOpacity={0.7}
          onPress={action.onPress}
          style={styles.actionButton}
        >
          <View style={styles.iconContainer}>
            <Icon name={action.icon} size={28} />
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
    textAlign: 'center',
  },
});
