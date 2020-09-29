import React from 'react';
import styles from './App.module.css';
import { authListener, firebaseInitialize } from './common/api/authAPI';
import { connect } from 'react-redux';
import { setUserData, toggleIsLogin } from './redux-store/auth-reducer';
import UserProfile from './components/userProfile/UserProfile';
import UserProfileNotAuth from './components/userProfileNotAuth/UserProfileNotAuth';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import EditorPhone from './components/editor-phone/EditorPhone';
import Site from './components/site/Site';
import Footer from './components/footer/Footer';
import OtherPages from './components/other-pages/OtherPages';

firebaseInitialize();

const App = (props) => {
  const { setUserData, toggleIsLogin, isLogin, login } = props;
  authListener(setUserData, toggleIsLogin);

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
          <Route path="/admin/editor-phone" component={EditorPhone} />
          <Route component={OtherPages} />
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
