import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { channelList } from '../data';
import { Card } from '@components';
import {
  Colors,
  SPACING,
  FontStyle,
  Layout,
  RADIUS,
  w,
  h,
  Icons,
} from '../constants';
export const Chat = () => {
  const renderItem = ({ item, index }) => {
    return (
      <Card
        width={w * 0.9}
        height={w * 0.25}
        style={Layout.rowVCenter}
      >
        <Image source={{ uri: item?.image }} style={styles.avatar} />

        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.message}>
            {item.message}
          </Text>
          <Text numberOfLines={1} style={styles.name}>
            {item?.first_name} {item?.last_name}
          </Text>
        </View>

        <View style={[Layout.alignItemsEnd, Layout.justifyContentBetween]}>
          <View style={styles.indicator} />
          <Text style={styles.name}>09:45</Text>
        </View>
      </Card>
    );
  };

  return (
    <FlatList
      style={{ backgroundColor: Colors.white }}
      contentContainerStyle={{ alignItems: 'center' }}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
      data={channelList}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  name: {
    ...FontStyle.h5,
    paddingLeft: SPACING / 2,
    color: '#ACACAD',
  },
  message: {
    ...FontStyle.h4,
    color: Colors.Text,
    paddingBottom: SPACING,
  },
  content: {
    ...Layout.fill,
    paddingHorizontal: SPACING * 1.5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: RADIUS,
    resizeMode: 'contain',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: Colors.orange,
    marginBottom: SPACING,
  },
});
