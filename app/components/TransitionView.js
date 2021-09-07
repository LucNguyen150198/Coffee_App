import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Layout, SPACING } from '../constants';

export const TransitionView = React.forwardRef(
  ({ parentView, childrenView }, ref) => {
 

    const [size, setSize] = useState(null);

    const animatedController = React.useRef(new Animated.Value(0)).current;

    const toggle = (val) => {
      if (val) {
        Animated.timing(animatedController, {
          toValue: 1,
          duration: 300,
          //useNativeDriver:true
        }).start();
      } else {
        Animated.timing(animatedController, {
          toValue: 0,
          duration: 300,
          //useNativeDriver:true
        }).start();
      }
    };

    React.useImperativeHandle(ref, () => ({
      onToggle: toggle,
      valueAnimated : animatedController
    }));

    const height = animatedController.interpolate({
      inputRange: [0, 1],
      outputRange: [0, size],
    });
    return (
      <View>
        {parentView && parentView()}
        <Animated.View style={[styles.bodyBackground, { height }]}>
          <View
            onLayout={(event) => {
              setSize(event.nativeEvent.layout.height);
            }}
            style={styles.bodyContainer}
          >
            {childrenView && childrenView()}
          </View>
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  bodyBackground: {
    overflow: 'hidden',
    ...Layout.center,
    paddingBottom:SPACING
  },
  bodyContainer: {
    position: 'absolute',
    bottom: 0,
  },
});
