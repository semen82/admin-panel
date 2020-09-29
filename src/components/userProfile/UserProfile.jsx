import React from 'react';
import styles from './UserProfile.module.css';
import defaultAvatar from '../../access/images/default-user-avatar.png';
import { connect } from 'react-redux';
import firebase from 'firebase/app';

const UserProfile = ({ userData }) => {
  const { email, photoURL, name } = userData;

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className={styles.userProfile}>
      <div className={styles.topLine}>
        <button className={styles.logOut} onClick={logOut}>
          Выйти
        </button>
      </div>
      <div className={styles.wrap}>
        <img src={photoURL ? photoURL : defaultAvatar} alt="" />

        <ul className={styles.profileList}>
          <li>
            <span>Email: </span>
            {email ? email : '_ _ _ _ _'}
          </li>
          <li>
            <span>Имя: </span>
            {name ? name : '_ _ _ _ _'}
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authPage.userData,
  };
};

export default connect(mapStateToProps)(UserProfile);
