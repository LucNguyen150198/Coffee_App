import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants';
import { ScrollTabView } from '../components';
import { Chat, Notification } from '../screens';
export const Message = () => {
  return (
    <ScrollTabView>
      <Chat title={'Chat'} />
      <Notification title={'Notification'} />
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
