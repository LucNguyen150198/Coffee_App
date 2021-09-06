import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, FontStyle, Layout } from '@constants';
export const Badge = ({
  size = 20,
  backgroundColor = Colors.error,
  textColor = Colors.white,
  value,
  style,
}) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        Layout.center,
        style,
      ]}
    >
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={{ color: textColor, ...FontStyle.h5 }}
      >
        {value}
      </Text>
    </View>
  );
};

