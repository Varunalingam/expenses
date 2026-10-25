import React from 'react';
import { Linking } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { SettingsScreen } from '../src/screens';

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders settings options, Icons8 attribution, and Google Antigravity credits', () => {
    const mockNavigation: any = {
      navigate: jest.fn(),
    };
    const mockRoute: any = {
      key: 'settings-key',
      name: 'Settings',
    };

    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <SettingsScreen navigation={mockNavigation} route={mockRoute} />,
      );
    });

    expect(renderer).toBeDefined();
    const tree = renderer?.toJSON();
    expect(tree).toBeDefined();

    // Verify text contents
    const root = renderer!.root;
    expect(
      root.findAll(node => node.props.children === 'Icons8').length,
    ).toBeGreaterThan(0);
    expect(
      root.findAll(node => node.props.children === 'Google Antigravity').length,
    ).toBeGreaterThan(0);
  });

  it('opens Google Antigravity URL when tapped', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockResolvedValue(true as any);

    const mockNavigation: any = {
      navigate: jest.fn(),
    };
    const mockRoute: any = {
      key: 'settings-key',
      name: 'Settings',
    };

    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <SettingsScreen navigation={mockNavigation} route={mockRoute} />,
      );
    });

    const root = renderer!.root;
    const touchables =
      root.findAllByType('RNGestureHandlerButton' as any).length > 0
        ? root.findAllByType('RNGestureHandlerButton' as any)
        : root.findAll(node => typeof node.props.onPress === 'function');

    // Find the touchable that triggers handleOpenAntigravity
    const antigravityTouchable = touchables.find(node => {
      return (
        node.props.onPress &&
        node.findAll &&
        node.findAll(child => child.props?.children === 'Google Antigravity')
          .length > 0
      );
    });

    expect(antigravityTouchable).toBeDefined();
    ReactTestRenderer.act(() => {
      antigravityTouchable?.props.onPress();
    });

    expect(openURLSpy).toHaveBeenCalledWith('https://antigravity.google');
    openURLSpy.mockRestore();
  });
});
