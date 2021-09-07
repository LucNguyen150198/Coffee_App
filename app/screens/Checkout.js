import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CustomHeaderScreen,
  CustomDatePicker,
  CustomButton,
  Dash,
  IconButton,
  TransitionView,
  CustomPicker,
} from '../components';
import {
  Colors,
  SPACING,
  FontStyle,
  MENU_SCREEN,
  Layout,
  Images,
  w,
  h,
} from '../constants';
import { currency, calculateTotal } from '@utils';
import { updateCart } from '@slice/cart';
import { Icons } from '../constants';



export const Checkout = ({ navigation }) => {
  const carts = useSelector((state) => state.cart.carts);
  const animateRef = React.useRef(null);
  const dispatch = useDispatch();
  const [modeSchedule, setModeSchedule] = React.useState(false);

  const [modeCalendar, setModeCalendar] = React.useState(false);

  const toggleModeSchedule = (val) => {
    animateRef?.current.onToggle(val);
    setModeSchedule(val);
  };

  const onPress = () => {
    let newValue = !modeCalendar;
    setModeCalendar(newValue);
    animateRef.current?.onToggle(newValue);
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

  const BodyScheduling = () => {
    return (
      <View
        style={{
          width: w * 0.9,
          alignSelf: 'center',
          paddingVertical: SPACING,
        }}
      >
        <TransitionView
          parentView={() => (
            <View
              style={[
                { width: '100%' },
                Layout.rowVCenter,
                Layout.justifyContentBetween,
              ]}
            >
              <CustomPicker
                label="Picker date"
                width={w * 0.4}
                animateRef={animateRef}
                onPress={onPress}
              />

              <CustomPicker
                label="Picker time"
                width={w * 0.4}
                animateRef={animateRef}
                onPress={onPress}
              />
            </View>
          )}
          childrenView={() => {
            return (
              <View
                style={{ width: 300, height: 100, backgroundColor: 'red' }}
              ></View>
            );
          }}
          ref={animateRef}
        />
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

        <TransitionView
          parentView={HeaderScheduling}
          childrenView={BodyScheduling}
          value={modeSchedule}
          ref={animateRef}
        />

        <Dash />
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total</Text>
          <Text style={[styles.total, { color: Colors.suva_grey }]}>
            {currency(calculateTotal(carts))} vnd
          </Text>
        </View>
      </ScrollView>

      <View style={Layout.center}>
        <CustomButton label="Checkout" />
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
});
