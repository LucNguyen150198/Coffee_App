import React from 'react';
import {
  HOME_SCREEN,
  ORDER_SCREEN,
  MENU_SCREEN,
  PROFILE_SCREEN,
  MESSAGE_SCREEN,
  Colors,
  Icons,
  FontStyle,
  Layout,
  RADIUS,
  SPACING,
} from '../constants';
import { Home, Menu, Order, Message, Profile } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Text,
} from 'react-native';

const Tab = createBottomTabNavigator();

const CustomHomeTab = ({ accessibilityState, onPress }) => {
  const animation = React.useRef(new Animated.Value(1)).current;
  const onHandlePress = () => {
    onPress();
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const scale = { transform: [{ scale: animation }] };
  const bgActive = accessibilityState.selected ? Colors.primary : Colors.white;
  const shadowColor = accessibilityState.selected
    ? Colors.primary
    : Colors.suva_grey;
  return (
    <View style={[Layout.fill, Layout.alignItemsCenter]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onHandlePress}
        underlayColor={bgActive}
      >
        <Animated.View
          style={[
            styles.buttonContainer,
            scale,
            {
              backgroundColor: bgActive,
              shadowColor: shadowColor,
            },
          ]}
        >
          <Image
            source={Icons.home_tab}
            style={[
              styles.iconTab,
              {
                tintColor: accessibilityState.selected
                  ? Colors.white
                  : Colors.inactive,
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const CustomBarLabel = ({ title, focused }) => {
  const activeColor = focused ? Colors.text : Colors.label_inactive;
  return (
    <Text style={[styles.labelStyle, { color: activeColor }]}>{title}</Text>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_SCREEN}
      tabBarOptions={{
        style: styles.containerTab,
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.inactive,
      }}
    >
      <Tab.Screen
        name={MENU_SCREEN}
        component={Menu}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={Icons.menu_tab}
              style={[
                styles.iconTab,
                {
                  tintColor: color,
                },
              ]}
            />
          ),
          tabBarLabel: (props) =>
            CustomBarLabel({ ...props, title: MENU_SCREEN }),
        }}
      />
      <Tab.Screen
        name={ORDER_SCREEN}
        component={Order}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={Icons.order_tab}
              style={[
                styles.iconTab,
                {
                  tintColor: color,
                },
              ]}
            />
          ),
          tabBarLabel: (props) =>
            CustomBarLabel({ ...props, title: ORDER_SCREEN }),
        }}
      />
      <Tab.Screen
        name={HOME_SCREEN}
        component={Home}
        options={{
          tabBarButton: CustomHomeTab,
        }}
      />
      <Tab.Screen
        name={MESSAGE_SCREEN}
        component={Message}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={Icons.message_tab}
              style={[
                styles.iconTab,
                {
                  tintColor: color,
                },
              ]}
            />
          ),
          tabBarLabel: (props) =>
            CustomBarLabel({ ...props, title: MESSAGE_SCREEN }),
        }}
      />
      <Tab.Screen
        name={PROFILE_SCREEN}
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={Icons.profile_tab}
              style={[
                styles.iconTab,
                {
                  tintColor: color,
                },
              ]}
            />
          ),
          tabBarLabel: (props) =>
            CustomBarLabel({ ...props, title: PROFILE_SCREEN }),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconTab: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  containerTab: {
    paddingTop: SPACING / 2,
    backgroundColor: Colors.white,
    ...Layout.shadow,
  },
  buttonContainer: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,

    ...Layout.center,
    position: 'absolute',
    alignSelf: 'center',
    top: -30,
    shadowRadius: 5,
    shadowOffset: {
      height: 10,
    },
    shadowOpacity: 0.3,
  },
  labelStyle: {
    ...FontStyle.h5,
    textTransform: 'capitalize',
  },
});

export default TabNavigation;
