import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { CustomBanner, HeaderHomeScreen, ProductItem } from '@components';
import {
  Icons,
  Colors,
  SPACING,
  w,
  FontStyle,
  PRODUCT_DETAIL_SCREEN,
  Layout,
} from '@constants';
import { banners, bookAgainList, recommendedList } from '../data';
import { MENU_SCREEN } from '../constants';

export const Home = ({ navigation }) => {
  const onGoToDetail = (item) => {
    navigation.push(PRODUCT_DETAIL_SCREEN, { item });
  };

  const onGoToMenu = () => {
    navigation.navigate(MENU_SCREEN);
  };

  const renderProductItem = ({ item }) => {
    return (
      <ProductItem
        key={item.id + ''}
        item={item}
        onPress={() => onGoToDetail(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderHomeScreen
        title="Good Morning"
        subTitle="29/3 Lo Sieu st"
        rightIcon={Icons.cart}
      />

      {/* <CustomInput
        iconName={Icons.search}
        placeholder="Looking for some drink today?"
      /> */}
      <FlatList
        style={{ paddingTop: SPACING - 5 }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={recommendedList}
        keyExtractor={(item, index) => item.id + ''}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        renderItem={renderProductItem}
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
});
