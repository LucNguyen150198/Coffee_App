import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, FontStyle, Layout, RADIUS, SPACING } from '../constants';
import { CustomRadioButton } from '../components';
import { getWeekDays } from '../utils';
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
