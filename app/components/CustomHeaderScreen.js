import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: w,
    paddingTop: StatusBar.currentHeight || 40,
  },
  headerContainer: {
    ...Layout.fill,
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    paddingHorizontal: SPACING,
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

  subTitle: {
    ...FontStyle.h4,
    marginTop: SPACING / 3,
    color: Colors.suva_grey,
  },
});
