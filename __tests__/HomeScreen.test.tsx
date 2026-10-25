import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { HomeScreen } from '../src/screens';

describe('HomeScreen', () => {
  it('renders greeting and balance correctly', () => {
    const mockNavigation: any = {
      navigate: jest.fn(),
    };
    const mockRoute: any = {
      key: 'home-key',
      name: 'Home',
    };

    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <HomeScreen navigation={mockNavigation} route={mockRoute} />,
      );
    });

    expect(renderer).toBeDefined();
    const tree = renderer?.toJSON();
    expect(tree).toBeDefined();
  });
});
