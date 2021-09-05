import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { CustomInput, CategoryList, ProductItem } from '@components';
import {
  Icons,
  Colors,
  SPACING,
  w,
  h,
  FontStyle,
  PRODUCT_DETAIL_SCREEN,
} from '@constants';
import { productList } from '../data';
export const Menu = ({ navigation }) => {
  // ********* VARIABLES ********* //
  const [tabSelected, setTab] = React.useState('All');
  const [data, setData] = React.useState(productList);

  // ********* FUNCTION ********* //
  const onSelected = (tab) => {
    setTab(tab);
  };

  const filterProducts = (type) => {
    if (type === 'All') return productList;
    return productList.filter((item) => item.type === type);
  };

  const onGoToDetail = (item) => {
    navigation.push(PRODUCT_DETAIL_SCREEN, { item });
  };

  // ********* HOOK ********* //
  React.useEffect(() => {
    let newProducts = filterProducts(tabSelected);
    setData(newProducts);
  }, [tabSelected]);

  // ********* LAYOUT ********* //
  const renderProductItem = ({ item }) => {
    return <ProductItem item={item} onPress={() => onGoToDetail(item)} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomInput
        iconName={Icons.search}
        placeholder="Looking for some drink today?"
      />

      <CategoryList selected={tabSelected} onSelect={onSelected} />

      <FlatList
        style={{ flex: 1, paddingTop: SPACING - 5 }}
        data={data}
        keyExtractor={(item, index) => item.id + ''}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={renderProductItem}
      />

      <SharedElement id={'general.bg'} style={styles.bg}>
        <View style={styles.bg} />
      </SharedElement>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  itemContainer: {
    margin: SPACING,
    marginVertical: SPACING + 15,
    alignItems: 'center',
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
  bg: {
    width: w,
    height: h,
    position: 'absolute',
    transform: [
      {
        translateY: h,
      },
    ],
  },
});
