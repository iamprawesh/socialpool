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

const initialState = {
  loading: false,
  token: '',
  email: '',
  name: '',
  error: '',
  pic: '',
  status: '',
  userId: '',
  login: null,
  users: [],
  tasks: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        token: action.payload.token,
        email: action.payload.user.email,
        name: action.payload.user.name,
        userId: action.payload.user._id,
        status: action.payload.user.status,
        pic: action.payload.user.pic,
        login: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        token: '',
        email: '',
        name: '',
        signup: true,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        loading: false,
        token: '',
        email: '',
        name: '',
        error: '',
        login: false,
      };
    case SET_USER_INFO:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        email: action.payload.user.email,
        name: action.payload.user.name,
        userId: action.payload.user._id,
        status: action.payload.user.status,
        pic: action.payload.user.pic,
        login: true,
      };
    case CLEAR_INPUTS:
      return {
        loading: false,
        token: '',
        email: '',
        name: '',
        error: '',
        pic: '',
        status: '',
        userId: '',
        login: false,
        users: [],
        tasks: [],
      };
    case GET_ALL_USERS:
      return {
        ...state,
        error: '',
        users: action.payload,
      };
    case GET_USERS_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case UPDATE_STATUS:
      let newUsers = state.users.map((user) => {
        if (user._id === state.userId) {
          user.status = action.payload;
        }
        return user;
      });
      // console.log(newUsers);
      return {
        ...state,
        status: action.payload,
        users: newUsers,
      };
    case UPDATE_PIC:
      return {
        ...state,
        pic: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
