import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';

import { IconButton, CustomInput, CategoryList, Card } from '@components';
import {
  Icons,
  Colors,
  RADIUS,
  SPACING,
  w,
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
  const renderProductItem = ({ item, index }) => {
    return (
      <Card style={styles.itemContainer} onPress={() => onGoToDetail(item)}>
        <View
          style={[
            { backgroundColor: Colors.wisp_pink, borderRadius: RADIUS },
            StyleSheet.absoluteFillObject,
          ]}
        />

        <Image source={item?.image} style={styles.image} />

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
});
