import React from 'react';
import { Text } from 'react-native';
import { Colors, w } from '@constants';
export const Dash = ({ width = w * 0.9, color = Colors.suva_grey }) => {
  return (
    <Text ellipsizeMode="clip" numberOfLines={1} style={{ width, color }}>
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    </Text>
  );
};
