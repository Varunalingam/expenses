import React from 'react';
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from '../../theme';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
}

const getVariantStyle = (
  variant: 'primary' | 'secondary' | 'outline' | 'ghost',
) => {
  switch (variant) {
    case 'secondary':
      return { button: styles.secondary, text: styles.secondaryText };
    case 'outline':
      return { button: styles.outline, text: styles.outlineText };
    case 'ghost':
      return { button: styles.ghost, text: styles.ghostText };
    case 'primary':
    default:
      return { button: styles.primary, text: styles.primaryText };
  }
};

const getSizeStyle = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return { button: styles.sm, text: styles.smText };
    case 'lg':
      return { button: styles.lg, text: styles.lgText };
    case 'md':
    default:
      return { button: styles.md, text: styles.mdText };
  }
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  leftIcon,
}) => {
  const variantStyle = getVariantStyle(variant);
  const sizeStyle = getSizeStyle(size);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variantStyle.button,
        sizeStyle.button,
        disabled && styles.disabled,
        style,
      ]}
    >
      {leftIcon}
      <Text
        style={[
          styles.text,
          variantStyle.text,
          sizeStyle.text,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  md: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: fontWeight.semibold,
  },
  smText: {
    fontSize: fontSize.sm,
  },
  mdText: {
    fontSize: fontSize.body,
  },
  lgText: {
    fontSize: fontSize.md,
  },
  primaryText: {
    color: colors.textInverse,
  },
  secondaryText: {
    color: colors.primary,
  },
  outlineText: {
    color: colors.textPrimary,
  },
  ghostText: {
    color: colors.textSecondary,
  },
  disabledText: {
    color: colors.textMuted,
  },
});
