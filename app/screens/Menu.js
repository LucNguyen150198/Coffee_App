import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton, IconButton } from '../components';
import { Icons } from '../constants';
export const Menu = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <CustomButton label='ADD' iconName={Icons.menu_tab}/>
      <IconButton iconName={Icons.menu_tab}/> */}
    </View>
  );
};

const styles = StyleSheet.create({});
