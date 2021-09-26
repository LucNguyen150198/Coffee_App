import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  webClientId:
    '238161786917-hm77mkoqs4rs01h89aaq2aitdnei4t09.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId:
    '238161786917-ht5qkgv297ursl8e1hflrmlhfdi4l9qd.apps.googleusercontent.com',
});

if (__DEV__) {
  auth().useEmulator('http://localhost:9099');
  firestore().useEmulator('localhost', 8080);
}

export const _auth = auth;

export const _db = firestore();
