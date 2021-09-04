import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Colors, FontStyle, Layout, RADIUS, SPACING, w } from '@constants';

export const CustomInput = ({
  label,
  width = w * 0.9,
  height = 45,
  iconName,
  multiline,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.content,
          {
            width,
            height,
          },
        ]}
      >
        {iconName && <Image source={iconName} style={styles.icon} />}
        <TextInput
          style={[styles.textInput, multiline && { paddingTop: SPACING }]}
          placeholderTextColor={Colors.suva_grey}
          multiline={multiline}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  content: {
    ...Layout.rowVCenter,
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
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.ghost,
    marginRight: SPACING,
  },
});
