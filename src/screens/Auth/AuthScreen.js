import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
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

const AuthScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const _fbAuth = () => {
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log('Error fetching data=', error.toString());
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
        console.log(json);
      })
      .catch((err) => {
        alert('ERROR GETTING DATA FROM FACEBOOK');
      });
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
        {loading && (
          <View>
            <Text>loading</Text>
          </View>
        )}
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
            fontSize={14}
            hrPadding={19}
            textStyles={{
              fontWeight: 'bold',
              color: COLORS.grey,
            }}
          />
          <View style={styles.socialbtn}>
            <SocialIcons onPressed={() => _fbAuth} />
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
