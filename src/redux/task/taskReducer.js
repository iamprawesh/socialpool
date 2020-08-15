import {
  ADD_TASK,
  GET_TASK,
  TOGGLE_LOADING,
  SET_ERROR,
  UPDATE_TASK,
} from './taskTypes';

const initialState = {
  loading: false,
  tasks: [],
  error: '',
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case UPDATE_TASK:
      // console.log(action.payload.likes);
      state.tasks.map((task) => {
        if (task._id == action.payload._id) {
          return {...state, tasks: {...task, likes: [action.payload.likes]}};
        } else {
          return {...state, tasks: [task]};
        }
      });
    // return state;
    case GET_TASK:
      return {
        ...state,
        error: '',
        tasks: action.payload,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
