import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';

import { Card, CustomHeaderScreen, CustomButton } from '@components';
import * as Popup from '@components/Popup';
import { useDispatch } from 'react-redux';
import { Colors, SPACING, FontStyle, Layout, w } from '@constants';
import { paymentList } from '../../data';
import FormCreditCard from './FormCreditCard';

export const Payment = ({ navigation }) => {
  // ********* VARIABLES ********* //
  const formRef = React.useRef();
  const [indexCard, setIndexCard] = React.useState(-1);
  const [orderSuccess, setOrderSuccess] = React.useState(false);
  const dispatch = useDispatch();

  // ********* FUNCTION ********* //

  const onConfirmPayment = () => {
    formRef.current?.handleSubmit();
  };

  const onSubmit = (values) => {
    setOrderSuccess(true);
    //alert(JSON.stringify(values));
  };
  onClosePopUp = () => {
    setOrderSuccess(false);
  };

  const onBack = () => navigation.goBack();

  const onBackHome = () => {
    onClosePopUp();
    navigation.navigate('TabNavigation');
  };
  const onTrackOrder = () => {
    // navigation.navigate()
    onClosePopUp();
  };
  // ********* LAYOUT ********* //

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
          <PaymentMethodList
            data={paymentList}
            value={indexCard}
            onChangeValue={setIndexCard}
          />
        </View>

        {/* ********* Card Information *********  */}
        {indexCard === 0 && (
          <FormCreditCard ref={formRef} onSubmit={onSubmit} />
        )}
      </ScrollView>

      <View style={Layout.center}>
        <CustomButton
          disabled={indexCard < 0}
          label="Confirm Payment"
          onPress={onConfirmPayment}
        />
      </View>

      <Popup.OrderSuccess
        visible={orderSuccess}
        onRequestClose={onClosePopUp}
        onTrackOrder={onTrackOrder}
        onGoHome={onBackHome}
      />
    </SafeAreaView>
  );
};

const PaymentMethodList = ({ value, onChangeValue, data }) => {
  return (
    <View
      style={[
        styles.totalContainer,
        { alignSelf: 'center', paddingTop: SPACING * 2 },
      ]}
    >
      {data.map((item, index) => {
        const activeIndex = value === index;

        return (
          <Card
            key={index + ''}
            width={w * 0.24}
            height={w * 0.24}
            backgroundColor={Colors.ghost_white}
            style={[Layout.center, { overflow: 'hidden' }]}
            border={20}
            onPress={() => onChangeValue(index)}
          >
            <AnimatedBackground style={styles.bg} active={activeIndex} />
            <Image
              source={item.image}
              style={[
                styles.icon,
                { tintColor: activeIndex ? Colors.orange : null },
              ]}
            />
            <Text
              style={[
                styles.nameCard,
                { color: activeIndex ? Colors.orange : '#7F7F7F' },
              ]}
            >
              {item.name}
            </Text>
          </Card>
        );
      })}
    </View>
  );
};

const AnimatedBackground = ({ active, style }) => {
  const scaleAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (active) {
      Animated.timing(scaleAnimation, {
        toValue: 1,

        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnimation, {
        toValue: 0,

        useNativeDriver: true,
      }).start();
    }
  }, [active]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              scale: scaleAnimation,
            },
          ],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.fill,
    backgroundColor: Colors.white,
  },
  total: {
    ...FontStyle.h3,
    color: Colors.Text,
  },

  totalContainer: {
    ...Layout.fullWidth,
    ...Layout.rowVCenter,
    justifyContent: 'space-between',
    padding: SPACING * 1.5,
    paddingTop: SPACING,
  },

  containerCoupon: {
    //width: w * 0.9,
    ...Layout.fullWidth,
    paddingVertical: SPACING,
    paddingHorizontal: SPACING * 1.5,
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
  bg: {
    width: w * 0.24 * 2,
    height: w * 0.24 * 2,
    borderRadius: (w * 0.24 * 2) / 2,
    backgroundColor: Colors.wisp_pink,
    alignSelf: 'center',
    position: 'absolute',
  },
});
