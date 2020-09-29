import { createStore, combineReducers } from 'redux';
import authReducer from './auth-reducer';
import sidebarReducer from './sidebar-reducer';
import { reducer as formReducer } from 'redux-form';
import editorSmartphoneReducer from './editorPhone-reducer';

const reducers = combineReducers({
  authPage: authReducer,
  form: formReducer,
  sidebar: sidebarReducer,
  editorPhone: editorSmartphoneReducer,
});

const store = createStore(reducers);

export default store;
