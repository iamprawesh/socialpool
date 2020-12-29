import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGN_OUT,
  SET_USER_INFO,
  CLEAR_INPUTS,
  GET_ALL_USERS,
  GET_USERS_TASKS,
  UPDATE_STATUS,
  UPDATE_PIC,
} from './authTypes';
import Snackbar from 'react-native-snackbar';
import LottieView from 'lottie-react-native';

import KEY from '../../config/keys';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../../RootNavigation';

export const loginRequest = (val) => {
  return {
    type: LOGIN_REQUEST,
    payload: val,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
};

export const signupRequest = (val) => {
  return {
    type: SIGNUP_REQUEST,
    payload: val,
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};
export const signupFailed = (error) => {
  return {
    type: SIGNUP_FAILED,
    payload: error,
  };
};

export const clearData = () => {
  return {
    type: CLEAR_INPUTS,
  };
};
export const signout = () => {
  return {
    type: SIGN_OUT,
  };
};

export const setUserData = (data) => {
  return {
    type: SET_USER_INFO,
    payload: data,
  };
};

export const getallusers = (data) => {
  return {
    type: GET_ALL_USERS,
    payload: data,
  };
};
export const getusertasks = (data) => {
  return {
    type: GET_USERS_TASKS,
    payload: data,
  };
};
export const getUserInfo = () => {
  return (dispatch) => {
    AsyncStorage.getItem('userInfo')
      .then((userData) => {
        if (userData != null) {
          dispatch(setUserData(JSON.parse(userData)));
        }
      })
      .catch((err) => {});
  };
};

export const updateStatus = (val) => {
  return {
    type: UPDATE_STATUS,
    payload: val,
  };
};
export const updatePic = (val) => {
  return {
    type: UPDATE_PIC,
    payload: val,
  };
};
export const loginUser = (
  email,
  password,
  name = '',
  pic = '',
  socialauth = false,
  token = '',
) => {
  return (dispatch) => {
    console.log(email,password)
    dispatch(loginRequest(true));
    let url = `${KEY.APIURL}/api/user/login`
    // console.log(url);
    // axios.post(url,{
    //   name,email,password,socialauth,token
    // }).then((res)=>{
    //   console.log(res.data);
    // dispatch(loginRequest(false));
    // }).catch((error)=>{
    //   console.log(error.response.data.message)
    //   if (error.response) {
    //       dispatch(loginFailed(error.response.data.message));
    //     }
    //   else if(error['message']=='Network Error'){
    //     alert("Check the internet connection");
    //   }
    // dispatch(loginRequest(false));
    // })
    axios.post(url, {
        name,
        email,
        password,
        socialauth,
        token
      }).then((res) => {
        // console.log(res)
        let user_data = JSON.stringify(res.data);
        AsyncStorage.setItem('userInfo', user_data)
          .then((x) => {
            dispatch(loginSuccess(res.data));
          })
          .catch((err) => {
            // console.log('err');
            // console.log(err);
          });
      })
      .catch((error) => {
        console.log('error.response.data.message');
        // console.log(error.response);
        if (error.response.data) {
          dispatch(loginFailed(error.response.data.message));
        }
        else if(error['message']=='Network Error'){
          alert("Check the internet connection");
          dispatch(loginRequest(false));

      }
        // if (error.response.status == 401) {
          // dispatch(loginFailed(error.response.data.message));
        // }
      });
  };
};

export const getallUsers = (userId) => {
  return (dispatch) => {
    let url = `${KEY.APIURL}/api/user/all`;
    axios
      .get(url)
      .then((response) => {
        dispatch(getallusers(response.data.result));
        let ownUser = response.data.result.filter((item) => item._id == userId);
        dispatch(updateStatus(ownUser[0].status));
      })
      .catch((err) => {
        // console.log(err);
        // console.log('error');
      });
  };
};

export const updatestatus = (id, status, tokenId) => {
  return (dispatch) => {
    let url = `${KEY.APIURL}/api/user/status/${id}`;
    axios
      .post(
        url,
        {
          status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + tokenId,
          },
        },
      )
      .then((response) => {
        console.log('Update status');
        // console.log(response);
        if (response.status == 200) {
          dispatch(updateStatus(response.data.result));
          Snackbar.show({
            text: 'Updated status',
            duration: 1000,
            // action: {
            //   text: 'UNDO',
            //   textColor: 'green',
            //   onPress: () => {
            //     /* Do something. */
            //     console.log('Hello world');
            //   },
            // },
          });
        }
        if (response.data.message) {
          Snackbar.show({
            text: `${response.data.message}`,
            duration: 900,
            // action: {
            //   text: 'UNDO',
            //   textColor: 'green',
            //   onPress: () => {
            //     /* Do something. */
            //     console.log('Hello world');
            //   },
            // },
          });
        }
      })
      .catch((err) => {
        // console.log('error');
        // console.log(err.response.data);
      });
  };
};
export const getUserTasks = (id) => {
  return (dispatch) => {
    let url = `${KEY.APIURL}/api/tasks/${id}`;
    axios
      .get(url)
      .then((response) => {
        dispatch(getusertasks(response.data.result));
      })
      .catch((err) => {
        console.log('error');
      });
  };
};
export const signoutUser = () => {
  return (dispatch) => {
    dispatch(signout());
    AsyncStorage.multiRemove(['userInfo', 'categories', 'tasks'])
      .then((x) => {
        AsyncStorage.getAllKeys()
          .then((x) => {})
          .catch((err) => {
            // console.log(err);
          });
      })
      .catch((err) => {});
  };
};

export const loadingRequest = (val)=>{
  return(dispatch)=>{
    dispatch(signupRequest(val));
  }
}

export const SignupUser = (name, email, password) => {
  return (dispatch) => {
    dispatch(signupRequest(true));
    console.log(email, name, password);
    let url = `${KEY.APIURL}/api/user/signup`;
    // console.log(url);
    axios.post(url, {
        name,
        email,
        password
      }).then((response) => {
        dispatch(signupSuccess());
        alert('Sign up Success Login Now!');
        RootNavigation.navigate('LoginS', {});
      }).catch((error) => {
        // console.log(error)
        // console.log(error.response.data.message)
        dispatch(signupFailed(error.response.data.message));
      });
  };
};
