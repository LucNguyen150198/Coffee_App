import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Colors, FontStyle, Layout, RADIUS, SPACING, w } from '../constants';
import { CustomRadioButton, CustomPicker } from '.';
import { getWeekDays } from '../utils';
import moment from 'moment';
export const DayOfWeeks = ({ onSelectedDay, defaultValue }) => {
  const data = getWeekDays().map((item) => ({
    label: `${item.name}\n${item.day}`,
    value: item.key,
    ...item,
  }));

  const onHandleSelected = (index) => {
    onSelectedDay(data[index]);
  };
  return (
    <View style={styles.container}>
      <CustomRadioButton
        animation="fadeInLeft"
        values={data}
        labelHorizontal={false}
        formHorizontal
        duration={0}
        buttonStyle={styles.buttonStyle}
        labelColor={Colors.text}
        onSelectedIndex={onHandleSelected}
        defaultValue={defaultValue}
      />

      <Text style={styles.text}>
        *Reservations are only placed within a week
      </Text>
    </View>
  );
};

export const DateTimePicker = ({
  mode,
  width,
  disabled,
  value,
  onSelectedTime,
  defaultDate = new Date(),
  placeholder = 'New time',
  onPress = () => {},
}) => {
  const [date, setDate] = React.useState(defaultDate);
  const [open, setOpen] = React.useState(false);
  const [valueInput, setValueInput] = React.useState(value);
  const onConfirm = (date) => {
    setOpen(false);
    setDate(date);
    onSelectedTime(date);
  };
  const onHandlePress = () => {
    onPress();
    setOpen(true);
  };

  React.useEffect(() => {
    setValueInput(value);
    console.log('value',value)
  }, [value]);

  return (
    <>
      <CustomPicker
        width={width}
        onPress={onHandlePress}
        value={valueInput}
        placeholder={placeholder}
        defaultValue={open}
        disabled={disabled}
      />
      <DatePicker
        modal
        open={open}
        mode={mode}
        date={date}
        minimumDate={new Date()}
        textColor={Colors.text}
        onConfirm={onConfirm}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.fill,
    ...Layout.center,
    backgroundColor: Colors.ghost_white,
    borderRadius: RADIUS,
    paddingVertical: SPACING,
  },
  buttonStyle: {
    margin: SPACING / 4,
    borderRightWidth: 1,
    borderRightColor: Colors.inactive,

    alignItems: 'center',
    paddingRight: SPACING,
  },
  text: {
    ...FontStyle.h4,
    color: Colors.suva_grey,
    fontStyle: 'italic',
    alignSelf: 'flex-start',
    padding: SPACING,
  },
});
