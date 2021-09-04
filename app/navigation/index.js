import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
const Stack = createStackNavigator();
export default RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen component={Main} name="Main" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
