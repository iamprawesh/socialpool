import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {fetchAdviceNow} from '../redux';
import {useSelector, useDispatch} from 'react-redux';

import {COLORS} from '../assets/colors';
import * as RootNavigation from '../RootNavigation';
// import PopUpOne from '../popUpModel/PopUpOne';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NameLetter} from '../helper/NameLetter';
const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            {!auth.pic ? (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: COLORS.lightcolor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 55,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  {NameLetter(auth.name)}
                </Text>
              </View>
            ) : (
              <Avatar
                source={{
                  uri: `${auth.pic}`,
                  // 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}
                size={100}
                rounded
              />
            )}
            <Text style={styles.title}>{auth.name}</Text>
            <Text style={styles.caption}>{auth.status}</Text>
          </View>
          <View
            style={
              {
                // backgroundColor: COLORS.lightblack,
              }
            }>
            {/* <Drawer.Section style={styles.bottomDrawerSection}> */}
            <DrawerItem
              style={styles.bottomDrawerSection}
              label={({focused, color}) => (
                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>
                  Want Some advice ?
                </Text>
              )}
              icon={({color, size}) => (
                <Icon name="gesture-double-tap" size={size} color={color} />
              )}
              onPress={() => {
                props.fetchAdviceNow();
                RootNavigation.navigate('Home', {});
              }}
            />
            {/* </Drawer.Section> */}
            {/* <Drawer.Section style={styles.bottomDrawerSection}> */}
            <DrawerItem
              style={styles.bottomDrawerSection}
              label={({focused, color}) => (
                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>
                  Sign out
                </Text>
              )}
              icon={({color, size}) => (
                <Icon name="exit-to-app" size={size} color={color} />
              )}
              onPress={() => {
                RootNavigation.navigate('Home', {});
              }}
            />
            {/* </Drawer.Section> */}
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdviceNow: () => {
      dispatch(fetchAdviceNow());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginTop: -5,
    paddingLeft: 20,
    height: 250,
    backgroundColor: COLORS.lightblack,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  title: {
    textTransform: 'capitalize',
    color: COLORS.white,
    fontSize: 25,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  caption: {
    color: COLORS.white,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    // marginBottom: 15,
    borderTopColor: '#f4f4f4',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
