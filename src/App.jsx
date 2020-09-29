import React, { useEffect } from 'react';
import styles from './App.module.css';
import { authListener, firebaseInitialize } from './common/api/authAPI';
import { connect } from 'react-redux';
import { setUserData, toggleIsLogin } from './redux-store/auth-reducer';
import UserProfile from './components/userProfile/UserProfile';
import UserProfileNotAuth from './components/userProfileNotAuth/UserProfileNotAuth';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Editor from './components/editor/Editor';
import Site from './components/site/Site';
import Footer from './components/footer/Footer';
import firebase from 'firebase/app';

firebaseInitialize();
const db = firebase.firestore();
// console.log(db);

const App = (props) => {
  const { setUserData, toggleIsLogin, isLogin, login } = props;
  authListener(setUserData, toggleIsLogin);

  useEffect(() => {
    // db.collection('users')
    //   .add({
    //     first: 'Alan',
    //     middle: 'Mathison',
    //     last: 'Turing',
    //     born: 1912,
    //   })
    //   .then(function (docRef) {
    //     // console.log('Document written with ID: ', docRef.id);
    //   })
    //   .catch(function (error) {
    //     console.error('Error adding document: ', error);
    //   });

    db.collection('cardsStore')
      .get()
      .then((snapshot) => {
        // console.log(snapshot);
        snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
        });
      });
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.right}>
        <Header isLogin={isLogin} login={login} />

        <Switch>
          <Route exact path="/" component={Site} />
          <Route
            path="/profile"
            component={isLogin ? UserProfile : UserProfileNotAuth}
          />
          <Route path="/editor" component={Editor} />
        </Switch>

        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.authPage.isLogin,
    login: state.authPage.userData.email,
  };
};

const mapDispathToProps = (dispath) => {
  return {
    setUserData: (userData) => {
      dispath(setUserData(userData));
    },
    toggleIsLogin: (isLogin) => {
      dispath(toggleIsLogin(isLogin));
    },
  };
};

export default connect(mapStateToProps, mapDispathToProps)(App);
