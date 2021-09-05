import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import {
  Colors,
  FontStyle,
  Layout,
  RADIUS,
  SPACING,
  w,
  Icons,
} from '../constants';
import { IconButton } from './CustomButton';
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
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[styles.content, Layout.alignItemsStart]}>
          <View style={[Layout.rowVCenter, Layout.rowReverse]}>
            <Image
              source={Icons.hello}
              style={[
                styles.icon,
                { tintColor: '#F4C64C', marginLeft: SPACING / 2 },
              ]}
            />
            <Text style={styles.titleHome}>{title}</Text>
          </View>

          <View style={[Layout.rowVCenter, { marginTop: SPACING / 1.5 }]}>
            <Image source={Icons.pin} style={styles.icon} />
            <Text style={styles.subTitleHome}>{subTitle}</Text>
          </View>
        </View>
        {rightIcon && (
          <IconButton
            onPress={rightAction}
            iconName={rightIcon}
            border={RADIUS + 3}
            backgroundColor={Colors.azure}
            tintColor={Colors.primary}
            size={55}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: w,
  },
  headerContainer: {
    ...Layout.fill,
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    paddingHorizontal: SPACING 
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
    ...FontStyle.h4,
    marginTop: SPACING / 3,
    color: Colors.suva_grey,
  },
  subTitleHome: {
    ...FontStyle.h4,
    color: Colors.text,
    marginLeft: SPACING / 2,
  },
  icon: {
    width: w * 0.05,
    height: w * 0.05,
    resizeMode: 'contain',
  },
});
