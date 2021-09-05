import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { IconButton, Card } from '@components';
import { Icons, Colors, RADIUS, SPACING, w, h, FontStyle } from '@constants';

export const ProductItem = ({ item, onPress }) => {
  return (
    <Card style={styles.itemContainer} onPress={onPress}>
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
          onPress={onPress}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
