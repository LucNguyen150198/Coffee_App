import React from 'react';
import { View } from 'react-native';
const SPACER_SIZE = 1000;
export const WrapperScrollView = ({
  backgroundColor,
  height = SPACER_SIZE,
}) => {
  return (
    <View
      style={{
        backgroundColor,
        height,
        position: 'absolute',
        top: -height,
        left: 0,
        right: 0,
      }}
    />
  );
};
