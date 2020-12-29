import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Icon as RCEIcon} from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import { DEVICESIZE } from '../helper/DEVICESIZE';

const FooterNaviagtion = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <View style={styles.colView}>
        <TouchableOpacity onPress={() => navigation.navigate('Users')}>
          <View style={styles.view}>
            <View
              style={styles.iconCover}>
              <RCEIcon
                name="users"
                type="feather"
                color={COLORS.white}
                size={DEVICESIZE.width*.07}
              />
            </View>
            <Text style={styles.text}>Users</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.colView}>
        <TouchableOpacity
          onPress={() => {
            // dispatch(fetchCategoryNow());
            navigation.navigate('CreateScreen');
          }}>
          <View style={styles.view}>
            <View
              style={styles.iconCover}>
              <RCEIcon
                type="feather"
                name="edit"
                color={COLORS.white}
                size={DEVICESIZE.width*.07}
              />
            </View>

            <Text style={styles.text}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.colView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('hello')}>
          <Animatable.View
            animation="flipInX"
            style={[
              styles.view,
              {
                backgroundColor: COLORS.white,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                marginBottom: 40,
              },
            ]}>
            <View
              style={{
                padding: 10,
                backgroundColor: COLORS.lightblack,
                borderRadius: 50,
              }}>
              <Icon name="home-sharp" color={COLORS.white} 
                size={DEVICESIZE.width*.07}
              
              />
            </View>

            {/* <Text style={styles.text}>Hello</Text> */}
          </Animatable.View>
        </TouchableOpacity>
      </View>
      <View style={styles.colView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('QuizRoute');
          }}>
          <View style={styles.view}>
            <View
              style={styles.iconCover}>
              <Image
                style={{
                  height: DEVICESIZE.width*.09,
                  width: DEVICESIZE.width*.09,
                }}
                source={require('../assets/images/quiz.png')}
              />
              {/* <Icon name="md-podium-sharp" color={COLORS.white} size={30} /> */}
            </View>

            <Text style={[styles.text, {marginLeft: 10}]}>Quiz</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.colView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AboutP');
          }}>
          <View style={styles.view}>
            <View
              style={styles.iconCover}>
              <Icon name="information" color={COLORS.white} 
                size={DEVICESIZE.width*.07}
              />
            </View>

            <Text style={styles.text}>About</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNaviagtion;

const styles = StyleSheet.create({
  view: {
    padding: DEVICESIZE.width*.04,
    flexDirection: 'column',
  },
  iconCover:{
    padding: DEVICESIZE.width*.025,
    backgroundColor: COLORS.secondarycolor,
    borderRadius: DEVICESIZE.width*.1,
  },
  text: {
    // marginTop: -4,
    color: COLORS.white,
    fontSize: DEVICESIZE.width*.033,
    letterSpacing: 1,
    marginTop: 3,
    fontWeight: 'bold',
  },
  colView: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
