import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import { Colors, FontStyle, Layout, RADIUS, SPACING, w } from '../constants';

export const CustomInput = ({ label, width = w * 0.9, iconName, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.content,
          {
            width,
          },
        ]}
      >
        {iconName && <Image source={iconName} style={styles.icon} />}
        <TextInput
          style={styles.textInput}
          placeholderTextColor={Colors.suva_grey}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 40,
  },

  content: {
    height: 45,
    ...Layout.rowCenter,
    marginTop: SPACING,
    backgroundColor: Colors.ghost_white,
    borderRadius: RADIUS + 8,
    paddingHorizontal: SPACING,
  },
  label: {
    ...FontStyle.h4,
    color: Colors.suva_grey,
  },

  textInput: {
    ...FontStyle.p1,
    width: '100%',
    height: '100%',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: SPACING + 10,
    tintColor: Colors.ghost,
  },
});
