import React from 'react';
import { connect } from 'react-redux';
import PopupAuth from '../popupAuth/PopupAuth';
import styles from './Header.module.css';
import { toggleShowPopupAuth } from '../../redux-store/auth-reducer';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const {
    isLogin,
    login,
    showPopupAuth,
    toggleShowPopupAuth,
    namePage,
  } = props;

  return (
    <header className={styles.header}>
      <h2>{namePage}</h2>
      <span
        className={styles.auth}
        onClick={() => isLogin || toggleShowPopupAuth(true)}
      >
        {isLogin ? <NavLink to="/profile">{login}</NavLink> : 'Войти'}
      </span>
      {showPopupAuth && <PopupAuth toggleShowPopupAuth={toggleShowPopupAuth} />}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    showPopupAuth: state.authPage.showPopupAuth,
    namePage: state.sidebar.namePage,
  };
};

const mapDispathToProps = (dispath) => {
  return {
    toggleShowPopupAuth: (showPopupAuth) => {
      dispath(toggleShowPopupAuth(showPopupAuth));
    },
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Header);
