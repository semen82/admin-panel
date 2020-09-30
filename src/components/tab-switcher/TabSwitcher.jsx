import React from 'react';

import styles from './TabSwitcher.module.css';

const TabSwitcher = ({ editModeTabSwitcher, setEditModeTabSwitcher }) => {
  return (
    <ul className={styles.tabSwitcher}>
      <li
        className={
          editModeTabSwitcher
            ? styles.tabSwitcherItemActive
            : styles.tabSwitcherItem
        }
        onClick={() => setEditModeTabSwitcher(true)}
      >
        Редактор товара
      </li>
      <li
        className={
          editModeTabSwitcher
            ? styles.tabSwitcherItem
            : styles.tabSwitcherItemActive
        }
        onClick={() => setEditModeTabSwitcher(false)}
      >
        Просмотр товаров
      </li>
    </ul>
  );
};

export default TabSwitcher;
