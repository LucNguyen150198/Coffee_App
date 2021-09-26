import React from 'react';
import { StyleSheet, View } from 'react-native';
import { googleSignIn } from '../firebase/service/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Layout } from '@constants';
export const SignIn = () => {
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={{ width: '85%', height: 50 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={googleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layout.center,
  },
});
