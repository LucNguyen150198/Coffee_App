import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
  findNodeHandle,
} from 'react-native';
import { Colors, FontStyle, h, Layout, w } from '@constants';

const Tabs = ({ data, scrollX, onItemPress }) => {
  const containerRef = React.useRef(null);
  const [measures, setMeasure] = React.useState([]);
  let m = [];

  React.useEffect(() => {
    data.forEach((item) => {
      item?.ref.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height });
          if (m.length === data.length) {
            setMeasure(m);
          }
        }
      );
    });
  }, []);

  return (
    <View ref={containerRef} style={styles.tabs}>
      {data.map((item, index) => {
        const onHandlePress = () => {
          if (typeof onItemPress === 'function') {
            onItemPress(index);
          }
        };
        return (
          <Tab
            item={item}
            key={item.key + ''}
            index={index}
            ref={item.ref}
            scrollX={scrollX}
            onItemPress={onHandlePress}
          />
        );
      })}
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} data={data} />
      )}
    </View>
  );
};

const Tab = React.forwardRef(({ item, scrollX, index, onItemPress }, ref) => {
  const inputRange = [(index - 1) * w, index * w, (index + 1) * w];
  const bgColor = scrollX.interpolate({
    inputRange,
    outputRange: [Colors.inactive, Colors.orange, Colors.inactive],
  });

  return (
    <TouchableOpacity ref={ref} onPress={onItemPress}>
      <Animated.Text
        style={{
          color: bgColor,
          ...FontStyle.h2,
        }}
      >
        {item.title}
      </Animated.Text>
    </TouchableOpacity>
  );
});
const Indicator = ({ measures = [], scrollX, data }) => {
  const inputRange = data.map((_, i) => i * w);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((m) => m.x),
  });
  const width = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((m) => m.width),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 15,
        left: 0,
        width,
        height: 3,
        backgroundColor: Colors.orange,
        transform: [{ translateX }],
      }}
    />
  );
};

const Scene = ({ children }) => {
  return <View style={styles.sceneContainer}>{children}</View>;
};

export const ScrollTabView = ({ children }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollView = React.useRef(null);
  const data = children.map((item, index) => ({
    key: index + '',
    title: item.props.title,
    ref: React.createRef(null),
  }));

  const onItemPress = React.useCallback((itemIndex) => {
    scrollView.current?.scrollTo({ x: itemIndex * w, y: 0, animated: true });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={Layout.fill}>
        <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
        <Animated.ScrollView
          ref={scrollView}
          pagingEnabled
          bounces={false}
          alwaysBounceVertical={false}
          showsHorizontalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        >
          {children.map((child, index) => (
            <Scene children={child} key={index + ''} />
          ))}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  sceneContainer: {
    width: w,
    flex: 1,
  },
  tabs: {
    ...Layout.row,
    ...Layout.justifyContentEvenly,
    height: 50,
  },
});
