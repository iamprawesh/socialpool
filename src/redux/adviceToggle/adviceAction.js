import axios from 'axios';
// import KEY from '../../config/keys';
import * as RootNavigation from '../../RootNavigation';
import {ADVICE_TOGGLE, FETCH_ADVICE, FETCH_ADVICE_ERROR} from './adviceTypes';

export const adviceToggle = () => {
  return {
    type: ADVICE_TOGGLE,
  };
};

export const fetchAdvice = (val) => {
  return {
    type: FETCH_ADVICE,
    payload: val,
  };
};
export const fetchAdviceError = (val) => {
  return {
    type: FETCH_ADVICE_ERROR,
    payload: val,
  };
};
export const fetchAdviceNow = () => {
  return (dispatch) => {
    console.log('fetching advicenow');
    axios
      .get('https://api.adviceslip.com/advice')
      .then((res) => {
        let data = res.data;
        console.log('line 32 ');
        // console.log(data);
        dispatch(fetchAdvice(data.slip.advice));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
        }
        console.log(err);
        dispatch(fetchAdviceError('Internet is needed for advice  !'));
      });
  };
};
