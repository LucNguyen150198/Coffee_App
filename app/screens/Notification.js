import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { notificationList } from '../data';
import { Card } from '@components';
import { Colors, SPACING, FontStyle, Layout, w, Icons } from '@constants';
export const Notification = () => {
  const renderItem = ({ item }) => {
    return (
      <Card width={w * 0.9} height={w * 0.25} style={Layout.rowVCenter}>
        <View style={styles.avatar}>
          <Image source={Icons.tag} style={styles.icon} />
        </View>

        <View style={styles.content}>
        <Text numberOfLines={1} style={styles.message}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.message}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.name}>
            {item.content}
          </Text>
        </View>

        <View style={[Layout.alignItemsEnd, Layout.justifyContentBetween]}>
          {item.unread && <View style={styles.indicator} />}
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
      data={notificationList}
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
    paddingBottom: SPACING / 2,
  },
  content: {
    ...Layout.fill,
    paddingHorizontal: SPACING * 1.5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    ...Layout.center,
    backgroundColor: Colors.wisp_pink,
  },
  icon: {
    width: 25,
    height: 25,
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
