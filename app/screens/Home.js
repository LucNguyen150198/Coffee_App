import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { IconButton, CustomBanner, Card, HeaderHomeScreen } from '@components';
import {
  Icons,
  Colors,
  RADIUS,
  SPACING,
  w,
  h,
  FontStyle,
  PRODUCT_DETAIL_SCREEN,
  Layout,
} from '../constants';
import { banners, bookAgainList, recommendedList } from '../data';

export const Home = ({ navigation }) => {
  const onGoToDetail = (item) => {
    navigation.push(PRODUCT_DETAIL_SCREEN, { item });
  };

  const renderProductItem = ({ item, index }) => {
    return (
      <Card
        key={index + ''}
        style={styles.itemContainer}
        onPress={() => onGoToDetail(item)}
      >
        <SharedElement
          id={`item.${item.id}.bg`}
          style={StyleSheet.absoluteFillObject}
        >
          <View
            style={[
              { backgroundColor: Colors.wisp_pink, borderRadius: RADIUS },
              StyleSheet.absoluteFillObject,
            ]}
          />
        </SharedElement>

        <SharedElement id={`item.${item.id}.image`}>
          <Image source={item?.image} style={styles.image} />
        </SharedElement>

        <View
          style={{
            position: 'absolute',
            left: SPACING,
            bottom: '30%',
          }}
        >
          <Text adjustsFontSizeToFit numberOfLines={2} style={styles.name}>
            {item.name}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.price}>{item.price} vnd</Text>
          <IconButton
            size={25}
            iconName={Icons.add}
            border={RADIUS / 1.5}
            onPress={() => onGoToDetail(item)}
          />
        </View>
      </Card>
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

              <View>
                <CustomBanner data={banners} />
              </View>

              <View style={styles.recommendedTitle}>
                <Text style={styles.title}>Recommended</Text>
                <TouchableOpacity>
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
