import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Main/HomeScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {COLORS} from '../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import * as RootNavigation from '../RootNavigation.js';

import DrawerContent from './DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import CreatePostScreen from '../screens/Main/CreatePostScreen';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {signoutUser} from '../redux';
import Profile from '../screens/Main/Profile';
import AllUsers from '../screens/Main/AllUsers';
import UserProfile from '../screens/Main/UserProfile';
import QuizMain from '../screens/Main/Quiz/QuizMain';
import QuizQuestion from '../screens/Main/Quiz/QuizQuestion';
import About from '../screens/Main/About';
const Stack = createStackNavigator();
const OtherStack = createStackNavigator();

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
function LogoTitle(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Icon.Button
        name="ios-menu"
        size={35}
        style={{
          marginLeft: -10,
        }}
        backgroundColor={COLORS.lightblack}
        // onPress={() => props.navigation.openDrawer()}
      ></Icon.Button>
      <Text
        style={{
          color: COLORS.lightcolor,
        }}>
        hello
      </Text>
    </View>
  );
}

export const HomeStackScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const menu = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.lightblack,
        },
        headerTintColor: '#fff',
        headerTintStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Social Sharer',
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor={COLORS.lightblack}
              onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <Menu
                ref={menu}
                button={
                  <Icon.Button
                    name="ellipsis-vertical-sharp"
                    size={25}
                    onPress={showMenu}
                    backgroundColor={COLORS.lightblack}></Icon.Button>
                }>
                <MenuItem
                  onPress={() => {
                    RootNavigation.navigate('Profile', {_id: auth.userId});
                    hideMenu();
                  }}>
                  Profile
                </MenuItem>
                <MenuItem onPress={() => dispatch(signoutUser())}>
                  Sign Out
                </MenuItem>
              </Menu>
            </View>
          ),
        }}
      />
      <HomeStack.Screen name="CreateScreen" component={CreatePostScreen} />
      {/* <HomeStack.Screen name="Profile" component={Profile} /> */}
      <HomeStack.Screen name="Profile" component={UserProfile} />
      <HomeStack.Screen name="Users" component={AllUsers} />
      <HomeStack.Screen name="QuizRoute" component={QuizMain} />
      <HomeStack.Screen name="QuizQuestionRoute" component={QuizQuestion} />
      <HomeStack.Screen name="AboutP" component={About} />
    </HomeStack.Navigator>
  );
};
// export const DetailScreenStack = ({navigation}) => {
//   return (
//     <DetailStack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#009232',
//         },
//         headerTintColor: '#fff',
//         headerTintStyle: {
//           fontWeight: 'bold',
//         },
//       }}>
//       <DetailStack.Screen
//         name="Test"
//         component={TestScreen}
//         options={{
//           headerLeft: () => (
//             <Icon.Button
//               name="ios-menu"
//               size={25}
//               backgroundColor="#009232"
//               onPress={() => navigation.openDrawer()}></Icon.Button>
//           ),
//         }}
//       />
//     </DetailStack.Navigator>
//   );
// };

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthS" component={AuthScreen} />
      <Stack.Screen name="LoginS" component={LoginScreen} />
      <Stack.Screen name="SignupS" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: COLORS.lightcolor,
        width: Dimensions.get('window').width * 0.65,
      }}>
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      {/* <Drawer.Screen name="Test" component={DetailScreenStack} /> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
