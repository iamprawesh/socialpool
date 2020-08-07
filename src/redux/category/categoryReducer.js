import {FETCH_CATEGORY, GET_CATEGORY, TOGGLE_LOADING} from './categoryTypes';

const initialState = {
  loading: false,
  categories: [],
  error: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return {
        loading: false,
        categories: action.payload,
      };
    case GET_CATEGORY:
      return {
        loading: false,
        categories: action.payload,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default categoryReducer;
