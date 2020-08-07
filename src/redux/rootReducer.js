import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import adviceReducer from './adviceToggle/adviceReducer';
import categoryReducer from './category/categoryReducer';
import taskReducer from './task/taskReducer';
import quizReducer from './quiz/quizReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  advice: adviceReducer,
  category: categoryReducer,
  task: taskReducer,
  quiz: quizReducer,
});

export default rootReducer;
