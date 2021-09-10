import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
  Text,
} from 'react-native';
import { CustomPicker } from './CustomPicker';
import { DayOfWeeks, DateTimePicker } from './CustomCalendar';
import { Layout, w, SPACING, FontStyle, Colors } from '../constants';

import moment from 'moment';
export const AccordionCalendarList = React.forwardRef(
  ({ onUpdate, data = [] }, ref) => {
    const [currentIndex, setIndex] = useState(-1);
    const [timeIndex, setTimeIndex] = useState(-1);
    const [daySelected, setDay] = useState(data);
    const toggleExpend = (index) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIndex(index === currentIndex ? null : index);
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const selectedDay = (day) => {
      let newDays = [...daySelected];
      if (currentIndex > -1) {
        day.day_formatted = `${day.name}(${day.day_formatted})`;
        newDays[currentIndex] = { ...newDays[currentIndex], day };
        setDay(newDays);
        onUpdate(newDays);
      }
    };

    const selectedTime = (date) => {
      let newDays = JSON.parse(JSON.stringify(daySelected));
      if (timeIndex > -1) {
        let time = moment(date).format('hh:mm A');

        if (newDays[timeIndex]) {
          newDays[timeIndex].time = time;
          setDay(newDays);
          onUpdate(newDays);
        }
      }
    };
    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Pick date</Text>
          <Text style={styles.label}>Pick time</Text>
        </View>
        {data.map((item, index) => {
          const days = daySelected[index]?.day;
          const time = daySelected[index]?.time;

          return (
            <View key={index + ''} style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.headerCalendar}>
                  <CustomPicker
                    width={w * 0.4}
                    onPress={() => toggleExpend(index)}
                    value={days?.day_formatted}
                    placeholder="New date"
                  />

                  <DateTimePicker
                    width={w * 0.4}
                    value={time}
                    placeholder="New time"
                    onSelectedTime={selectedTime}
                    onPress={() => setTimeIndex(index)}
                    disabled={!days?.day_formatted}
                    mode="time"
                  />
                </View>
                {index === currentIndex && (
                  <DayOfWeeks
                    onSelectedDay={selectedDay}
                    defaultValue={days?.value}
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    ...Layout.center,
    ...Layout.fill,
    marginTop: SPACING,
  },
  cardContainer: {
    flexGrow: 1,
    width: w * 0.9,
  },
  card: {
    flexGrow: 1,
  },
  headerCalendar: {
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    width: '100%',
    paddingVertical: SPACING,
  },
  labelContainer: {
    ...Layout.fill,
    ...Layout.rowVCenter,
    justifyContent: 'space-between',
    width: w * 0.87,
  },
  label: {
    ...FontStyle.h4,
    color: '#5F5F5F',
  },
});
