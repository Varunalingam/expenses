import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../components/ui';
import {
  AnalyticsScreen,
  BudgetsScreen,
  HomeScreen,
  SettingsScreen,
  TransactionsScreen,
} from '../screens';
import { colors, fontSize, fontWeight } from '../theme';
import type { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;
  const tabBarHeight =
    Platform.OS === 'ios' ? 60 + bottomInset : 64 + bottomInset;
  const paddingBottom =
    Platform.OS === 'ios'
      ? Math.max(bottomInset, 16)
      : Math.max(bottomInset, 8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: [
          styles.tabBar,
          {
            height: tabBarHeight,
            paddingBottom,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={22}
              tintColor={focused ? colors.tabBarActive : colors.tabBarInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="receipt"
              size={22}
              tintColor={focused ? colors.tabBarActive : colors.tabBarInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetsScreen}
        options={{
          tabBarLabel: 'Budgets',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="budget"
              size={22}
              tintColor={focused ? colors.tabBarActive : colors.tabBarInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="chart"
              size={22}
              tintColor={focused ? colors.tabBarActive : colors.tabBarInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="settings"
              size={22}
              tintColor={focused ? colors.tabBarActive : colors.tabBarInactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBackground,
    borderTopColor: colors.tabBarBorder,
    borderTopWidth: 1,
    paddingTop: 8,
    elevation: 8,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
  },
});
