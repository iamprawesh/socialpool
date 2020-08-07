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
        // console.log(res.data);
        console.log('nkasmd');
        dispatch(addTask(res.data.result));
        dispatch(toggleLoading(false));
        RootNavigation.navigate('Home', {});
      })
      .catch((err) => {
        console.log('error');
        if (err.response) {
          console.log(err.response.status);
        }
        dispatch(toggleLoading(false));
        console.log(err.response.status);
        console.log(err);
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
        console.log(res.data);
        let str_tasks = JSON.stringify(res.data);
        AsyncStorage.setItem('tasks', str_tasks)
          .then(() => {
            console.log('Tasks Saved in local async');
          })
          .catch((err) => {
            console.log(err);
            alert('Error in saving in localphone [Tasks]');
          });
        // RootNavigation.navigate('Home', {});
      })
      .catch((err) => {
        console.log('error');
        if (err.response) {
          console.log(err.response.status);
        }
        // console.log(err);
        dispatch(toggleLoading(false));
        console.log(err.response.status);
        console.log('err.status');
        dispatch(setError('Some Error happens'));
      });
  };
};
export const getTaskNowFromLocal = () => {
  return (dispatch) => {
    console.log('here');
    AsyncStorage.fetItem('tasks')
      .then((tasks) => {
        if (tasks != null) {
          console.log('==========');
          console.log('Fetch Tasks  from local');
          return dispatch(fetchTask(JSON.parse(tasks)));
        } else {
          dispatch(setError('No Tasks yet !'));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(toggleLoading(false));
        dispatch(setError('Some Error in Catch'));
      });
  };
};
