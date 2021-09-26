import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { _auth } from '../config';

export const googleSignIn = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = _auth.GoogleAuthProvider.credential(idToken);
    await _auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.log('error', error);
  }
};

export const signOut = async () => {
  await _auth().signOut();
};
