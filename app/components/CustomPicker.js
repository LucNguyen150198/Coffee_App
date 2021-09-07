import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Colors, FontStyle, Layout, RADIUS, SPACING, w } from '@constants';
import { Icons } from '../constants';

export const CustomPicker = ({
  label,
  width = w * 0.9,
  height = 45,
  iconName = Icons.down_arrow,
  onPress,
  value,
  animateRef,
}) => {
  const rotateZ = animateRef?.current?.valueAnimated?.interpolate({
    inputRange: [0, 1],
    outputRange: [`-${Math.PI}rad`,'0rad' ],
  });
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={[
          styles.content,
          {
            width,
            height,
          },
        ]}
      >
        <TextInput style={[styles.textInput]} editable={false} value={value} />
        {iconName && (
          <Animated.Image
            source={iconName}
            style={[
              styles.icon,
              rotateZ && {
                transform: [
                  {
                    rotateZ,
                  },
                ],
              },
            ]}
          />
        )}
      </TouchableOpacity>
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
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.orange,
    marginRight: SPACING,
  },
});
