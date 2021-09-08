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
  labelHorizontal,
  formHorizontal,
  duration = DURATION,
  useAnimation,
  animation = 'fadeInUp',
  buttonStyle,
  labelColor = Colors.suva_grey,
  onSelectedIndex,
  defaultValue ,
}) => {
  const [value, setValue] = React.useState(null);

  const onHandlePress = (val) => {
    setValue(val);
    onSelectedIndex(val);
  };

  React.useEffect(() => {
    console.log('defaultValue',defaultValue)
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <RadioForm formHorizontal={formHorizontal} animation={useAnimation}>
      {/* To create radio buttons, loop through your array of options */}
      {values.map((obj, i) => (
        <Animatable.View
          useNativeDriver
          key={i}
          animation={animation}
          delay={duration * 2 + i * 100}
        >
          <RadioButton
            labelHorizontal={labelHorizontal}
            style={buttonStyle}
            wrapStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={labelHorizontal}
              onPress={onHandlePress}
              labelStyle={[
                styles.label,
                { color: labelColor, marginTop: SPACING },
              ]}
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
    overflow: 'hidden',
    textAlign: 'center',
  },
});
