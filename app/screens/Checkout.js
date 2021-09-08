import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CustomHeaderScreen,
  AccordionCalendarList,
  CustomButton,
  Dash,
  IconButton,
  CustomInput,
} from '../components';
import {
  Colors,
  SPACING,
  FontStyle,
  MENU_SCREEN,
  Layout,
  Icons,
  w,
} from '../constants';
import { currency, calculateTotal } from '@utils';
import {
  updateCart,
  updateSchedules,
  addSchedules,
  resetSchedules,
} from '@slice/cart';

export const Checkout = ({ navigation }) => {
  const carts = useSelector((state) => state.cart.carts);

  const schedules = useSelector((state) => state.cart.schedules);
  const dispatch = useDispatch();
  const [modeSchedule, setModeSchedule] = React.useState(false);
  const toggleModeSchedule = (val) => {
    setModeSchedule(val);
    !val && dispatch(resetSchedules());
  };

  const onUpdateSchedules = (data) => {
    dispatch(updateSchedules(data));
  };

  const onBack = () => navigation.goBack();

  const onGoToMenu = () => {
    navigation.navigate(MENU_SCREEN);
  };

  const updateQtyProductInCart = async (item) => {
    await dispatch(updateCart(item));
  };

  // const onGoToCart = () => {
  //   navigation.navigate(CART_SCREEN);
  // };

  const HeaderScheduling = () => {
    return (
      <View style={[styles.totalContainer, { paddingBottom: SPACING / 2 }]}>
        <Text style={styles.total}>Scheduling</Text>
        <View style={Layout.rowVCenter}>
          <Switch
            value={modeSchedule}
            onValueChange={toggleModeSchedule}
            thumbColor={Colors.orange}
            trackColor={{
              false: Colors.wisp_pink,
              true: Colors.wisp_pink,
            }}
            style={{
              transform: [{ scale: 0.8 }],
            }}
          />
          <Text
            style={[styles.total, { marginLeft: SPACING, color: Colors.text }]}
          >
            {modeSchedule ? 'On' : 'Off'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeaderScreen title="Check out" leftAction={onBack} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Delivery Information</Text>
          <View style={Layout.rowVCenter}>
            <IconButton iconName={Icons.add} size={20} border={15} />
            <Text
              style={[
                styles.total,
                { marginLeft: SPACING, color: Colors.orange },
              ]}
            >
              New
            </Text>
          </View>
        </View>

        <Card
          width={w * 0.9}
          height={w * 0.38}
          backgroundColor={Colors.ghost_white}
          style={{
            padding: SPACING,
          }}
        >
          <View style={styles.infoAddress}>
            <View style={{ flex: 0.45 }}>
              <Text style={styles.label}>Name</Text>
              <Text
                style={styles.labelValue}
                numberOfLines={2}
                adjustsFontSizeToFit
              >
                Jon Doe
              </Text>
            </View>

            <View style={{ flex: 0.45 }}>
              <Text style={styles.label}>Phone</Text>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={styles.labelValue}
              >
                +84 9211235734
              </Text>
            </View>

            <View style={{ flex: 0.1, right: -10 }}>
              <IconButton
                iconName={Icons.edit}
                size={20}
                imageSize={11}
                backgroundColor={Colors.primary}
              />
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <Text style={styles.label}>Address</Text>
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              style={styles.labelValue}
            >
              123 Lo Sieu P16 Q11 Tp.HCM
            </Text>
          </View>
        </Card>

        <HeaderScheduling />
        {modeSchedule && (
          <AccordionCalendarList
            data={schedules}
            onUpdate={onUpdateSchedules}
          />
        )}

        {modeSchedule && (
          <CustomButton
            label="Add more day"
            labelColor={Colors.primary}
            backgroundColor={Colors.azure}
            style={{ margin: SPACING }}
            onPress={() => dispatch(addSchedules())}
          />
        )}

        <View style={styles.containerCoupon}>
          <Text style={styles.total}>Coupon</Text>
          <View style={styles.contentCoupon}>
            <CustomInput width={w * 0.5} placeholder="Your coupon here" />
            <CustomButton
              label="Add"
              width={w * 0.3}
              backgroundColor={Colors.suva_grey}
              //onPress={addProductInCart}
            />
          </View>
        </View>

        <Dash />
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total</Text>
          <Text style={[styles.total, { color: Colors.suva_grey }]}>
            {currency(calculateTotal(carts))} vnd
          </Text>
        </View>
      </ScrollView>

      <View style={Layout.center}>
        <CustomButton label="Go to payment method" />
      </View>
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
  },

  totalContainer: {
    ...Layout.fullWidth,
    ...Layout.rowVCenter,
    justifyContent: 'space-between',
    padding: SPACING * 2,
    paddingTop: SPACING,
  },
  cartEmpty: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    margin: SPACING * 2,
  },
  label: {
    ...FontStyle.h4,
    paddingBottom: SPACING / 1.5,
    color: '#7F7F7F',
  },
  labelValue: {
    ...FontStyle.h4,
    color: '#rgb(156,160,170)',
  },
  infoAddress: {
    ...Layout.rowHCenter,
    ...Layout.justifyContentBetween,
    flex: 0.5,
  },
  containerCoupon: {
    width: w * 0.9,
    padding: SPACING / 2,
    paddingVertical: SPACING,
  },

  contentCoupon: {
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    marginTop: SPACING / 2,
  },
});
