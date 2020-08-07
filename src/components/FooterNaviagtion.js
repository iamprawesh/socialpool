import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';
import {Col, Row, Grid} from 'react-native-easy-grid';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Icon as RCEIcon} from 'react-native-elements';

const FooterNaviagtion = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Grid>
      <Col style={styles.colView}>
        <TouchableOpacity onPress={() => navigation.navigate('Users')}>
          <View style={styles.view}>
            <View
              style={{
                padding: 10,
                backgroundColor: COLORS.secondarycolor,
                borderRadius: 50,
              }}>
              <RCEIcon
                name="users"
                type="feather"
                color={COLORS.white}
                size={30}
              />
            </View>
            <Text style={styles.text}>Users</Text>
          </View>
        </TouchableOpacity>
      </Col>
      <Col style={styles.colView}>
        <TouchableOpacity
          onPress={() => {
            // dispatch(fetchCategoryNow());
            navigation.navigate('CreateScreen');
          }}>
          <View style={styles.view}>
            <View
              style={{
                padding: 10,
                backgroundColor: COLORS.secondarycolor,
                borderRadius: 50,
              }}>
              <RCEIcon
                type="feather"
                name="edit"
                color={COLORS.white}
                size={30}
              />
            </View>

            <Text style={styles.text}>Create</Text>
          </View>
        </TouchableOpacity>
      </Col>
      <Col style={styles.colView}>
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
              <Icon name="home-sharp" color={COLORS.white} size={30} />
            </View>

            {/* <Text style={styles.text}>Hello</Text> */}
          </Animatable.View>
        </TouchableOpacity>
      </Col>
      <Col style={styles.colView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('QuizRoute');
          }}>
          <View style={styles.view}>
            <View
              style={{
                padding: 10,
                backgroundColor: COLORS.secondarycolor,
                borderRadius: 50,
              }}>
              <Image
                style={{
                  height: 35,
                  width: 35,
                }}
                source={require('../assets/images/quiz.png')}
              />
              {/* <Icon name="md-podium-sharp" color={COLORS.white} size={30} /> */}
            </View>

            <Text style={[styles.text, {marginLeft: 10}]}>Quiz</Text>
          </View>
        </TouchableOpacity>
      </Col>
      <Col style={styles.colView}>
        <TouchableOpacity>
          <View style={styles.view}>
            <View
              style={{
                padding: 10,
                backgroundColor: COLORS.secondarycolor,
                borderRadius: 50,
              }}>
              <Icon name="information" color={COLORS.white} size={30} />
            </View>

            <Text style={styles.text}>About</Text>
          </View>
        </TouchableOpacity>
      </Col>
    </Grid>
  );
};

export default FooterNaviagtion;

const styles = StyleSheet.create({
  view: {
    padding: 10,
    flexDirection: 'column',
  },
  text: {
    // marginTop: -4,
    color: COLORS.white,
    fontSize: 13,
    letterSpacing: 1,
    marginTop: 3,
    fontWeight: 'bold',
  },
  colView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
