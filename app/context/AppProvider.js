import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Colors, Layout } from '../constants';
import { _auth } from '../firebase/config';

export const AppContext = React.createContext(null);

export default function AppProvider({ children }) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    setTimeout(() => {
      setInitializing(false);
    }, 350);
  }

  useEffect(() => {
    const subscriber = _auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
      }}
    >
      {initializing ? (
        <View style={[Layout.fill, Layout.center]}>
          <ActivityIndicator animating color={Colors.orange} size="large" />
        </View>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
}
