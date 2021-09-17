import TabNavigation from './TabNavigation';
import { Easing } from 'react-native';
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {
  ProductDetail,
  Cart,
  Checkout,
  Payment,
  TrackingOrder,
  ChatDetail,
} from '@screens';
import {
  PRODUCT_DETAIL_SCREEN,
  CART_SCREEN,
  CHECKOUT_SCREEN,
  PAYMENT_SCREEN,
  TRACKING_ORDER_SCREEN,
  CHAT_DETAIL_SCREEN,
} from '@constants';

const Stack = createSharedElementStackNavigator();
const OPTIONS_SCREEN = {
  gestureEnabled: false,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),

  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      },
    },
  },
};
const Main = () => {
  return (
    <Stack.Navigator initialRouteName={"TabNavigation"} headerMode="none">
      <Stack.Screen component={TabNavigation} name="TabNavigation" />
      <Stack.Screen
        component={ProductDetail}
        name={PRODUCT_DETAIL_SCREEN}
        options={OPTIONS_SCREEN}
      />
      <Stack.Screen component={Cart} name={CART_SCREEN} />
      <Stack.Screen component={Checkout} name={CHECKOUT_SCREEN} />
      <Stack.Screen component={Payment} name={PAYMENT_SCREEN} />
      <Stack.Screen component={TrackingOrder} name={TRACKING_ORDER_SCREEN} />
      <Stack.Screen component={ChatDetail} name={CHAT_DETAIL_SCREEN} />
    </Stack.Navigator>
  );
};

export default Main;
