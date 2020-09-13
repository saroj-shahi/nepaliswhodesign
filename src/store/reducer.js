import { SET_IS_LOADING } from './index'

const initState = {
  isLoading: false
};

const sanoReducer = (state = initState, action) => {

  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        ...action.id,
      };
    default:
      return state;
  }
};

export default sanoReducer;
