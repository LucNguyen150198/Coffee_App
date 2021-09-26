/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import RootNavigation from './navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppProvider from './context/AppProvider';
const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <RootNavigation />
      </AppProvider>
    </Provider>
  );
};

export default App;
