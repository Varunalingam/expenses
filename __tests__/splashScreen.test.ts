import { NativeModules, Platform } from 'react-native';
import { SplashScreen } from '../src/native/splashScreen';

describe('SplashScreen native bridge', () => {
  const originalPlatform = Platform.OS;

  afterEach(() => {
    Object.defineProperty(Platform, 'OS', {
      get: () => originalPlatform,
      configurable: true,
    });
    delete (NativeModules as Record<string, unknown>).SplashScreenModule;
  });

  it('safely handles hide() on non-android platforms without error', () => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'ios',
      configurable: true,
    });

    const mockHide = jest.fn();
    (NativeModules as Record<string, unknown>).SplashScreenModule = {
      hide: mockHide,
    };

    expect(() => SplashScreen.hide()).not.toThrow();
    expect(mockHide).not.toHaveBeenCalled();
  });

  it('calls SplashScreenModule.hide() when on Android', () => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'android',
      configurable: true,
    });

    const mockHide = jest.fn();
    (NativeModules as Record<string, unknown>).SplashScreenModule = {
      hide: mockHide,
    };

    SplashScreen.hide();
    expect(mockHide).toHaveBeenCalledTimes(1);
  });

  it('gracefully handles missing SplashScreenModule on Android without throwing', () => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'android',
      configurable: true,
    });

    delete (NativeModules as Record<string, unknown>).SplashScreenModule;

    expect(() => SplashScreen.hide()).not.toThrow();
  });
});
