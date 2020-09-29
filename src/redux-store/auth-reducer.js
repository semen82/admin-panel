const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_LOGIN = 'TOGGLE_IS_LOGIN';
const SHOW_POPUP_AUTH = 'SHOW_POPUP_AUTH';

const initialState = {
  userData: {
    email: '',
    name: '',
    photoURL: '',
    uid: '',
  },
  // Залогинен или нет
  isLogin: false,
  // показать плавающее окно входа/регистрации или нет
  showPopupAuth: false,
  // сообщение об ошибке
  messageError: '',
  // сообщение о предупреждении
  messageWarning: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        userData: { ...action.userData },
      };
    }

    case TOGGLE_IS_LOGIN: {
      return {
        ...state,
        isLogin: action.isLogin,
      };
    }

    case SHOW_POPUP_AUTH: {
      return {
        ...state,
        showPopupAuth: action.showPopupAuth,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export const setUserData = (userData) => {
  return { type: SET_USER_DATA, userData };
};

export const toggleIsLogin = (isLogin) => {
  return { type: TOGGLE_IS_LOGIN, isLogin };
};

export const toggleShowPopupAuth = (showPopupAuth) => {
  return { type: SHOW_POPUP_AUTH, showPopupAuth };
};

export default authReducer;
