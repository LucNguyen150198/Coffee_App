import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  CustomButton,
  IconButton,
  CustomHeaderScreen,
  CustomInput,
} from '../components';
import { Icons } from '../constants';
export const Menu = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center',backgroundColor:'#FFFFFF' }}>
      <CustomInput  iconName={Icons.search}/>
      {/* <CustomHeaderScreen/> */}
      {/* <CustomButton label='ADD' iconName={Icons.menu_tab}/>
      <IconButton iconName={Icons.menu_tab}/> */}
    </View>
  );
};

const styles = StyleSheet.create({});
