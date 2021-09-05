import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors, FontStyle, Layout, RADIUS, SPACING, w } from '@constants';
import TouchableScale from 'react-native-touchable-scale';

const BUTTON_WIDTH = w * 0.9;
const BUTTON_HEIGHT = BUTTON_WIDTH * 0.13;

export const CustomButton = ({
  label = '',
  width = BUTTON_WIDTH,
  height = BUTTON_HEIGHT,
  backgroundColor = Colors.primary,
  labelColor = Colors.white,
  style,
  onPress,
  iconName,
}) => {
  const handleOnPress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <TouchableScale activeScale={0.8} friction={8} onPress={handleOnPress}>
      <View
        style={[
          styles.container,
          {
            width,
            height,
            backgroundColor,
          },
          style,
        ]}
      >
        <View style={[Layout.fill, Layout.rowCenter]}>
          {iconName && (
            <Image
              source={iconName}
              style={[styles.icon, { tintColor: labelColor }]}
            />
          )}
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              styles.label,
              {
                color: labelColor,
              },
            ]}
          >
            {label}
          </Text>
        </View>
      </View>
    </TouchableScale>
  );
};

export const IconButton = ({
  size = 35,
  backgroundColor = Colors.orange,
  style,
  onPress,
  iconName,
  tintColor = Colors.white,
  border = RADIUS,
}) => {
  const handleOnPress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleOnPress}>
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            backgroundColor,
            borderRadius: border,
          },
          style,
        ]}
      >
        <Image
          source={iconName}
          style={{
            tintColor,
            width: size / 3,
            height: size / 3,
            resizeMode: 'contain',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.center,
    padding: SPACING,
    borderRadius: RADIUS + 6,
  },
  label: {
    ...FontStyle.h3,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: SPACING,
  },
});
