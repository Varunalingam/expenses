import React from 'react';
import {
  Image,
  type ImageStyle,
  type StyleProp,
  StyleSheet,
} from 'react-native';
import { type IconName, ICONS } from '../../constants/icons';

export interface IconProps {
  name: IconName;
  size?: number;
  tintColor?: string;
  style?: StyleProp<ImageStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  tintColor,
  style,
}) => {
  const iconSource = ICONS[name];

  if (!iconSource) {
    return null;
  }

  const customStyle: ImageStyle = {
    width: size,
    height: size,
    ...(tintColor ? { tintColor } : {}),
  };

  return (
    <Image
      source={iconSource}
      style={[styles.base, customStyle, style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  base: {
    resizeMode: 'contain',
  },
});
