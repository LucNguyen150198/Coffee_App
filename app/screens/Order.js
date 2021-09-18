import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CustomHeaderScreen,
  CustomQty,
  CustomButton,
  Dash,
} from '@components';
import {
  Colors,
  SPACING,
  FontStyle,
  MENU_SCREEN,
  TRACKING_ORDER_SCREEN,
  Layout,
  Images,
  RADIUS,
  w,
} from '@constants';
import { currency } from '@utils';
import { updateOrder } from '@slice/order';
export const Order = ({ navigation }) => {
  const progress_orders = useSelector((state) => state.order.progress_orders);
  const this_month_orders = useSelector(
    (state) => state.order.this_month_orders
  );
  const dispatch = useDispatch();
  const onTracking = (item) => () =>
    navigation.navigate(TRACKING_ORDER_SCREEN, { item });

  const onGoToMenu = () => {
    navigation.navigate(MENU_SCREEN);
  };

  React.useEffect(() => {
    dispatch(updateOrder());
  }, []);

  const CartItem = ({
    item,
    index,
    buttonLabel,
    buttonBgColor,
    buttonLabelColor,
    onPress,
  }) => {
    return (
      <View style={styles.itemContainer}>
        <Card
          width={55}
          height={60}
          backgroundColor={Colors.wisp_pink}
          style={Layout.center}
        >
          <Image source={item.image} style={styles.avatar} />
        </Card>

        <View style={styles.content}>
          <View style={Layout.fill}>
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.name}>
              Order #{item.order_id}
            </Text>
            <Text style={styles.option}>{item.status}</Text>
            <Text style={styles.price}>{currency(item.price)}vnd</Text>
          </View>
        </View>

        <View key={item.id} style={styles.buttonContainer}>
          <CustomButton
            label={buttonLabel}
            onPress={onPress}
            width={w * 0.3}
            height={35}
            borderRadius={RADIUS}
            backgroundColor={buttonBgColor}
            labelColor={buttonLabelColor}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        <Text style={styles.title}>Processing</Text>
        {progress_orders &&
          progress_orders.map((item, index) => {
            return (
              <CartItem
                key={item.order_id + ''}
                item={item}
                index={index}
                buttonLabel="Track"
                onPress={onTracking(item)}
              />
            );
          })}

        <Text style={styles.title}>This month</Text>
        {this_month_orders &&
          this_month_orders.map((item, index) => {
            return (
              <CartItem
                key={item.order_id + ''}
                item={item}
                index={index}
                buttonLabel="Reorder"
                buttonBgColor={Colors.azure}
                buttonLabelColor={Colors.primary}
                onPress={onGoToMenu}
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.fill,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    ...Layout.rowHCenter,
    ...Layout.fill,
    margin: SPACING,
    paddingVertical: 0,
    padding: SPACING,
  },
  content: {
    ...Layout.fill,
    paddingHorizontal: SPACING,
  },
  avatar: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
  name: {
    ...FontStyle.h4,
    color: Colors.Text,
  },
  price: {
    ...FontStyle.h4,
    color: Colors.Text,
    paddingTop: SPACING / 1.5,
  },
  total: {
    ...FontStyle.h3,
    color: Colors.Text,
  },
  option: {
    ...FontStyle.p3,
    color: Colors.suva_grey,
    paddingTop: 2,
    textTransform: 'capitalize',
  },

  title: {
    ...FontStyle.h3,
    color: Colors.Text,
    alignSelf: 'flex-start',
    padding: SPACING * 2,
    paddingVertical: SPACING,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
