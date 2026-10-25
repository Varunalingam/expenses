import React from 'react';
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from '../../theme';

export interface BadgeProps {
  label: string;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const getBadgeStyles = (
  variant: 'success' | 'danger' | 'warning' | 'info' | 'neutral',
) => {
  switch (variant) {
    case 'success':
      return { container: styles.success, text: styles.successText };
    case 'danger':
      return { container: styles.danger, text: styles.dangerText };
    case 'warning':
      return { container: styles.warning, text: styles.warningText };
    case 'info':
      return { container: styles.info, text: styles.infoText };
    case 'neutral':
    default:
      return { container: styles.neutral, text: styles.neutralText };
  }
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  style,
  textStyle,
}) => {
  const variantStyles = getBadgeStyles(variant);

  return (
    <View style={[styles.badge, variantStyles.container, style]}>
      <Text style={[styles.text, variantStyles.text, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
  },
  neutral: {
    backgroundColor: colors.surfaceSecondary,
  },
  neutralText: {
    color: colors.textSecondary,
  },
  success: {
    backgroundColor: colors.successLight,
  },
  successText: {
    color: colors.success,
  },
  danger: {
    backgroundColor: colors.dangerLight,
  },
  dangerText: {
    color: colors.danger,
  },
  warning: {
    backgroundColor: colors.warningLight,
  },
  warningText: {
    color: colors.warning,
  },
  info: {
    backgroundColor: colors.infoLight,
  },
  infoText: {
    color: colors.info,
  },
});
