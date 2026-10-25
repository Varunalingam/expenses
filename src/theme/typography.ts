import type { TextStyle } from 'react-native';

export const fontSize = {
  caption: 11,
  sm: 13,
  body: 15,
  md: 17,
  title: 20,
  heading: 24,
  display: 32,
} as const;

export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  heavy: '800' as TextStyle['fontWeight'],
};
