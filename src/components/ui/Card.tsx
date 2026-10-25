import React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { borderRadius, colors, spacing } from '../../theme';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'flat';
}

const getVariantStyle = (variant: 'elevated' | 'outlined' | 'flat') => {
  switch (variant) {
    case 'elevated':
      return styles.elevated;
    case 'outlined':
      return styles.outlined;
    case 'flat':
    default:
      return styles.flat;
  }
};

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'flat',
}) => {
  return (
    <View style={[styles.base, getVariantStyle(variant), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  flat: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  outlined: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    backgroundColor: colors.surface,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
});
