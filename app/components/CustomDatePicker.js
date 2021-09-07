import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors, FontStyle, Layout, RADIUS, SPACING, w } from '@constants';
import { Icons } from '../constants';
import { CustomPicker } from './CustomPicker';
import { TransitionView } from './TransitionView';
export const CustomDatePicker = ({ label, width }) => {
  const animateRef = React.useRef(null);
  const [isShow, setShow] = React.useState(false);

  const onPress = () => {
    let newValue = !isShow;
    setShow(newValue);
    animateRef.current?.onToggle(newValue);
  };
  return (
    <TransitionView
      parentView={() => (
        <CustomPicker
          label={label}
          width={width}
          animateRef={animateRef}
          onPress={onPress}
        />
      )}
      childrenView={() => {
        return <View style={{ width: 300, height: 100 ,backgroundColor:'red'}}></View>;
      }}
      ref={animateRef}
    />
  );
};

const styles = StyleSheet.create({});
