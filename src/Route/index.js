import React from 'react';
import DrawerScreen, {AuthStack, MainStack} from './MainAuth';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
// import {useSelector, useDispatch} from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';
import {getUserInfo} from '../redux/auth/authAction';
import {connect} from 'react-redux';
import {navigationRef} from '../RootNavigation';
const AuthControl = ({logindata, getUserInfo}) => {
  React.useEffect(() => {
    const result = async () => {
      getUserInfo();
    };
    result();
    // SplashScreen.hide();
  }, []);
  SplashScreen.hide();

  return (
    <NavigationContainer ref={navigationRef}>
      {logindata.login ? <DrawerScreen /> : <AuthStack />}
    </NavigationContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    logindata: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfo());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthControl);
