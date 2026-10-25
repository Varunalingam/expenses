export const colors = {
  primary: '#4F46E5', // Indigo
  primaryLight: '#EEF2FF',
  primaryDark: '#3730A3',
  secondary: '#06B6D4', // Cyan
  secondaryLight: '#ECFEFF',

  // Status & semantic colors
  success: '#10B981',
  successLight: '#ECFDF5',
  danger: '#EF4444',
  dangerLight: '#FEF2F2',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  info: '#3B82F6',
  infoLight: '#EFF6FF',

  // Neutrals & backgrounds
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // Tab bar
  tabBarBackground: '#FFFFFF',
  tabBarActive: '#4F46E5',
  tabBarInactive: '#94A3B8',
  tabBarBorder: '#E2E8F0',

  // Category specific accent colors
  categories: {
    food: '#F97316',
    shopping: '#8B5CF6',
    transport: '#0EA5E9',
    bills: '#EF4444',
    entertainment: '#EC4899',
    income: '#10B981',
    other: '#64748B',
  },
} as const;

export type Colors = typeof colors;
