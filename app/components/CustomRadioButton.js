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
  values = [],
  selectedButtonColor = Colors.orange,
  inActiveButtonColor = Colors.inactive,
  buttonSize = 12,
  buttonOuterSize = 18,
  labelHorizontal,
  formHorizontal,
  duration = DURATION,
  useAnimation = true,
  animation = 'fadeInUp',
  buttonStyle,
  labelColor = Colors.suva_grey,
  onSelectedIndex,
  defaultValue,
  wrapStyle,
  labelStyle,
}) => {
  const [value, setValue] = React.useState(null);

  const onHandlePress = (val) => {
    setValue(val);
    if (typeof onSelectedIndex === 'function') {
      onSelectedIndex(val);
    }
  };

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <RadioForm formHorizontal={formHorizontal} animation={useAnimation}>
      {/* To create radio buttons, loop through your array of options */}
      {Array.isArray(values) &&
        values?.map((obj, i) => (
          <Animatable.View
            useNativeDriver
            key={i}
            animation={animation}
            delay={duration * 2 + i * 100}
          >
            <RadioButton
              labelHorizontal={labelHorizontal}
              style={buttonStyle}
              wrapStyle={wrapStyle}
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
                  { color: labelColor },
                  !labelHorizontal
                    ? { marginTop: SPACING }
                    : {
                        marginLeft: SPACING / 4,
                      },
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
