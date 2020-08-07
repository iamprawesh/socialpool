import axios from 'axios';
import KEY from '../../config/keys';
// import * as RootNavigation from '../../RootNavigation';
import {FETCH_CATEGORY, GET_CATEGORY, TOGGLE_LOADING} from './categoryTypes';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchCategory = (data) => {
  return {
    type: FETCH_CATEGORY,
    payload: data,
  };
};
export const getCategory = (data) => {
  return {
    type: FETCH_CATEGORY,
    payload: data,
  };
};
export const togglecategoryLoading = () => {
  return {
    type: TOGGLE_LOADING,
  };
};

export const fetchCategoryNow = () => {
  return (dispatch) => {
    AsyncStorage.getItem('categories')
      .then((categories) => {
        if (categories != null) {
          return dispatch(getCategory(JSON.parse(categories)));
        } else {
          axios
            .get(`${KEY.APIURL}/api/category`)
            .then((res) => {
              let data = res.data;
              dispatch(getCategory(data.result));
              let str_categories = JSON.stringify(res.data);
              AsyncStorage.setItem('categories', str_categories)
                .then(() => {
                  console.log('Saved in local async');
                })
                .catch((err) => {
                  console.log(err);
                  alert('Error in saving in localphone');
                });
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response.status);
              }
              console.log(err);
            });
        }
      })
      .catch((err) => {});
    axios
      .get(`${KEY.APIURL}/api/category`)
      .then((res) => {
        let data = res.data;
        console.log('line 24');
        dispatch(getCategory(data.result));
        let str_categories = JSON.stringify(res.data);

        AsyncStorage.setItem('categories', str_categories)
          .then(() => {
            console.log('Saved in local async');
          })
          .catch((err) => {
            console.log(err);
            alert('Error in saving in localphone');
          });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
        }
        console.log(err);
      });
  };
};

export const getCategoryFromLocal = () => {
  return (dispatch) => {
    console.log('fetching advicenow');
    axios
      .get('https://api.adviceslip.com/advice')
      .then((res) => {
        let data = res.data;
        console.log('line 32 ');
        console.log(data);
        dispatch(fetchAdvice(data.slip.advice));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
        }
        console.log(err);
      });
  };
};
