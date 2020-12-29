import React from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {COLORS} from '../../assets/colors';
import MainButton from '../../components/MainButton';
import Hr from 'react-native-hr-component';
import SocialIcons from '../../components/Buttons/SocialIcons';
import * as Animatable from 'react-native-animatable';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {loginUser, clearData} from '../../redux/auth/authAction';

import {TouchableHighlight} from 'react-native-gesture-handler';
import MarginTen from '../../helper/MarginTen';
import Feather from 'react-native-vector-icons/Feather';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import { DEVICESIZE } from '../../helper/DEVICESIZE';
import LottieView from 'lottie-react-native';

const AuthScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const _fbAuth = () => {
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          // console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                // console.log('Error fetching data=', error.toString());
              } else {
                let password = '123456123456asdfg123456';
                let socialauth = true;
                dispatch(
                  loginUser(
                    result.email,
                    password,
                    result.name,
                    socialauth,
                    accessToken,
                  ),
                );
              }
            };
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters: {
                  fields: {
                    string: 'email,name',
                  },
                },
              },
              responseInfoCallback,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
    );
  };
  const initUser = (token) => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,first_name,last_name&access_token=' +
        token,
    )
      .then((response) => response.json())
      .then((json) => {
      })
      .catch((err) => {
        alert('ERROR GETTING DATA FROM FACEBOOK');
      });
  };

  React.useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '473624721309-tkgq9ql0qnu1rkspghkjp2v1gq8cad7s.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // dispatch()
      const userInfo = await GoogleSignin.signIn();
      let password = '123456123456asdfg123456';
      
      let socialauth = true;
      // const {name, photo,email,serverAuthCode} = await GoogleSignin.signIn();
      let {name,photo,email} = userInfo.user
      // console.log(name,email,photo,serverAuthCode)
      // console.log(userInfo)
      // console.log(loading)
      dispatch(
        loginUser(
          email,
          password,
          name,
          photo,
          socialauth,
          userInfo.serverAuthCode,
        ),
      );
    } catch (error) {
      console.log(error.code);
      if (error.code == 7) {
        Alert.alert(
          'No Internet Connection',
          'Make sure you have Internet Connection',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {
            cancelable: false,
          },
        );
      }

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // console.log('1');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // console.log('2');

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // console.log('3');

        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: COLORS.lightcolor}}>
        <View style={styles.header}></View>
        <View style={styles.footer}></View>
        <Animatable.View
          duration={4000}
          animation="bounceIn"
          style={{
            position: 'absolute',
            top: '5%',
            flex: 1,
            left: '30%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: 120,
              width: 120,
              alignItems: 'center',
            }}
            source={require('../../assets/images/logo.png')}
          />
          <View style={{marginRight: '5%'}} />
        </Animatable.View>
        <View style={styles.main}>
          <MainButton
            btntext="Log in"
            onPressed={() => {
              navigation.navigate('LoginS');
            }}
            bgcolor={COLORS.primarycolor}
            color={COLORS.white}
          />
          <MainButton
            btntext={`Sign up`}
            onPressed={() => {
              navigation.navigate('SignupS');
            }}
            bgcolor={COLORS.white}
            color={COLORS.primarycolor}
          />
          <Hr
            lineColor={COLORS.black}
            width={1}
            thickness={1}
            text="Or Connect With"
            fontSize={DEVICESIZE.width*.035}
            hrPadding={19}
            textStyles={{
              fontWeight: 'bold',
              color: COLORS.grey,
            }}
          />
          <View style={styles.socialbtn}>
            <GoogleSigninButton
              style={{width: DEVICESIZE.width*.7, height: 55}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
              // disabled={this.state.isSigninInProgress}
            />
            {/* <SocialIcons onPressed={() => _fbAuth} /> */}
            {/* <SocialIcons /> */}
            {/* <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <Text style={{flex: 1}}>Login with Facebook</Text>
              </View>
            </View> */}
            {/* <SocialIcons /> */}
          </View>
        </View>
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
    </>
  );
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUser: (email, password, socialauth = false, name = '') => {
//       dispatch(loginUser(email, password, (socialauth = false), (name = '')));
//     },
//     clearData: () => {
//       dispatch(clearData());
//     },
//   };
// };
export default AuthScreen;

// export default connect(null, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: COLORS.primarycolor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  main: {
    position: 'absolute',
    top: '30%',
    padding: '5%',
    left: '10%',
    width: '80%',
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
  },
  welcomeText: {
    fontSize: 25,
    letterSpacing: 2,
    marginBottom: '2%',
    fontFamily: 'sans-serif-condensed',
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
