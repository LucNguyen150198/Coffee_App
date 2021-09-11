import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  Colors,
  FontStyle,
  Icons,
  Images,
  Layout,
  RADIUS,
  SPACING,
  w,
} from '@constants';
import { CustomButton } from './CustomButton';
import * as Animatable from 'react-native-animatable';
const DURATION = 300;

export const OrderSuccess = ({
  visible,
  onRequestClose,
  onTrackOrder,
  onGoHome,
}) => {
  return (
    <Modal
      style={{ flex: 1 }}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <SafeAreaView style={styles.container}>
        <Animatable.View
          useNativeDriver
          animation="zoomIn"
          duration={DURATION + 200}
          style={styles.imageContainer}
        >
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                flex: 1,
                borderRadius: RADIUS * 3,
                backgroundColor: Colors.wisp_pink,
                opacity: 0.8,
              },
            ]}
          />
          <Image style={styles.image} source={Images.cafe_order} />
          <Image source={Icons.bling_bling} style={styles.icon} />
        </Animatable.View>
        <Animatable.Text
          useNativeDriver
          animation="fadeInUp"
          delay={DURATION}
          style={styles.title}
        >
          Congratulations!
        </Animatable.Text>
        <Animatable.Text
          style={styles.content}
          useNativeDriver
          animation="fadeInUp"
          delay={DURATION + 100}
        >
          Your order has been placed
        </Animatable.Text>
        <Animatable.Text
          style={styles.content}
          useNativeDriver
          animation="fadeInUp"
          delay={DURATION + 200}
        >
          You can alway tracks in your order
        </Animatable.Text>

        <Animatable.View
          useNativeDriver
          animation="fadeInUp"
          delay={DURATION + 300}
          style={styles.bottom}
        >
          <CustomButton
            label="Track order"
            style={{ margin: SPACING }}
            onPress={onTrackOrder}
          />
          <CustomButton
            label="Back to home"
            labelColor={Colors.primary}
            backgroundColor={Colors.azure}
            style={{ margin: SPACING }}
            onPress={onGoHome}
          />
        </Animatable.View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  imageContainer: {
    width: w * 0.3,
    height: w * 0.3,
    borderRadius: RADIUS * 3,
    ...Layout.center,
  },
  image: {
    width: w * 0.25,
    height: w * 0.25,
    resizeMode: 'contain',
  },
  icon: {
    width: w * 0.1,
    height: w * 0.1,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    ...FontStyle.h2,
    color: Colors.primary,
    letterSpacing: 1,
    marginVertical: SPACING * 2,
  },
  content: {
    ...FontStyle.p1,
  },
  bottom: {
    position: 'absolute',
    bottom: SPACING * 2,
    ...Layout.center,
  },
});
