import React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors } from '../../theme';

export interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: readonly Edge[];
  backgroundColor?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  edges = ['top', 'left', 'right'],
  backgroundColor = colors.background,
}) => {
  return (
    <SafeAreaView edges={edges} style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
