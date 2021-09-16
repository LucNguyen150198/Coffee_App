import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  findNodeHandle,
} from 'react-native';
import { Colors, FontStyle, h, Layout, w } from '../constants';
import { ScrollTabView } from '../components';

export const Message = () => {
  return (
    <ScrollTabView>
      <View style={{ flex: 1, backgroundColor: 'red' }} title={'Chat'} />
      <View style={{ flex: 1, backgroundColor: 'yellow' }} title={'Notification'} />
    </ScrollTabView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
});
