import React from 'react';
import styles from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>&copy; Все права защищены</span>
      <span className={styles.publicity}>
        Сайт разработал и выполнил <br /> <a href="/">Seichuk Semen</a>
      </span>
    </footer>
  );
};

export default Footer;
