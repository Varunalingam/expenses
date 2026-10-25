import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  type GestureResponderEvent,
  PanResponder,
  type PanResponderGestureState,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import type { MainTabParamList } from '../types/navigation';

export const TAB_ORDER: (keyof MainTabParamList)[] = [
  'Home',
  'Transactions',
  'Budgets',
  'Analytics',
  'Settings',
];

export const SWIPE_THRESHOLD = 40;
export const SWIPE_VELOCITY = 0.3;
export const DEBOUNCE_DELAY_MS = 300;

let lastSwipeTimestamp = 0;

export const resetSwipeTimestamp = (): void => {
  lastSwipeTimestamp = 0;
};

export const isSwipeMoveGesture = (dx: number, dy: number): boolean => {
  return Math.abs(dx) > 15 && Math.abs(dx) > Math.abs(dy) * 1.5;
};

export const handleSwipeGesture = (
  gestureState: { dx: number; vx: number },
  currentTab: keyof MainTabParamList,
  navigation: NavigationProp<ParamListBase>,
  customLastSwipeTime?: number,
): { handled: boolean; timestamp: number } => {
  const { dx, vx } = gestureState;
  const isSwipeLeft =
    dx < -SWIPE_THRESHOLD || (dx < -15 && vx < -SWIPE_VELOCITY);
  const isSwipeRight = dx > SWIPE_THRESHOLD || (dx > 15 && vx > SWIPE_VELOCITY);

  if (!isSwipeLeft && !isSwipeRight) {
    return { handled: false, timestamp: lastSwipeTimestamp };
  }

  const now = Date.now();
  const lastTime = customLastSwipeTime ?? lastSwipeTimestamp;
  if (now - lastTime < DEBOUNCE_DELAY_MS) {
    return { handled: false, timestamp: lastTime };
  }

  const currentIndex = TAB_ORDER.indexOf(currentTab);
  if (currentIndex === -1) {
    return { handled: false, timestamp: lastTime };
  }

  if (isSwipeLeft && currentIndex < TAB_ORDER.length - 1) {
    lastSwipeTimestamp = now;
    navigation?.navigate?.(TAB_ORDER[currentIndex + 1]);
    return { handled: true, timestamp: now };
  } else if (isSwipeRight && currentIndex > 0) {
    lastSwipeTimestamp = now;
    navigation?.navigate?.(TAB_ORDER[currentIndex - 1]);
    return { handled: true, timestamp: now };
  }

  return { handled: false, timestamp: lastTime };
};

export interface SwipeableTabScreenProps extends ViewProps {
  currentTab: keyof MainTabParamList;
  navigation: NavigationProp<ParamListBase>;
  children: React.ReactNode;
}

export const SwipeableTabScreen: React.FC<SwipeableTabScreenProps> = ({
  currentTab,
  navigation,
  children,
  style,
  ...rest
}) => {
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => isSwipeMoveGesture(gestureState.dx, gestureState.dy),
        onMoveShouldSetPanResponderCapture: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => isSwipeMoveGesture(gestureState.dx, gestureState.dy),
        onPanResponderRelease: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          handleSwipeGesture(gestureState, currentTab, navigation);
        },
        onPanResponderTerminationRequest: () => false,
      }),
    [currentTab, navigation],
  );

  return (
    <View
      testID={`swipeable-tab-${currentTab.toLowerCase()}`}
      style={[styles.container, style]}
      {...panResponder.panHandlers}
      {...rest}
    >
      {children}
    </View>
  );
};

export function withSwipeableTab<
  P extends { navigation: NavigationProp<ParamListBase> },
>(
  tabName: keyof MainTabParamList,
  Component: React.ComponentType<P>,
): React.FC<P> {
  const WrappedComponent: React.FC<P> = props => {
    return (
      <SwipeableTabScreen currentTab={tabName} navigation={props.navigation}>
        <Component {...props} />
      </SwipeableTabScreen>
    );
  };
  WrappedComponent.displayName = `withSwipeableTab(${
    Component.displayName || Component.name || tabName
  })`;
  return WrappedComponent;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
