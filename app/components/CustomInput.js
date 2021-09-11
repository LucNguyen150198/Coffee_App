import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Colors, FontStyle, Layout, RADIUS, SPACING, w } from '@constants';
import { TextInputMask } from 'react-native-masked-text';
export const CustomInput = React.forwardRef(
  (
    {
      label,
      width = w * 0.9,
      height = 45,
      iconName,
      multiline,
      style,
      options,
      type,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <View style={[styles.container, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.content,
            {
              width,
              height,
              backgroundColor: error ? '#ffcccc' : Colors.ghost_white,
            },
          ]}
        >
          {iconName && <Image source={iconName} style={styles.icon} />}
          {type ? (
            <TextInputMask
              ref={ref}
              options={options}
              type={type}
              style={[styles.textInput, multiline && { paddingTop: SPACING }]}
              placeholderTextColor={Colors.suva_grey}
              multiline={multiline}
              {...props}
            />
          ) : (
            <TextInput
              ref={ref}
              style={[styles.textInput, multiline && { paddingTop: SPACING }]}
              placeholderTextColor={Colors.suva_grey}
              multiline={multiline}
              {...props}
            />
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {},

  content: {
    ...Layout.rowVCenter,
    borderRadius: RADIUS + 8,
    paddingHorizontal: SPACING,
  },
  label: {
    ...FontStyle.h4,
    color: Colors.suva_grey,
    marginBottom: SPACING,
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
