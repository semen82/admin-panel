const SET_CURRENT_GOODS_CODE = 'SET_CURRENT_GOODS_CODE';

const initialState = {
  //
  currentGoodsCode: '',
};

const editorSmartphoneReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_GOODS_CODE:
      return {
        ...state,
        currentGoodsCode: action.code,
      };

    default: {
      return { ...state };
    }
  }
};

export const setCurrentGoodsCode = (code) => {
  return { type: SET_CURRENT_GOODS_CODE, code };
};

export default editorSmartphoneReducer;
