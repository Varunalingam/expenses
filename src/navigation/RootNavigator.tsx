import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { colors } from '../theme';
import { BottomTabNavigator } from './BottomTabNavigator';

const AppNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.primary,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
  },
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={AppNavigationTheme}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
