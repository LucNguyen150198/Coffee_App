import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';

import {
  CustomBanner,
  HeaderHomeScreen,
  ProductItem,
  InputSearchAnimation,
} from '@components';
import {
  Icons,
  Colors,
  SPACING,
  w,
  FontStyle,
  PRODUCT_DETAIL_SCREEN,
  CART_SCREEN,
  MENU_SCREEN,
  Layout,
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
} from '@constants';
import { banners, bookAgainList, recommendedList } from '../data';
import { useSelector } from 'react-redux';
import { getMomentInDay } from '../utils';

export const Home = ({ navigation }) => {
  const carts = useSelector((state) => state.cart.carts);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  // ********* FUNCTION ********* //
  const onGoToDetail = (item) => {
    navigation.push(PRODUCT_DETAIL_SCREEN, { item });
  };

  const onGoToMenu = () => {
    navigation.navigate(MENU_SCREEN);
  };

  const onGoToCart = () => {
    navigation.navigate(CART_SCREEN);
  };

  // ********* LAYOUT ********* //
  const renderProductItem = ({ item }) => {
    return (
      <ProductItem
        key={item.id + ''}
        item={item}
        onPress={() => onGoToDetail(item)}
      />
    );
  };

  const stickyHeader = () => {
    const insets = useSafeAreaInsets();
    const inputRange = [0, HEADER_MAX_HEIGHT + insets.top];
    const height = scrollY.interpolate({
      inputRange,
      outputRange: [
        HEADER_MAX_HEIGHT + insets.top,
        HEADER_MIN_HEIGHT + insets.top,
      ],
      extrapolate: 'clamp',
    });
    const bgColor = scrollY.interpolate({
      inputRange,
      outputRange: [Colors.white, Colors.orange],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={{
          ...Layout.center,
          height,
          backgroundColor: bgColor,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <HeaderHomeScreen
          title={`Good ${getMomentInDay()}`}
          subTitle="29/3 Lo Sieu st"
          rightIcon={Icons.cart}
          rightAction={onGoToCart}
          numberCart={carts?.length}
          animation={scrollY}
        />

        <InputSearchAnimation
          iconName={Icons.search}
          placeholder="Looking for some drink today?"
          style={{ marginTop: SPACING }}
          animation={scrollY}
          inputRange={inputRange}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {stickyHeader()}
      <Animated.FlatList
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: HEADER_MAX_HEIGHT + SPACING,
        }}
        data={recommendedList}
        keyExtractor={(item, index) => item.id + ''}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={renderProductItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        ListHeaderComponent={() => {
          return (
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.title, { paddingHorizontal: SPACING * 2 }]}>
                Book again
              </Text>

              <View style={styles.bookAgain}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                >
                  {bookAgainList.map((item, index) =>
                    renderProductItem({ item, index })
                  )}
                </ScrollView>
              </View>

              <CustomBanner data={banners} />

              <View style={styles.recommendedTitle}>
                <Text style={styles.title}>Recommended</Text>
                <TouchableOpacity onPress={onGoToMenu}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  itemContainer: {
    margin: SPACING,
    marginVertical: SPACING + 15,
    alignItems: 'center',
  },

  title: {
    ...FontStyle.h2,

    alignSelf: 'flex-start',
  },

  recommendedTitle: {
    ...Layout.fullWidth,
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    padding: SPACING * 2,
    paddingBottom: 0,
  },

  image: {
    width: w * 0.35,
    height: w * 0.35,
    resizeMode: 'contain',
    top: -50,
  },
  content: {
    width: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    ...FontStyle.h3,
    color: Colors.Text,
  },
  price: {
    ...FontStyle.h4,
    color: Colors.text,
    opacity: 0.8,
  },
  seeAll: {
    ...FontStyle.h4,
    color: Colors.suva_grey,
    opacity: 0.8,
    padding: SPACING / 2,
  },

  bookAgain: {
    height: w * 0.62,
    paddingTop: SPACING,
    paddingHorizontal: SPACING,
  },
  stickyHeader: {
    ...Layout.fullWidth,
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    position: 'absolute',
    top: 0,
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING * 2,
    height: 80,
    backgroundColor: 'red',
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: SPACING,
  },
});
