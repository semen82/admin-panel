import React, { useState } from 'react';
import styles from './PopupAuth.module.css';
import firebase from 'firebase/app';

import 'firebase/auth'; // for authentication
import 'firebase/storage'; // for storage
import 'firebase/database'; // for realtime database
import 'firebase/firestore'; // for cloud firestore
import 'firebase/messaging'; // for cloud messaging
import 'firebase/functions'; // for cloud functions

const PopupAuth = (props) => {
  const { toggleShowPopupAuth } = props;
  const {
    popupShadow,
    popup,
    outerWrap,
    innerWrap,
    login,
    register,
    popupLabel,
    logReg,
    toggleLogReg,
    close,
  } = styles;

  const [isLogReg, getIsLogReg] = useState(false);
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const offset = isLogReg ? logReg : undefined;

  const sendRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userLogin, userPassword)
      .then((response) => {
        if (response) {
          toggleShowPopupAuth(false);
          getIsLogReg(false);
        }
      })
      .catch((error) => {
        console.log(userLogin, userPassword);
        console.log(error);
      });
  };

  const sendLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userLogin, userPassword)
      .then((response) => {
        toggleShowPopupAuth(false);
        console.log('login', response);
        console.log(response.operationType);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closePopup = (e) => {
    toggleShowPopupAuth(false);
  };

  const stop = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={popupShadow} onClick={(e) => closePopup(e)}>
      <div className={popup} onClick={(e) => stop(e)}>
        <span className={close} onClick={(e) => closePopup(e)}>
          X
        </span>
        <div className={outerWrap}>
          <div className={innerWrap}>
            <div className={`${login} ${offset}`}>
              <div className={popupLabel}>
                <h3>Вход</h3>
                <span
                  className={toggleLogReg}
                  onClick={() => getIsLogReg(true)}
                >
                  Регистрация &raquo;
                </span>
              </div>
              <input
                type="email"
                id="nameLogin"
                value={userLogin}
                placeholder="Email:"
                onChange={(e) => setUserLogin(e.target.value)}
              />
              <input
                type="passwordLogin"
                id="password"
                value={userPassword}
                placeholder="Пароль:"
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <button type="submit" onClick={sendLogin}>
                Отправить
              </button>
            </div>
            <div className={`${register} ${offset}`}>
              <div className={popupLabel}>
                <span
                  className={toggleLogReg}
                  onClick={() => getIsLogReg(false)}
                >
                  &laquo; Вход
                </span>
                <h3>Регистрация</h3>
              </div>
              <input
                type="email"
                id="nameRegister"
                placeholder="E-mail:"
                value={userLogin}
                onChange={(e) => setUserLogin(e.target.value)}
              />
              <input
                type="password"
                id="passwordRegister"
                placeholder="Пароль:"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <div className={styles.message}></div>
              <button type="submit" onClick={sendRegister}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAuth;
