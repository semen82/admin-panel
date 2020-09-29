import React from 'react';
import styles from './UserProfileNotAuth.module.css';

const UserProfileNotAuth = () => {
  return (
    <div className={styles.userProfileNotAuth}>
      <h2>Нет доступа</h2>
      <p>Зайдите в свою учетную запись или зарегистрируйтесь</p>
    </div>
  );
};

export default UserProfileNotAuth;
