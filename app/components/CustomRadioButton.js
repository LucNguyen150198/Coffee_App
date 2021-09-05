import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { Colors, FontStyle, SPACING } from '../constants';
const DURATION = 400;
export const CustomRadioButton = ({
  values,
  selectedButtonColor = Colors.orange,
  inActiveButtonColor = Colors.inactive,
  buttonSize = 12,
  buttonOuterSize = 18,
  animation,
}) => {
  const [value, setValue] = React.useState(2);

  const onHandlePress = (val) => {
    setValue(val);
  };
  return (
    <RadioForm formHorizontal={false} animation={animation}>
      {/* To create radio buttons, loop through your array of options */}
      {values.map((obj, i) => (
        <Animatable.View
          useNativeDriver
          key={i}
          animation={'fadeInUp'}
          delay={DURATION * 2 + i * 100}
        >
          <RadioButton labelHorizontal={true}>
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={value === i}
              onPress={onHandlePress}
              borderWidth={1}
              buttonInnerColor={selectedButtonColor}
              buttonOuterColor={
                value === i ? selectedButtonColor : inActiveButtonColor
              }
              buttonSize={buttonSize}
              buttonOuterSize={buttonOuterSize}
              buttonStyle={{
                backgroundColor: inActiveButtonColor,
              }}
              buttonWrapStyle={{ margin: SPACING / 2 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={onHandlePress}
              labelStyle={styles.label}
              labelWrapStyle={{}}
            />
          </RadioButton>
        </Animatable.View>
      ))}
    </RadioForm>
  );
};

const styles = StyleSheet.create({
  label: {
    ...FontStyle.h5,
    color: Colors.suva_grey,
  },
});
