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
  Layout,
  Images,
} from '@constants';
import { currency, calculateTotal } from '@utils';
import { updateCart } from '@slice/cart';

export const Cart = ({ navigation }) => {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
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

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeaderScreen title="Your cart" leftAction={onBack} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        {carts &&
          carts.map((item, index) => {
            return (
              <View key={index + ''} style={styles.itemContainer}>
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
                    <Text
                      numberOfLines={2}
                      adjustsFontSizeToFit
                      style={styles.name}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.option}>50% ice 50% st</Text>
                    <Text style={styles.price}>{currency(item.price)}vnd</Text>
                  </View>
                </View>

                <View key={item.id} style={[Layout.alignItemsEnd]}>
                  <CustomQty
                    qty={item.qty}
                    size={28}
                    textStyle={{
                      ...FontStyle.p1,
                    }}
                    onUpdate={(qty) =>
                      updateQtyProductInCart({
                        ...item,
                        qty: qty,
                      })
                    }
                  />
                </View>
              </View>
            );
          })}

        {!carts.length && (
          <Image
            source={{
              uri: Images.cart_empty,
            }}
            style={styles.cartEmpty}
          />
        )}

        <CustomButton
          label="Add more"
          labelColor={Colors.primary}
          backgroundColor={Colors.azure}
          style={{ marginBottom: SPACING }}
          onPress={onGoToMenu}
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
});
