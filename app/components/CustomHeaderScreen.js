import React from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Colors,
  FontStyle,
  Layout,
  RADIUS,
  SPACING,
  w,
  Icons,
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
} from '@constants';
import { IconButton } from './CustomButton';
import { Badge } from './Badge';
export const CustomHeaderScreen = ({
  leftAction,
  leftIcon = Icons.left_arrow,
  title = '',
  subTitle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {leftIcon && (
          <IconButton
            onPress={leftAction}
            iconName={leftIcon}
            border={RADIUS + 3}
          />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
      </View>
    </View>
  );
};

export const HeaderHomeScreen = ({
  rightAction,
  rightIcon = Icons.left_arrow,
  title = '',
  subTitle,
  numberCart,
  animation,
}) => {
  const insets = useSafeAreaInsets();
  const inputRange = [0, HEADER_MAX_HEIGHT + insets.top];
  const inputRangeOpacity = [
    0,
    HEADER_MAX_HEIGHT / 2,
    HEADER_MAX_HEIGHT + insets.top,
  ];
  const translateYTitle = animation.interpolate({
    inputRange,
    outputRange: [0, -HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const translateYSubTitle = animation.interpolate({
    inputRange,
    outputRange: [0, HEADER_MIN_HEIGHT / 2 - SPACING / 1.5],
    extrapolate: 'clamp',
  });

  const translateYCart = animation.interpolate({
    inputRange,
    outputRange: [0, HEADER_MIN_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const opacity = animation.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 0.2, 0],
    extrapolate: 'clamp',
  });
  const titleColor = animation.interpolate({
    inputRange,
    outputRange: [Colors.text, Colors.white],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[styles.content, Layout.alignItemsStart]}>
          <Animated.View
            style={[
              Layout.rowVCenter,
              Layout.rowReverse,
              {
                opacity,
                transform: [{ translateY: translateYTitle }],
                marginBottom: SPACING / 1.5,
              },
            ]}
          >
            <Image
              source={Icons.hello}
              style={[
                styles.icon,
                {
                  tintColor: '#F4C64C',
                  marginLeft: SPACING / 2,
                },
              ]}
            />
            <Text style={styles.titleHome}>{title}</Text>
          </Animated.View>

          <Animated.View
            style={[
              Layout.rowVCenter,
              {
                transform: [{ translateY: translateYSubTitle }],
              },
            ]}
          >
            <Animated.Image
              source={Icons.pin}
              style={[styles.icon, { tintColor: titleColor }]}
            />
            <Animated.Text style={[styles.subTitleHome, { color: titleColor }]}>
              {subTitle}
            </Animated.Text>
          </Animated.View>
        </View>
        {rightIcon && (
          <Animated.View
            style={{
              opacity,
              transform: [{ translateY: translateYTitle }],
            }}
          >
            <IconButton
              onPress={rightAction}
              iconName={rightIcon}
              border={RADIUS + 3}
              backgroundColor={Colors.azure}
              tintColor={Colors.primary}
              size={55}
            />
            {!!numberCart && <Badge style={styles.badge} value={numberCart} />}
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: w,
    //backgroundColor:'red'
  },
  headerContainer: {
    ...Layout.fill,
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    paddingHorizontal: SPACING * 2,
  },
  content: {
    ...Layout.fill,
    ...Layout.justifyContentCenter,
    ...Layout.alignItemsEnd,
  },
  title: {
    ...FontStyle.h2,
    color: Colors.primary,
  },

  titleHome: {
    ...FontStyle.h1,
    color: Colors.text,
  },

  subTitle: {
    ...FontStyle.h5,
    marginTop: SPACING / 3,
    color: Colors.suva_grey,
  },
  subTitleHome: {
    ...FontStyle.h4,

    marginLeft: SPACING / 2,
  },
  icon: {
    width: w * 0.05,
    height: w * 0.05,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    right: SPACING / 2,
    top: SPACING / 2,
  },
});
