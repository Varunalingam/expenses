import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenWrapper } from '../components/layout';
import { Icon } from '../components/ui';
import {
  BalanceCard,
  CategorySpendingSection,
  QuickActions,
  RecentTransactionsList,
} from '../features/expenses/components';
import { useExpenses } from '../features/expenses/hooks/useExpenses';
import type { Transaction } from '../features/expenses/types';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../theme';
import type { MainTabScreenProps } from '../types/navigation';

export type HomeScreenProps = MainTabScreenProps<'Home'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { transactions, categories, summary } = useExpenses();

  const handleSeeAll = useCallback(() => {
    navigation.navigate('Transactions');
  }, [navigation]);

  const handleViewBudgets = useCallback(() => {
    navigation.navigate('Budgets');
  }, [navigation]);

  const handleScanReceipt = useCallback(() => {
    navigation.navigate('Transactions');
  }, [navigation]);

  const handleTransactionPress = useCallback((_tx: Transaction) => {
    // Navigate or open transaction detail modal
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>Varun Alingam</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.notificationButton}
            accessibilityLabel="Notifications"
          >
            <Icon name="bell" size={24} />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <BalanceCard summary={summary} />

        {/* Quick Actions */}
        <QuickActions
          onAddExpense={handleSeeAll}
          onAddIncome={handleSeeAll}
          onScanReceipt={handleScanReceipt}
          onViewBudgets={handleViewBudgets}
        />

        {/* Category Spending Breakdown */}
        <CategorySpendingSection categories={categories} />

        {/* Recent Transactions List */}
        <RecentTransactionsList
          transactions={transactions}
          onSeeAllPress={handleSeeAll}
          onTransactionPress={handleTransactionPress}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  greeting: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  userName: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: borderRadius.round,
    backgroundColor: colors.danger,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
});
