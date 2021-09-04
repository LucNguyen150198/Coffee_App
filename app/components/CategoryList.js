import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, FontStyle, Layout, RADIUS, SPACING, w } from '../constants';
import { categories } from '../data';
export const CategoryList = ({ selected, onSelect }) => {
  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => {
          const activeBg = selected === item ? Colors.primary : Colors.azure;
          const activeTextColor =
            selected === item ? Colors.white : Colors.primary;

          return (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              activeOpacity={0.8}
              key={index + ''}
              style={[
                styles.tab,
                {
                  backgroundColor: activeBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.label,
                  {
                    color: activeTextColor,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  tabContainer: {
    marginVertical: SPACING,
    marginTop:SPACING *2,
    height: 40,
  },
  tab: {
    // paddingVertical: SPACING,
    paddingHorizontal: SPACING + 8,
    marginHorizontal: SPACING,
    borderRadius: RADIUS + 8,
    ...Layout.center,
  },
  label: {
    ...FontStyle.h3,
  },
});
