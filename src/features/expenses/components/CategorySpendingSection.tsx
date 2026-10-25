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
import type { CategorySpending } from '../types';

export interface CategorySpendingSectionProps {
  categories: CategorySpending[];
}

export const CategorySpendingSection: React.FC<
  CategorySpendingSectionProps
> = ({ categories }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Category Spending</Text>

      <Card variant="flat" style={styles.card}>
        {categories.map((cat, index) => {
          const ratio = Math.min(1, cat.spent / (cat.allocated || 1));
          const percentage = Math.round(ratio * 100);
          const isLast = index === categories.length - 1;

          return (
            <View
              key={cat.id}
              style={[styles.itemContainer, isLast && styles.noBorder]}
            >
              <View style={styles.itemHeader}>
                <View style={styles.iconAndName}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: `${cat.color}15` },
                    ]}
                  >
                    <Icon name={cat.icon} size={22} />
                  </View>
                  <View>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    <Text style={styles.percentageText}>
                      {percentage}% of budget
                    </Text>
                  </View>
                </View>

                <View style={styles.amountContainer}>
                  <Text style={styles.spentAmount}>
                    {formatCurrency(cat.spent)}
                  </Text>
                  <Text style={styles.allocatedAmount}>
                    / {formatCurrency(cat.allocated)}
                  </Text>
                </View>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: cat.color,
                    },
                  ]}
                />
              </View>
            </View>
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
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  card: {
    padding: spacing.md,
  },
  itemContainer: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  iconAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  percentageText: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  spentAmount: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  allocatedAmount: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  progressTrack: {
    height: 4,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surfaceSecondary,
    overflow: 'hidden',
    marginTop: spacing.xxs,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.round,
  },
});
