const SET_ACTIVE_ITEM_NAV_MENU = 'SET_ACTIVE_ITEM_NAV_MENU';
const SET_ACTIVE_NAME_PAGE = 'SET_ACTIVE_NAME_PAGE';

const initialState = {
  // Навигационное меню сайдбара
  sidebarNavMenu: [
    { id: 1, label: 'Сайт', path: '/', name: 'site', active: true },
    {
      id: 2,
      label: 'Редактор',
      path: '/admin/editor-phone',
      name: 'editor',
      active: true,
    },
    {
      id: 3,
      label: 'Личный кабинет',
      path: '/profile',
      name: 'profile',
      active: false,
    },
  ],
  namePage: '',
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM_NAV_MENU:
      return {
        ...state,
        sidebarNavMenu: state.sidebarNavMenu.map((item) => {
          return {
            ...item,
            name: action.name,
          };
        }),
      };

    case SET_ACTIVE_NAME_PAGE:
      return {
        ...state,
        namePage: action.namePage,
      };

    default: {
      return { ...state };
    }
  }
};

// Action Creater
export const setActiveItemNavMenu = (name) => {
  return { type: SET_ACTIVE_ITEM_NAV_MENU, name };
};

export const setActiveNamePage = (namePage) => {
  return { type: SET_ACTIVE_NAME_PAGE, namePage };
};

export default sidebarReducer;
