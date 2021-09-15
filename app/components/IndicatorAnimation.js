import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { Colors } from '@constants';

export const IndicatorAnimation = ({
  activeColor = Colors.orange,
  inactiveColor,
  status,
  size = 30,
}) => {
  const animated = React.useRef(new Animated.Value(0)).current;

  const onStartAnimation = () => {
    Animated.sequence([
      Animated.timing(animated, {
        toValue: 1,
        useNativeDriver: true,
        duration: 1000,
      }),
      Animated.timing(animated, {
        toValue: 0,
        useNativeDriver: true,
        duration: 1000,
      }),
    ]).start(onStartAnimation);
  };

  React.useEffect(() => {
    if (status === 'current') {
      onStartAnimation();
    }
  }, [status]);

  const statusColor = () => {
    switch (status) {
      case 'current':
      case 'finished':
        return activeColor;
      default:
        return inactiveColor;
    }
  };

  const circle = {
    width: size / 2.1,
    height: size / 2.1,
    borderRadius: size,
    backgroundColor: statusColor(),
  };
  const bgCircle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: statusColor(),
    opacity: 0.3,
  };

  const inputRange = [0, 1];

  const scale = animated.interpolate({
    inputRange,
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bg,
          bgCircle,
          {
            transform: [
              {
                scale,
              },
            ],
          },
        ]}
      />
      <View style={circle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    backgroundColor: Colors.wisp_pink,
  },
});
