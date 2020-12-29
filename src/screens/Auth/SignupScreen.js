import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import {COLORS} from '../../assets/colors';
import MainButton from '../../components/MainButton';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarginTen from '../../helper/MarginTen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {SignupUser, clearData} from '../../redux/auth/authAction';
import {connect} from 'react-redux';
import {DEVICESIZE} from '../../helper/DEVICESIZE';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';

// import FontAwesome from 'react-native-vector-icons/FontAwesome5';
const SignupScreen = ({
  navigation,
  loading,
  SignupUser,
  sError,
  // signup,
  clearData,
}) => {
  const auth = useSelector((state) => state.auth);

  const [data, setData] = React.useState({
    email: '',
    password: '',
    conformpassword: '',
    name: '',
    check_textInputChange: false,
    secureTextEntry: true,
    eye_password: false,
    secureReTextEntry: true,
    eye_Re_password: false,
    error: '',
  });
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // do something
      clearData();
      setData({
        email: '',
        password: '',
        conformpassword: '',
        name: '',
        check_textInputChange: false,
        secureTextEntry: true,
        eye_password: false,
        secureReTextEntry: true,
        eye_Re_password: false,
        error: '',
      });
    });

    return unsubscribe;
  }, [navigation]);
  const handleNameChange = (val) => {
    setData({
      ...data,
      name: val,
    });
  };
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

  const handleRePasswordChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        eye_Re_password: true,
        conformpassword: val,
      });
    } else {
      setData({
        ...data,
        eye_Re_password: false,
        conformpassword: val,
      });
    }
  };

  const updateSecquireEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateReSecquireEntry = () => {
    setData({
      ...data,
      secureReTextEntry: !data.secureReTextEntry,
    });
  };
  const handleSubmit = () => {
    if (data.name.length < 3) {
      return setData({
        ...data,
        error: 'Enter Full Name',
      });
    } else {
      setData({
        ...data,
        error: '',
      });
    }
    if (data.email.length == 0) {
      return setData({
        ...data,
        error: 'Enter Email !',
      });
    } else {
      setData({
        ...data,
        error: '',
      });
    }
    if (!data.email.includes('@') && data.email.length < 4) {
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
    } else if (data.conformpassword.length === 0) {
      return setData({
        ...data,
        error: 'Enter Conform Password',
      });
    } else if (data.password.length < 6 || data.conformpassword.length < 6) {
      return setData({
        ...data,
        error: 'Password must be 6 char',
      });
    } else if (data.password !== data.conformpassword) {
      return setData({
        ...data,
        error: 'Passwords must be same',
      });
    } else {
      setData({
        ...data,
        error: '',
      });
    }
    let {email, name, password} = data;
    // console.log(data);
    SignupUser(name, email, password);
  };
  //  console.log()
  return (
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
              padding: 8,
              borderRadius: 20,
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
            Sigup To Account
          </Text>
        </Animatable.View>
        <Animatable.View style={styles.main} animation="fadeInUpBig">
          <View style={styles.action}>
            <Ionicons name="person" color={COLORS.lightblack} size={23} />
            <TextInput
              placeholder="Your name"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={data.name}
              onChangeText={(val) => handleNameChange(val)}
              clearButtonMode="always"
            />
          </View>

          <View style={styles.action}>
            <Ionicons name="mail" color={COLORS.lightblack} size={23} />
            <TextInput
              placeholder="You email"
              style={styles.textInput}
              autoCapitalize="none"
              value={data.email}
              autoCorrect={false}
              onChangeText={(val) => handleEmailChange(val)}
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
              value={data.password}
              autoCorrect={false}
              autoCapitalize="none"
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
          <View style={styles.action}>
            <FontAwesome name="lock" color={COLORS.lightblack} size={23} />
            <TextInput
              placeholder="Conform Password"
              secureTextEntry={data.secureReTextEntry}
              style={styles.textInput}
              value={data.conformpassword}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(val) => handleRePasswordChange(val)}
            />
            {data.eye_Re_password && (
              <Animatable.View animation="bounceIn">
                <TouchableOpacity onPress={() => updateReSecquireEntry()}>
                  {data.secureReTextEntry ? (
                    <Feather name="eye-off" color="grey" size={25} />
                  ) : (
                    <Feather name="eye" color="black" size={25} />
                  )}
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>
          <Text
            style={{marginTop: 5, fontSize:DEVICESIZE.width*.025, color: 'red'}}>
            {data.error ? data.error : auth.error}
          </Text>
          <MarginTen />
          <MainButton
            btntext={`Sign up`}
            onPressed={() => {
              handleSubmit();
            }}
            bgcolor={COLORS.white}
            color={COLORS.primarycolor}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:DEVICESIZE.width*.03}}>Have an Account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginS')}>
              <Text
                style={{
                  color: COLORS.primarycolor,
                  fontWeight: 'bold',
                  fontSize:DEVICESIZE.width*.03
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
         {auth.loading && (
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
      </View>
    //  </KeyboardAwareScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    sError: state.error,
    loading: state.loading,
    // signup: state.signup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SignupUser: (name, email, password) => {
      dispatch(SignupUser(name, email, password));
    },
    clearData: () => {
      dispatch(clearData());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);

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
    width: '80%',
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
