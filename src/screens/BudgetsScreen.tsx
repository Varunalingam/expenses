import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenWrapper } from '../components/layout';
import { Card, Icon } from '../components/ui';
import { useExpenses } from '../features/expenses/hooks/useExpenses';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../theme';
import type { MainTabScreenProps } from '../types/navigation';
import { formatCurrency } from '../utils/currency';

export type BudgetsScreenProps = MainTabScreenProps<'Budgets'>;

export const BudgetsScreen: React.FC<BudgetsScreenProps> = () => {
  const { categories, summary } = useExpenses();

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Monthly Budgets</Text>

        {/* Overall budget overview */}
        <Card variant="elevated" style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>Total Budget Progress</Text>
          <Text style={styles.overviewAmount}>
            {formatCurrency(summary.totalSpentThisMonth)}
            <Text style={styles.overviewTotal}>
              {' '}
              / {formatCurrency(summary.monthlyBudget)}
            </Text>
          </Text>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(100, Math.round((summary.totalSpentThisMonth / summary.monthlyBudget) * 100))}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.remainingText}>
            {formatCurrency(
              Math.max(0, summary.monthlyBudget - summary.totalSpentThisMonth),
            )}{' '}
            remaining this month
          </Text>
        </Card>

        {/* Category Budget Details */}
        <Text style={styles.sectionHeader}>Category Allocations</Text>
        {categories.map(cat => {
          const ratio = Math.min(1, cat.spent / (cat.allocated || 1));
          const percentage = Math.round(ratio * 100);

          return (
            <Card key={cat.id} variant="flat" style={styles.catCard}>
              <View style={styles.catHeader}>
                <View style={styles.catInfo}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: `${cat.color}15` },
                    ]}
                  >
                    <Icon name={cat.icon} size={22} />
                  </View>
                  <Text style={styles.catName}>{cat.name}</Text>
                </View>
                <Text style={styles.catSpent}>
                  {formatCurrency(cat.spent)}
                  <Text style={styles.catAllocated}>
                    {' '}
                    / {formatCurrency(cat.allocated)}
                  </Text>
                </Text>
              </View>

              <View style={styles.progressBackground}>
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
            </Card>
          );
        })}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  screenTitle: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginVertical: spacing.md,
  },
  overviewCard: {
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  overviewLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  overviewAmount: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginVertical: spacing.xs,
  },
  overviewTotal: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
    color: colors.textMuted,
  },
  remainingText: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  sectionHeader: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  catCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  catHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  catInfo: {
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
  catName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  catSpent: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  catAllocated: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  progressBackground: {
    height: 6,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surfaceSecondary,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
  },
});
