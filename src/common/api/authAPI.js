import firebase from 'firebase/app';

export const firebaseInitialize = (setUserData) => {
  firebase.initializeApp({
    apiKey: 'AIzaSyCGgg57E1UfBaweglM6Nv5_tdcX6aWYHGw',
    authDomain: 'react-firebase-3a9ce.firebaseapp.com',
    databaseURL: 'https://react-firebase-3a9ce.firebaseio.com',
    projectId: 'react-firebase-3a9ce',
    storageBucket: 'react-firebase-3a9ce.appspot.com',
    messagingSenderId: '1034335273026',
    appId: '1:1034335273026:web:65561a0399ec24c8cfaddb',
  });
};

export const authListener = (setUserData, toggleIsLogin) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      user.providerData.forEach((profile) => {
        const userData = {
          email: profile.email,
          photoURL: profile.photoURL,
          name: profile.displayName,
          uid: profile.uid,
        };
        setUserData(userData);
        toggleIsLogin(true);
      });
    } else {
      toggleIsLogin(false);
    }
  });
};
