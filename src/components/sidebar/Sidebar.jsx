import React from 'react';
import styles from './Sidebar.module.css';
import adminIcon from '../../access/images/admin-icon.png';
import { NavLink } from 'react-router-dom';
import { setActiveNamePage } from '../../redux-store/sidebar-reducer';
import { connect } from 'react-redux';

const Sidebar = (props) => {
  const { sidebarNavMenu, setActiveNamePage } = props;
  // const hide = 'hide';

  return (
    <div className={styles.sidebar}>
      <img src={adminIcon} alt="" className={styles.adminIcon} />

      <ul className={styles.nav}>
        {sidebarNavMenu.map((item) => {
          return (
            <li className={styles.navItem} data-name={item.name} key={item.id}>
              <NavLink
                to={item.path}
                onClick={(e) => setActiveNamePage(e.target.innerHTML)}
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sidebarNavMenu: state.sidebar.sidebarNavMenu,
  };
};

const mapDispathToProps = (dispath) => {
  return {
    setActiveNamePage: (namePage) => {
      dispath(setActiveNamePage(namePage));
    },
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Sidebar);
