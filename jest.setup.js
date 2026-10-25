/* eslint-disable no-undef */
jest.mock('react-native-screens', () => {
  const { View } = require('react-native');
  return {
    enableScreens: jest.fn(),
    screensEnabled: jest.fn(() => false),
    ScreenContainer: View,
    Screen: View,
    NativeScreen: View,
    NativeScreenContainer: View,
    ScreenStack: View,
    ScreenStackHeaderConfig: View,
    ScreenStackHeaderSubview: View,
    SearchBar: View,
    Tabs: View,
  };
});
