import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './OtherPages.module.css';

const OtherPages = () => {
  return (
    <div className={styles.otherPages}>
      <h2>Такой страницы не существует</h2>
      <p>
        Вы можете перейти на <NavLink to="/">Главную</NavLink>
      </p>
      <p>Или выберите другую страницу в МЕНЮ</p>
    </div>
  );
};

export default OtherPages;
