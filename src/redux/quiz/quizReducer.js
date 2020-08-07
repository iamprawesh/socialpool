import {
  FETCH_Q_CATEGORY,
  SET_Q_ERROR,
  TOGGLE_Q_LOADING,
  FETCH_Q_QUESTIONS,
  SELECTED_CATEGORY,
  CLEAR_QUESTIONS,
} from './quizTypes';
import {concat} from 'react-native-reanimated';

const initialState = {
  loading: false,
  qcategories: [],
  questons: [],
  error: false,
  s_category: '',
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_Q_CATEGORY:
      let cat = [];
      action.payload.map((item) => {
        cat.push({
          label: `${item.name}`,
          value: `${item.id}`,
        });
      });

      return {
        ...state,
        error: '',
        loading: false,
        qcategories: cat,
      };
    case TOGGLE_Q_LOADING:
      return {
        ...state,
        error: '',
        loading: !state.loading,
      };
    case SET_Q_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        questons: action.payload,
      };
    case FETCH_Q_QUESTIONS:
      return {
        ...state,
        loading: false,
        questons: action.payload,
      };
    case SELECTED_CATEGORY:
      var name;
      if (action.payload > 0) {
        name = state.qcategories.filter(
          (item) => item.value == action.payload,
        )[0].label;
      } else {
        name = 'Ramdom';
      }
      return {
        ...state,
        s_category: name,
      };
    case CLEAR_QUESTIONS:
      return {
        ...state,
        // loading: false,
        questons: [],
      };
    default:
      return state;
  }
};

export default quizReducer;
