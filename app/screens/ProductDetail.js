import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Icons, Layout, SPACING } from '../constants';
import { IconButton } from '../components';
export const ProductDetail = ({ navigation, route }) => {
  const { item } = route.params;

  const onBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <View style={styles.iconBack}>
        <IconButton iconName={Icons.left_arrow} onPress={onBack} />
      </View>

      <View style={styles.iconLike}>
        <IconButton
          iconName={Icons.like}
          backgroundColor={Colors.transparent}
          tintColor={Colors.primary}
          style={{ borderWidth: 1, borderColor: Colors.primary }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.fill,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  iconBack: {
    position: 'absolute',
    left: SPACING,
    top: SPACING * 4,
  },
  iconLike: {
    position: 'absolute',
    right: SPACING,
    top: SPACING * 4,
  },
});
