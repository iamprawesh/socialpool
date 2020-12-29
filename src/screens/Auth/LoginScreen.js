import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {DEVICESIZE} from '../../helper/DEVICESIZE';
import {COLORS} from '../../assets/colors';
import MainButton from '../../components/MainButton';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarginTen from '../../helper/MarginTen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {loginUser, clearData} from '../../redux/auth/authAction';
import LottieView from 'lottie-react-native';
import {useSelector,} from 'react-redux';

const LoginScreen = ({navigation, sError, loginUser, loading, clearData}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    eye_password: false,
    error: '',
  });
  const auth = useSelector((state) => state.auth);
  // console.log(auth.error);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {});
    clearData();
    setData({
          email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    eye_password: false,
    error: '',
    });
    return unsubscribe;
  }, [navigation]);

  const handleEmailChange = (val) => {
    if (val.length !== 0 && val.includes('@')) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        eye_password: true,
        password: val,
      });
    } else {
      setData({
        ...data,
        eye_password: false,
        password: val,
      });
    }
  };

  const updateSecquireEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const handleSubmit = () => {
    console.log(data.email.length);
    if (data.email.length === 0 || data.password.length === 0) {
      return setData({
        ...data,
        error: 'Enter the FIelds',
      });
    }
    if (!data.email.includes('@')) {
      return setData({
        ...data,
        error: 'Enter valid Email !',
      });
    } else {
      setData({
        ...data,
        error: '',
      });
    }

    if (data.password.length === 0) {
      return setData({
        ...data,
        error: 'Enter Password',
      });
    } else if (data.password.length < 5) {
      return setData({
        ...data,
        error: 'Password must be 5 char',
      });
    } else {
      setData({
        ...data,
        error: '',
      });
    }
    let {email, password} = data;
    // console.log(email, password);
    loginUser(email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: COLORS.lightcolor}}>
        <View style={styles.header}></View>
        <View style={styles.footer}></View>
        <Animatable.View
          animation="pulse"
          style={{
            position: 'absolute',
            top: '1%',
            flex: 1,
            left: '10%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              padding: DEVICESIZE.width*.01,
              borderRadius: 10,
            }}>
            <Image
              style={{
                height: DEVICESIZE.height*.08,
                width: DEVICESIZE.width*.15,
                alignItems: 'center',
              }}
              source={require('../../assets/images/logo.png')}
            />
          </View>

          <View style={{marginRight: '5%'}} />
          <Text
            style={{
              fontSize: DEVICESIZE.width*.07,
              flex: 1, 
              flexWrap: 'wrap',
              color: COLORS.lightcolor,
              fontWeight: 'bold',
              fontFamily: 'sans-serif-condensed',
              letterSpacing: 1,
            }}>
            Login To Account
          </Text>
        </Animatable.View>
        <Animatable.View style={styles.main} animation="fadeInUpBig">
          <View style={styles.action}>
            <Ionicons name="mail" color={COLORS.lightblack} size={23} />
            <TextInput
              placeholder="You email"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={data.email}
              onChangeText={(val) => handleEmailChange(val)}
              keyboardType={'email-address'}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
                  color={COLORS.primarycolor}
                  size={25}
                />
              </Animatable.View>
            ) : null}
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color={COLORS.lightblack} size={23} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry}
              style={styles.textInput}
              autoCorrect={false}
              autoCapitalize="none"
              value={data.password}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            {data.eye_password && (
              <Animatable.View animation="bounceIn">
                <TouchableOpacity onPress={() => updateSecquireEntry()}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={25} />
                  ) : (
                    <Feather name="eye" color="black" size={25} />
                  )}
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>
          {!loading && (
            <React.Fragment>
              {data.error ? (
                <Text
                  style={{
                    marginTop: 5,
                    fontSize:DEVICESIZE.width*.028,
                    color: 'red',
                    marginLeft: -50,
                    width: DEVICESIZE.width * 0.6,
                    textAlign: 'center',
                  }}>
                  {data.error}
                </Text>
              ) : (
                <Text
                  style={{
                    marginTop: 5,
                    fontSize:DEVICESIZE.width*.028,
                    color: 'red',
                    marginLeft: -50,
                    width: DEVICESIZE.width * 0.6,
                    textAlign: 'center',
                  }}>
                  {sError}
                </Text>
              )}
            </React.Fragment>
          )}
          <MarginTen />
          <MainButton
            onPressed={() => {
              handleSubmit();
            }}
            btntext="Log in"
            bgcolor={COLORS.primarycolor}
            color={COLORS.white}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{
                  fontSize:DEVICESIZE.width*.03

            }}>Don't have an Account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignupS')}>
              <Text
                style={{
                  color: COLORS.primarycolor,
                  fontWeight: 'bold',
                  fontSize:DEVICESIZE.width*.03
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
      {loading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: DEVICESIZE.height,
            width: DEVICESIZE.width,
            padding: 100,
            backgroundColor: 'rgba(0,0,0,0.2)',
            // backgroundColor: COLORS.lightcolor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../assets/lottiefiles/userloading.json')}
            autoPlay
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state) => {
  return {
    sError: state.auth.error,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => {
      dispatch(loginUser(email, password));
    },
    clearData: () => {
      dispatch(clearData());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: COLORS.primarycolor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  main: {
    position: 'absolute',
    top: '20%',
    padding: '5%',
    left: '10%',
    width: DEVICESIZE.width * 0.8,
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
  },
  action: {
    width: '80%',
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primarycolor,
    paddingBottom: 5,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: '#05375a',
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.lightcolor,
  },
  socialbtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
