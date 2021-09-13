import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import {
  Colors,
  FontStyle,
  Layout,
  RADIUS,
  SPACING,
  w,
  HEADER_MIN_HEIGHT,
  HEADER_MAX_HEIGHT,
} from '../constants';
import { TextInputMask } from 'react-native-masked-text';
export const InputSearchAnimation = React.forwardRef(
  (
    {
      label,
      width = w * 0.9,
      height = 45,
      iconName,
      multiline,
      style,
      options,
      type,
      error,
      animation,
      inputRange,
      ...props
    },
    ref
  ) => {
    const inputRange1 = [HEADER_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT];
    const scaleWidth = animation.interpolate({
      inputRange,
      outputRange: [width, 22],
      extrapolate: 'clamp',
    });
    const scaleHeight = animation.interpolate({
      inputRange,
      outputRange: [45, 22],
      extrapolate: 'clamp',
    });
    const translateX = animation.interpolate({
      inputRange: inputRange1,
      outputRange: [0, w * 0.35],
      extrapolate: 'clamp',
    });
    const translateY = animation.interpolate({
      inputRange: inputRange1,
      outputRange: [0, -HEADER_MIN_HEIGHT / 2],
      extrapolate: 'clamp',
    });
    const opacity = animation.interpolate({
      inputRange,
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={[styles.container, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <Image
          source={iconName}
          style={[
            styles.icon,
            {
              position: 'absolute',
              right: -(w * 0.4),
              top: -HEADER_MIN_HEIGHT / 2,
              marginRight: 0,
              tintColor: Colors.white,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.content,
            {
              width: scaleWidth,
              height: scaleHeight,
              backgroundColor: error ? '#ffcccc' : Colors.ghost_white,
              transform: [{ translateX }, { translateY }],
              opacity,
            },
          ]}
        >
          {iconName && <Image source={iconName} style={styles.icon} />}
          {type ? (
            <TextInputMask
              ref={ref}
              options={options}
              type={type}
              style={[styles.textInput, multiline && { paddingTop: SPACING }]}
              placeholderTextColor={Colors.suva_grey}
              multiline={multiline}
              {...props}
            />
          ) : (
            <TextInput
              ref={ref}
              style={[styles.textInput, multiline && { paddingTop: SPACING }]}
              placeholderTextColor={Colors.suva_grey}
              multiline={multiline}
              {...props}
            />
          )}
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {},

  content: {
    ...Layout.rowVCenter,
    borderRadius: RADIUS + 8,
    paddingHorizontal: SPACING,
  },
  label: {
    ...FontStyle.h4,
    color: Colors.suva_grey,
    marginBottom: SPACING,
  },

  textInput: {
    ...FontStyle.p1,
    width: '100%',
    height: '100%',
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.ghost,
    marginRight: SPACING,
  },
});
