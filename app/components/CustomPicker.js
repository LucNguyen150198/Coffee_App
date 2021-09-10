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
  placeholder = '',
  defaultValue,
  disabled,
}) => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [open, setOpen] = React.useState(defaultValue);

  const onHandlePress = () => {
    setOpen(!open);
    onPress();
  };

  React.useEffect(() => {
    setOpen(defaultValue);
  }, [defaultValue]);

  React.useEffect(() => {
    if (open) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  const rotateZ = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        disabled={disabled}
        onPress={onHandlePress}
        activeOpacity={0.9}
        style={[
          styles.content,
          {
            width,
            height,
          },
          disabled && styles.disabledStyle,
        ]}
      >
        <Text
          style={[
            styles.textInput,
            { color: !value ? Colors.suva_grey : Colors.Text },
          ]}
        >
          {value ?? placeholder}
        </Text>
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
    ...FontStyle.h4,
    width: '100%',

    flex: 1,
  },

  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.orange,
    marginRight: SPACING,
  },
  disabledStyle: {
    opacity: 0.8,
  },
});
