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
  disabled,
  borderRadius= RADIUS + 6
}) => {
  const handleOnPress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <TouchableScale
      disabled={disabled}
      activeScale={0.8}
      friction={8}
      onPress={handleOnPress}
    >
      <View
        style={[
          styles.container,
          {
            width,
            height,
            backgroundColor,
            borderRadius
          },
          style,
          disabled && styles.btnDisabled,
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
  imageSize,
  backgroundColor = Colors.orange,
  style,
  onPress,
  iconName,
  tintColor = Colors.white,
  border = RADIUS / 2,
  disabled,
}) => {
  const handleOnPress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOnPress}
      disabled={disabled}
    >
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
            width: imageSize ?? size / 3,
            height: imageSize ?? size / 3,
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
  },
  label: {
    ...FontStyle.h3,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: SPACING,
  },
  btnDisabled: {
    backgroundColor: Colors.inactive,
  },
});
