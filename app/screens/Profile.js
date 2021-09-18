import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  FontStyle,
  Icons,
  Layout,
  RADIUS,
  SPACING,
  w,
} from '../constants';
import { CustomHeaderScreen, Card, CustomButton } from '../components';
import { profile, settingList } from '../data';
export const Profile = ({ navigation }) => {
  const onBack = () => navigation.goBack();
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeaderScreen title="Profile" leftAction={onBack} />

      <Card width={w * 0.9} height={w * 0.25} style={Layout.rowVCenter}>
        <Image source={{ uri: profile?.image }} style={styles.avatar} />
        <View style={styles.content}>
          <Text numberOfLines={2} adjustsFontSizeToFit style={styles.name}>
            {profile?.first_name} {profile?.last_name}
          </Text>
          <View style={Layout.rowVCenter}>
            <Image source={Icons.star} style={styles.icon} />
            <Text style={styles.duration}>{profile.rating} points</Text>
          </View>
        </View>
      </Card>

      <View style={styles.settingContainer}>
        {settingList.map((item, index) => {
          return (
            <TouchableOpacity key={item.key + ''} style={styles.setting}>
              <Text style={styles.txtSetting}>{item.name}</Text>
              <Image
                source={Icons.right_arrow}
                style={[styles.icon, { tintColor: Colors.text }]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.lineSpacing} />

      <CustomButton
        label="Log out"
        labelColor={Colors.primary}
        backgroundColor={Colors.azure}
        // onPress={() => dispatch(addSchedules())}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  name: {
    ...FontStyle.h2,
    color: Colors.Text,
    paddingBottom: SPACING - 2,
  },
  duration: {
    ...FontStyle.h5,
    paddingLeft: SPACING / 2,
    color: '#ACACAD',
  },
  content: {
    ...Layout.fill,
    paddingHorizontal: SPACING * 1.5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: RADIUS,
    resizeMode: 'contain',
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: Colors.orange,
  },
  settingContainer: {
    padding: SPACING,
    backgroundColor: Colors.ghost_white,
    ...Layout.alignItemsCenter,
    width: w * 0.9,
    borderRadius: RADIUS,
  },
  setting: {
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    width: '100%',
    padding: SPACING,
  },
  txtSetting: {
    ...FontStyle.h4,
    color: Colors.suva_grey,
  },
  lineSpacing: {
    width: w * 0.9,
    backgroundColor: Colors.inactive,
    height: 1,
    marginVertical: SPACING * 2,
  },
});
