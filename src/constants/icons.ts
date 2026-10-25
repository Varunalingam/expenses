import type { ImageSourcePropType } from 'react-native';

export const ICONS: Record<string, ImageSourcePropType> = {
  home: require('../../assets/icons/icons8-home-48.png'),
  wallet: require('../../assets/icons/icons8-wallet-48.png'),
  receipt: require('../../assets/icons/icons8-receipt-48.png'),
  chart: require('../../assets/icons/icons8-pie-chart-48.png'),
  budget: require('../../assets/icons/icons8-budget-48.png'),
  settings: require('../../assets/icons/icons8-settings-48.png'),
  plus: require('../../assets/icons/icons8-plus-48.png'),
  food: require('../../assets/icons/icons8-restaurant-48.png'),
  shopping: require('../../assets/icons/icons8-shopping-bag-48.png'),
  transport: require('../../assets/icons/icons8-car-48.png'),
  bills: require('../../assets/icons/icons8-bill-48.png'),
  income: require('../../assets/icons/icons8-money-bag-48.png'),
  bell: require('../../assets/icons/icons8-bell-48.png'),
  arrowUp: require('../../assets/icons/icons8-arrow-up-48.png'),
  arrowDown: require('../../assets/icons/icons8-arrow-down-48.png'),
  antigravity: require('../../assets/icons/google-antigravity-48.png'),
  icons8: require('../../assets/icons/icons8-icons8-48.png'),
};

export type IconName =
  | 'home'
  | 'wallet'
  | 'receipt'
  | 'chart'
  | 'budget'
  | 'settings'
  | 'plus'
  | 'food'
  | 'shopping'
  | 'transport'
  | 'bills'
  | 'income'
  | 'bell'
  | 'arrowUp'
  | 'arrowDown'
  | 'antigravity'
  | 'icons8';
