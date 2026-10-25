import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import {
  handleSwipeGesture,
  isSwipeMoveGesture,
  resetSwipeTimestamp,
  SwipeableTabScreen,
  TAB_ORDER,
  withSwipeableTab,
} from '../src/navigation/SwipeableTabScreen';

describe('SwipeableTabScreen & Swipe Navigation', () => {
  let mockNavigation: NavigationProp<ParamListBase>;

  beforeEach(() => {
    jest.clearAllMocks();
    resetSwipeTimestamp();
    mockNavigation = {
      navigate: jest.fn(),
      dispatch: jest.fn(),
      reset: jest.fn(),
      goBack: jest.fn(),
      isFocused: jest.fn().mockReturnValue(true),
      canGoBack: jest.fn().mockReturnValue(false),
      getParent: jest.fn(),
      getState: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      setParams: jest.fn(),
      setOptions: jest.fn(),
      getId: jest.fn(),
    } as unknown as NavigationProp<ParamListBase>;
  });

  it('renders children correctly', () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <SwipeableTabScreen currentTab="Home" navigation={mockNavigation}>
          <Text>Home Screen Content</Text>
        </SwipeableTabScreen>,
      );
    });

    const root = renderer!.root;
    expect(root.findByProps({ testID: 'swipeable-tab-home' })).toBeDefined();
    expect(root.findByType(Text).props.children).toBe('Home Screen Content');
  });

  it('recognizes horizontal swipe movement and ignores vertical movements', () => {
    // Vertical scroll gesture (dy > dx) should NOT be captured
    expect(isSwipeMoveGesture(5, 50)).toBe(false);

    // Minor displacement (< 15px) should NOT be captured
    expect(isSwipeMoveGesture(10, 2)).toBe(false);

    // Diagonal movement without 1.5x horizontal dominance should NOT be captured
    expect(isSwipeMoveGesture(20, 18)).toBe(false);

    // Clear horizontal swipe (dx > 15 && dx > 1.5 * dy) SHOULD be captured
    expect(isSwipeMoveGesture(30, 5)).toBe(true);
    expect(isSwipeMoveGesture(-30, 5)).toBe(true);
  });

  it('swipes left from Home to shift to Transactions (next page)', () => {
    const result = handleSwipeGesture(
      { dx: -60, vx: -0.5 },
      'Home',
      mockNavigation,
    );

    expect(result.handled).toBe(true);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Transactions');
  });

  it('swiping right from Home (first tab) does not navigate beyond boundaries', () => {
    const result = handleSwipeGesture(
      { dx: 60, vx: 0.5 },
      'Home',
      mockNavigation,
    );

    expect(result.handled).toBe(false);
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('swipes right from Transactions to shift back to Home (previous page)', () => {
    const result = handleSwipeGesture(
      { dx: 55, vx: 0.4 },
      'Transactions',
      mockNavigation,
    );

    expect(result.handled).toBe(true);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
  });

  it('swipes sequentially across all tabs in order', () => {
    expect(TAB_ORDER).toEqual([
      'Home',
      'Transactions',
      'Budgets',
      'Analytics',
      'Settings',
    ]);

    for (let i = 0; i < TAB_ORDER.length - 1; i++) {
      resetSwipeTimestamp();
      const currentTab = TAB_ORDER[i];
      const nextTab = TAB_ORDER[i + 1];

      const navMock = {
        navigate: jest.fn(),
      } as unknown as NavigationProp<ParamListBase>;

      const result = handleSwipeGesture(
        { dx: -50, vx: -0.4 },
        currentTab,
        navMock,
      );

      expect(result.handled).toBe(true);
      expect(navMock.navigate).toHaveBeenCalledWith(nextTab);
    }
  });

  it('swiping left from Settings (last tab) does not navigate beyond boundaries', () => {
    const result = handleSwipeGesture(
      { dx: -60, vx: -0.5 },
      'Settings',
      mockNavigation,
    );

    expect(result.handled).toBe(false);
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('supports quick flick gestures based on velocity', () => {
    // Flick left with small displacement (-20px) but high velocity (-0.4)
    const result = handleSwipeGesture(
      { dx: -20, vx: -0.4 },
      'Budgets',
      mockNavigation,
    );

    expect(result.handled).toBe(true);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Analytics');
  });

  it('debounces rapid duplicate swipe gestures', () => {
    const firstResult = handleSwipeGesture(
      { dx: -60, vx: -0.5 },
      'Home',
      mockNavigation,
      0,
    );
    expect(firstResult.handled).toBe(true);

    // Second rapid swipe immediately after (< 300ms) with first timestamp
    const secondResult = handleSwipeGesture(
      { dx: -60, vx: -0.5 },
      'Home',
      mockNavigation,
      firstResult.timestamp,
    );
    expect(secondResult.handled).toBe(false);

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
  });

  it('ignores swipes below threshold and velocity', () => {
    const result = handleSwipeGesture(
      { dx: -10, vx: -0.1 },
      'Home',
      mockNavigation,
    );

    expect(result.handled).toBe(false);
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('withSwipeableTab HOC wraps screen component and forwards props', () => {
    interface DummyProps {
      navigation: NavigationProp<ParamListBase>;
      title: string;
    }

    const DummyScreen: React.FC<DummyProps> = ({ title }) => (
      <View>
        <Text>{title}</Text>
      </View>
    );

    const Wrapped = withSwipeableTab('Home', DummyScreen);
    expect(Wrapped.displayName).toBe('withSwipeableTab(DummyScreen)');

    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <Wrapped navigation={mockNavigation} title="Wrapped Screen Title" />,
      );
    });

    const root = renderer!.root;
    expect(root.findByProps({ testID: 'swipeable-tab-home' })).toBeDefined();
    expect(root.findByType(Text).props.children).toBe('Wrapped Screen Title');
  });
});
