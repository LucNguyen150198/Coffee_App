import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, Layout, RADIUS, SPACING, w } from '@constants';

const CARD_WIDTH = w * 0.41;
const CARD_HEIGHT = CARD_WIDTH * 1.2;
export const Card = ({
  width = CARD_WIDTH,
  height = CARD_HEIGHT,
  backgroundColor = Colors.white,
  border = RADIUS,
  shadow,
  children,
  style,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={[
          {
            width,
            height,
            borderRadius: border,
            backgroundColor,
            padding: SPACING,
          },
          shadow && Layout.shadowCard,
          style,
        ]}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
