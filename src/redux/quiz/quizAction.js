import axios from 'axios';
import KEY from '../../config/keys';
// import * as RootNavigation from '../../RootNavigation';
import {
  FETCH_Q_CATEGORY,
  TOGGLE_Q_LOADING,
  SET_Q_ERROR,
  FETCH_Q_QUESTIONS,
  SELECTED_CATEGORY,
  CLEAR_QUESTIONS,
} from './quizTypes';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchQuizCategory = (data) => {
  return {
    type: FETCH_Q_CATEGORY,
    payload: data,
  };
};
export const fetchQuizQuestion = (data) => {
  return {
    type: FETCH_Q_QUESTIONS,
    payload: data,
  };
};
export const toggleQuizLoading = () => {
  return {
    type: TOGGLE_Q_LOADING,
  };
};
export const setErrorNow = (err) => {
  return {
    type: SET_Q_ERROR,
    payload: err,
  };
};
export const setCategoryNow = (data) => {
  return {
    type: SELECTED_CATEGORY,
    payload: data,
  };
};
export const clearQuestionNow = () => {
  return {
    type: CLEAR_QUESTIONS,
  };
};

export const fetchQuizCategoryNow = () => {
  return (dispatch) => {
    dispatch(toggleQuizLoading());
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => {
        dispatch(fetchQuizCategory(response.data.trivia_categories));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setErrorNow(err));
      });
  };
};

export const fetchQuizQuestionsNow = (url) => {
  return (dispatch) => {
    console.log('hhh');
    dispatch(toggleQuizLoading());
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchQuizQuestion(response.data.results));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setErrorNow(err));
      });
  };
};
