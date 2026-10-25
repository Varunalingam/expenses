import { NativeModules, Platform } from 'react-native';

interface SplashScreenNativeModule {
  hide: () => void;
}

export const SplashScreen = {
  /**
   * Dismisses the native launch/splash screen on Android with a smooth fade transition.
   * On iOS or test environments, this is a safe no-op.
   */
  hide: (): void => {
    if (Platform.OS === 'android') {
      const splashModule = (
        NativeModules as { SplashScreenModule?: SplashScreenNativeModule }
      ).SplashScreenModule;
      splashModule?.hide?.();
    }
  },
};
