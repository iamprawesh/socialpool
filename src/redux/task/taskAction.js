import axios from 'axios';
import KEY from '../../config/keys';
import * as RootNavigation from '../../RootNavigation';
import {
  ADD_TASK,
  GET_TASK,
  TOGGLE_LOADING,
  SET_ERROR,
  UPDATE_TASK,
} from './taskTypes';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchTask = (data) => {
  return {
    type: GET_TASK,
    payload: data,
  };
};
export const updateTask = (data) => {
  return {
    type: UPDATE_TASK,
    payload: data,
  };
};
export const addTask = (data) => {
  return {
    type: ADD_TASK,
    payload: data,
  };
};

export const toggleLoading = (data) => {
  return {
    type: TOGGLE_LOADING,
    payload: data,
  };
};
export const setError = (data) => {
  return {
    type: SET_ERROR,
    payload: data,
  };
};

export const addTaskNow = (title, description, place, category, tokenId) => {
  return (dispatch) => {
    dispatch(toggleLoading(true));
    axios
      .post(
        `${KEY.APIURL}/api/tasks`,
        {
          title,
          description,
          place,
          category,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenId,
          },
        },
      )
      .then((res) => {
        dispatch(addTask(res.data.result));
        dispatch(toggleLoading(false));
        RootNavigation.navigate('Home', {});
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
        }
        dispatch(toggleLoading(false));
        dispatch(setError(err));
      });
  };
};
export const getTaskNow = (tokenId) => {
  return (dispatch) => {
    dispatch(toggleLoading(true));
    axios
      .get(`${KEY.APIURL}/api/tasks`)
      .then((res) => {
        dispatch(fetchTask(res.data.result));
        dispatch(toggleLoading(false));
        let str_tasks = JSON.stringify(res.data);
        AsyncStorage.setItem('tasks', str_tasks)
          .then(() => {})
          .catch((err) => {
            // console.log(err);
          });
        // RootNavigation.navigate('Home', {});
      })
      .catch((err) => {
        if (err.response) {
          // console.log(err.response.status);
        }
        dispatch(toggleLoading(false));
        dispatch(setError(err));

        // dispatch(setError('Some Error happens'));
      });
  };
};
export const getTaskNowFromLocal = () => {
  return (dispatch) => {
    AsyncStorage.fetItem('tasks')
      .then((tasks) => {
        if (tasks != null) {
          return dispatch(fetchTask(JSON.parse(tasks)));
        } else {
          dispatch(setError('No Tasks yet !'));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(toggleLoading(false));
        dispatch(setError(err));

        // dispatch(setError('Some Error in Catch'));
      });
  };
};
