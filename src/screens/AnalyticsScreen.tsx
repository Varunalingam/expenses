import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenWrapper } from '../components/layout';
import { Card, Icon } from '../components/ui';
import { useExpenses } from '../features/expenses/hooks/useExpenses';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../theme';
import type { MainTabScreenProps } from '../types/navigation';
import { formatCurrency } from '../utils/currency';

export type AnalyticsScreenProps = MainTabScreenProps<'Analytics'>;

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = () => {
  const { summary, categories } = useExpenses();

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Spending Analytics</Text>

        {/* Savings Rate Card */}
        <Card variant="elevated" style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardSubtitle}>Monthly Savings Rate</Text>
              <Text style={styles.cardHighlight}>{summary.savingsRate}%</Text>
            </View>
            <View style={styles.iconCircle}>
              <Icon name="chart" size={32} />
            </View>
          </View>
          <Text style={styles.cardNote}>
            You saved{' '}
            {formatCurrency(summary.monthlyIncome - summary.monthlyExpense)}{' '}
            this month. Keep it up!
          </Text>
        </Card>

        {/* Category Breakdown */}
        <Text style={styles.sectionTitle}>Expense Distribution</Text>
        <Card variant="flat" style={styles.breakdownCard}>
          {categories.map(cat => {
            const pct = Math.round(
              (cat.spent / (summary.monthlyExpense || 1)) * 100,
            );

            return (
              <View key={cat.id} style={styles.row}>
                <View style={styles.rowLeft}>
                  <View
                    style={[styles.categoryDot, { backgroundColor: cat.color }]}
                  />
                  <Text style={styles.categoryName}>{cat.name}</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.catAmount}>
                    {formatCurrency(cat.spent)}
                  </Text>
                  <Text style={styles.catPct}>{pct}%</Text>
                </View>
              </View>
            );
          })}
        </Card>
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
  summaryCard: {
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  cardHighlight: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginTop: spacing.xxs,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNote: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  breakdownCard: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.round,
  },
  categoryName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  catAmount: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  catPct: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    width: 36,
    textAlign: 'right',
  },
});
