import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import { SignIn } from '@screens';
import { SIGN_IN_SCREEN } from '../constants';
import { AppContext } from '../context/AppProvider';

const Stack = createStackNavigator();
export default RootNavigation = () => {
  const { user } = React.useContext(AppContext);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {!user ? (
          <Stack.Screen component={SignIn} name={SIGN_IN_SCREEN} />
        ) : (
          <Stack.Screen component={Main} name="Main" />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
