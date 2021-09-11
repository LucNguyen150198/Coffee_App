import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import {
  Colors,
  Icons,
  Layout,
  SPACING,
  h,
  w,
  FontStyle,
  CART_SCREEN,
} from '@constants';
import {
  IconButton,
  Card,
  CustomRadioButton,
  CustomInput,
  CustomButton,
  WrapperScrollView,
  CustomQty,
} from '@components';
import { addCart } from '@slice/cart';
import { useDispatch } from 'react-redux';

const TOP_HEADER_HEIGHT = h * 0.4;

const DURATION = 400;

export const ProductDetail = ({ navigation, route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();

  const [qty, setQty] = React.useState(item.qty);
  // const [qty, setQty] = React.useState(0);

  const onBack = () => navigation.goBack();

  const onGoToCart = () => {
    onBack();
    navigation.navigate(CART_SCREEN);
  };

  const addProductInCart = async () => {
    const product = { ...item };
    product.qty = qty;
    await dispatch(addCart(product));
    await onGoToCart();
  };

  const renderOptions = (data = []) => {
    return (
      <View style={[{ marginVertical: SPACING - 2 }]}>
        <CustomRadioButton
          values={data}
          wrapStyle={{
            paddingVertical: SPACING / 2,
          }}
        />
      </View>
    );
  };

  return (
    <React.Fragment>
      <ScrollView
        style={{ backgroundColor: Colors.white }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {Platform.OS === 'ios' && (
          <WrapperScrollView backgroundColor={Colors.wisp_pink} />
        )}
        <View style={styles.topContainer}>
          {/* ********* BACKGROUND PRODUCT *********  */}
          <SharedElement
            id={`item.${item.id}.bg`}
            style={StyleSheet.absoluteFillObject}
          >
            <View
              style={[
                { backgroundColor: Colors.wisp_pink, borderRadius: 0 },
                StyleSheet.absoluteFillObject,
              ]}
            />
          </SharedElement>

          {/* ********* IMAGE PRODUCT *********  */}
          <SharedElement id={`item.${item.id}.image`} style={styles.image}>
            <Image source={item?.image} style={styles.image} />
          </SharedElement>
        </View>

        {/* ********* BACK BUTTON *********  */}
        <View style={styles.iconBack}>
          <IconButton iconName={Icons.left_arrow} onPress={onBack} />
        </View>

        {/* ********* LIKE BUTTON *********  */}
        <View style={styles.iconLike}>
          <IconButton
            iconName={Icons.like}
            backgroundColor={Colors.transparent}
            tintColor={Colors.primary}
            style={{ borderWidth: 1, borderColor: Colors.primary }}
          />
        </View>
        <SharedElement id={'general.bg'}>
          <View style={styles.bottomContainer}>
            <Animatable.View
              useNativeDriver
              animation="fadeInUp"
              duration={DURATION}
              delay={DURATION}
              style={Layout.rowHCenter}
            >
              {/* ********* AVATAR PRODUCT *********  */}
              <Card
                width={55}
                height={55}
                backgroundColor={Colors.zambezi}
                style={Layout.center}
              >
                <Image source={item.image} style={styles.avatar} />
              </Card>

              {/* ********* INFO PRODUCT *********  */}
              <View style={styles.content}>
                <View style={Layout.fill}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={styles.name}
                  >
                    {item.name}
                  </Text>

                  <View style={Layout.rowVCenter}>
                    <Text style={styles.rating}>{item.rating}</Text>
                    <Image style={styles.iconRating} source={Icons.star} />
                  </View>
                </View>
                <Text style={styles.price}>{item.price} vnd</Text>
              </View>
            </Animatable.View>

            {/* ********* DESCRIPTION PRODUCT *********  */}
            <Animatable.View
              useNativeDriver
              animation="fadeInUp"
              duration={DURATION}
              delay={DURATION + 100}
              style={styles.desContainer}
            >
              <Text style={styles.description}>{item.description}</Text>
            </Animatable.View>

            {/* ********* OPTIONS PRODUCT *********  */}
            <Animatable.View
              useNativeDriver
              animation="fadeInUp"
              duration={DURATION}
              delay={DURATION + 200}
              style={[Layout.row, Layout.justifyContentBetween]}
            >
              <View style={{ flex: 0.5 }}>
                <View style={Layout.rowVCenter}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={styles.level}
                  >
                    Level of ice
                  </Text>
                  <Image
                    source={Icons.ice}
                    style={[styles.iconRating, { tintColor: Colors.text }]}
                  />
                </View>
                {renderOptions(item.options?.level_of_ice?.values)}
              </View>

              <View style={{ flex: 0.5 }}>
                <View style={Layout.rowVCenter}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={styles.level}
                  >
                    Level of sweet
                  </Text>
                  <Image
                    source={Icons.sweet}
                    style={[styles.iconRating, { tintColor: Colors.text }]}
                  />
                </View>

                {renderOptions(item.options?.level_of_sweet?.values)}
              </View>
            </Animatable.View>

            <Animatable.View
              useNativeDriver
              animation="fadeInUp"
              delay={DURATION * item?.options.level_of_sweet?.length}
              style={{ marginTop: SPACING / 2 }}
            >
              <Text style={styles.level}>Add note</Text>
              <CustomInput
                height={80}
                placeholder="Eg: no peaches added"
                multiline={true}
              />
            </Animatable.View>
          </View>
        </SharedElement>
      </ScrollView>

      {/* ********* QTY AND BUTTON ADD *********  */}
      <Animatable.View useNativeDriver animation="fadeInUp">
        <Card width={w} height={h * 0.1} shadow style={styles.qtyAddContainer}>
          <CustomQty qty={item.qty} onUpdate={setQty} disabled={qty - 1 < 1} />
          <CustomButton
            label="Add"
            width={w * 0.45}
            onPress={addProductInCart}
          />
        </Card>
      </Animatable.View>
    </React.Fragment>
  );
};

ProductDetail.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.bg`,
    },

    {
      id: `item.${item.id}.image`,
    },
    {
      id: `general.bg`,
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: SPACING * 2,
  },
  iconBack: {
    position: 'absolute',
    left: SPACING,
    top: SPACING * 4,
  },
  iconLike: {
    position: 'absolute',
    right: SPACING,
    top: SPACING * 4,
  },
  image: {
    width: w * 0.7,
    height: w * 0.7,
    resizeMode: 'contain',
    position: 'absolute',
    top: TOP_HEADER_HEIGHT - w * 0.8,
  },
  topContainer: {
    height: TOP_HEADER_HEIGHT + 20,
    width: w,
    alignItems: 'center',
  },
  bottomContainer: {
    width: w,
    padding: SPACING,
    paddingTop: SPACING * 2,
    alignItems: 'center',
  },
  name: {
    ...FontStyle.h2,
    color: Colors.Text,
    paddingBottom: SPACING,
  },
  price: {
    ...FontStyle.h3,
    color: Colors.suva_grey,
    paddingTop: SPACING / 3,
  },
  description: {
    ...FontStyle.h4,
    color: Colors.suva_grey,
    lineHeight: 22,
  },
  level: {
    ...FontStyle.h3,
    color: Colors.text,
    paddingLeft: SPACING / 2,
  },

  rating: {
    ...FontStyle.p2,
    color: Colors.text,
  },
  iconRating: {
    width: 15,
    height: 15,
    tintColor: Colors.orange,
    resizeMode: 'contain',
    marginLeft: SPACING / 2 + 3,
  },
  content: {
    ...Layout.fill,
    ...Layout.row,
    ...Layout.justifyContentBetween,
    paddingHorizontal: SPACING,
  },
  avatar: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
  desContainer: {
    paddingVertical: SPACING,
    paddingHorizontal: SPACING / 2,
    alignSelf: 'flex-start',
  },
  qtyContainer: {
    width: SPACING * 3,
    ...Layout.center,
    marginHorizontal: SPACING / 2,
  },
  qtyAddContainer: {
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    paddingHorizontal: SPACING * 2,
  },
});
