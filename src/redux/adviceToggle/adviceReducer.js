import {ADVICE_TOGGLE, FETCH_ADVICE, FETCH_ADVICE_ERROR} from './adviceTypes';

const initialState = {
  show: false,
  text: '',
  err: false,
};

const adviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADVICE_TOGGLE:
      return {
        err: '',
        text: '',
        show: !state.show,
      };
    case FETCH_ADVICE:
      return {
        ...state,
        show: true,
        text: action.payload,
      };
    case FETCH_ADVICE_ERROR:
      console.log('error 23');
      // console.log(action.payload);
      return {
        show: true,
        err: true,
        text: action.payload,
      };
    default:
      return state;
  }
};

export default adviceReducer;
