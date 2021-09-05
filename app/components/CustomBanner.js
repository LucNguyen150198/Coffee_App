import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  WIDTH_BANNER,
  HEIGHT_BANNER,
  SPACING,
  RADIUS,
  w,
  Colors,
  h,
  Layout,
} from '../constants';
export const CustomBanner = ({ data = [] }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Image style={styles.image} source={item.image} resizeMode="stretch" />
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 0 }}
        dotStyle={[styles.dot]}
        inactiveDotStyle={styles.dot}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.8}
        inactiveDotColor={Colors.label_inactive}
        dotColor={Colors.primary}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        keyExtractor={(item, index) => index + ''}
        onSnapToItem={(index) => setActiveSlide(index)}
        data={data}
        renderItem={renderItem}
        sliderWidth={w}
        itemWidth={WIDTH_BANNER}
        inactiveSlideOpacity={0}
        inactiveSlideScale={1}
        containerCustomStyle={{ overflow: 'hidden' }}
        contentContainerCustomStyle={{ overflow: 'hidden' }}
        enableSnap={true}
        loop={true}
        autoplay={true}
        autoplayInterval={3000} // Delay in ms until navigating to the next item
        autoplayDelay={500}
        lockScrollWhileSnapping={true}
        horizontal
        loopClonesPerSide={3}
        inactiveSlideShift={0}
        activeAnimationType="timing"
        activeSlideAlignment={'center'}
        hasParallaxImages={true}
      />
      {pagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_BANNER + SPACING * 2,
    alignItems: 'center',
    marginTop: SPACING,
  },
  item: { borderRadius: RADIUS, overflow: 'hidden' },
  image: {
    width: WIDTH_BANNER,
    height: HEIGHT_BANNER,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
