import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TabSwitcher.module.css';

const TabSwitcher = (props) => {
  console.log(props);
  const [editMode, setEditMode] = useState(true);
  return (
    <div className={styles.tabSwitcherWrap}>
      <ul className={styles.tabSwitcherList}>
        <li
          className={
            editMode ? styles.tabSwitcherItemActive : styles.tabSwitcherItem
          }
          onClick={() => setEditMode(true)}
        >
          Редактор товаров
        </li>
        <li
          className={
            !editMode ? styles.tabSwitcherItemActive : styles.tabSwitcherItem
          }
          onClick={() => setEditMode(false)}
        >
          Просмотр товаров
        </li>
      </ul>
      <div className={styles.workspace}>
        {editMode ? 'Редактор' : 'Просмотрщик'}
      </div>
    </div>
  );
};

export default TabSwitcher;
