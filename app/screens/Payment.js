import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Switch,
  Image,
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
import { Colors, SPACING, FontStyle, Layout, Icons, w } from '../constants';
import { currency, calculateTotal } from '@utils';
import {
  updateCart,
  updateSchedules,
  addSchedules,
  resetSchedules,
} from '@slice/cart';
import { paymentList } from '../data';

export const Payment = ({ navigation }) => {
  // ********* VARIABLES ********* //
  const carts = useSelector((state) => state.cart.carts);
  const schedules = useSelector((state) => state.cart.schedules);
  const dispatch = useDispatch();
  const [modeSchedule, setModeSchedule] = React.useState(false);
  const [coupon, setCoupon] = React.useState('');

  // ********* FUNCTION ********* //
  const toggleModeSchedule = (val) => {
    setModeSchedule(val);
    !val && dispatch(resetSchedules());
  };

  const onUpdateSchedules = (data) => {
    dispatch(updateSchedules(data));
  };

  const onBack = () => navigation.goBack();

  const onChangeValueCoupon = (value) => {
    setCoupon(value);
  };

  // ********* LAYOUT ********* //

  const PaymentMethodList = ({ data = [] }) => {
    return (
      <View
        style={[
          styles.totalContainer,
          { alignSelf: 'center', paddingTop: SPACING * 2 },
        ]}
      >
        {data.map((item, index) => {
          return (
            <Card
              key={index + ''}
              width={w * 0.25}
              height={w * 0.25}
              backgroundColor={Colors.ghost_white}
              style={Layout.center}
              border={20}
            >
              <Image source={item.image} style={styles.icon} />
              <Text style={styles.nameCard}>{item.name}</Text>
            </Card>
          );
        })}
      </View>
    );
  };

  const FormCardInformation = () => {
    return (
      <View style={[Layout.fill, Layout.alignItemsCenter]}>
        <HeaderFormCard />
        <View style={[Layout.fill]}>
          <CustomInput
            label="Card name"
            style={{ marginBottom: SPACING * 2 }}
          />
          <CustomInput
            label="Card number"
            style={{ marginBottom: SPACING * 2 }}
          />

          <View style={[Layout.rowVCenter, Layout.justifyContentBetween]}>
            <CustomInput label="Exp date" width={w * 0.4} />
            <CustomInput label="CVV" width={w * 0.4} />
          </View>
        </View>
      </View>   
    );
  };

  const HeaderFormCard = () => {
    return (
      <View style={[styles.headerFormCardContainer]}>
        <Text style={styles.total}>Card Information</Text>
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
            Save
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeaderScreen title="Payment" leftAction={onBack} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        <View style={styles.containerCoupon}>
          <Text style={styles.total}>Choose your payment method</Text>
          <PaymentMethodList data={paymentList} />
        </View>

        {/* ********* Card Information *********  */}
        <FormCardInformation />
      </ScrollView>

      <View style={Layout.center}>
        <CustomButton label="Confirm Payment" />
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
    padding: SPACING * 1.5,
    paddingTop: SPACING,
  },
  headerFormCardContainer: {
    ...Layout.fullWidth,
    ...Layout.rowVCenter,
    justifyContent: 'space-between',
    padding: SPACING * 1.5,
    paddingTop: 0,
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
    //width: w * 0.9,
    ...Layout.fullWidth,
    paddingVertical: SPACING,
    paddingHorizontal: SPACING * 1.5,
  },

  contentCoupon: {
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    marginTop: SPACING * 1.2,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  nameCard: {
    ...FontStyle.h5,
    color: '#7F7F7F',
    paddingTop: SPACING,
  },
});
