import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
const Stack = createStackNavigator();
export default RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen component={TabNavigation} name="TabNavigation" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
