import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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
  CHECKOUT_SCREEN,
  Layout,
  Images,
  w,
  Icons,
} from '../constants';
import { currency, calculateTotal } from '@utils';
import { updateCart } from '@slice/cart';
import { RADIUS } from '../constants';
import StepIndicator from 'react-native-step-indicator';

const labels = ['Prepare', 'Deliverer', 'Success'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: Colors.text,
};
export const TrackingOrder = ({ navigation }) => {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const onBack = () => navigation.goBack();

  const onGoToMenu = () => {
    navigation.navigate(MENU_SCREEN);
  };

  const updateQtyProductInCart = async (item) => {
    await dispatch(updateCart(item));
  };

  const onGoToCheckout = () => {
    navigation.navigate(CHECKOUT_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeaderScreen title="Tracking" leftAction={onBack} />

      <View style={Layout.fill}>
        <MapView
          style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        ></MapView>
      </View>

      <Card width={w} height={w * 0.7} style={styles.bottomContainer}>
        <View style={{ width: w }}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={1}
            labels={labels}
            stepCount={labels.length}
          />
        </View>

        <Card
          width={w * 0.85}
          height={w * 0.25}
          backgroundColor={Colors.ghost_white}
          style={[Layout.rowVCenter]}
        >
          <Card
            width={60}
            height={60}
            backgroundColor={Colors.orange}
            style={Layout.center}
          >
            {/* <Image source={item.image} style={styles.avatar} /> */}
          </Card>

          <View style={styles.content}>
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.name}>
              Mr. Steven
            </Text>
            <View style={Layout.rowVCenter}>
              <Image source={Icons.safari} style={styles.icon} />
              <Text style={styles.duration}>25 minutes on the way</Text>
            </View>
          </View>
        </Card>

        <View
          style={[
            Layout.rowVCenter,
            Layout.justifyContentEvenly,
            Layout.fullWidth,
          ]}
        >
          <CustomButton
            label="Call"
            iconName={Icons.phone}
            width={w * 0.38}
            // onPress={onTrackOrder}
          />
          <CustomButton
            label="Message"
            iconName={Icons.email}
            width={w * 0.38}
            labelColor={Colors.primary}
            backgroundColor={Colors.azure}
            // onPress={onGoHome}
          />
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.fill,
    backgroundColor: Colors.white,
  },
  bottomContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: RADIUS * 2,
    borderTopRightRadius: RADIUS * 2,
    ...Layout.shadow,
    ...Layout.justifyContentBetween,
  },
  content: {
    ...Layout.fill,
    paddingHorizontal: SPACING * 1.5,
  },
  avatar: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: Colors.suva_grey,
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
});
