import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../assets/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainButton = ({btntext, onPressed, color, bgcolor, auth}) => {
  let x;
  let y;
  if (auth) {
    x = 'row';
    y = 10;
  } else {
    x = 'column';
    y = 0;
  }
  return (
    <View style={styles.top}>
      <TouchableOpacity onPress={onPressed}>
        <View
          style={[
            styles.btn,
            {
              backgroundColor: bgcolor,
              borderColor: COLORS.primarycolor,
              flexDirection: x,
              paddingTop: y,
              justifyContent: 'space-around',
            },
          ]}>
          {auth && (
            <FontAwesome
              name="facebook-square"
              color="#fff"
              size={40}
              // iconStyle={{marginLeft: 10}}
            />
          )}
          {!auth && (
            <Text style={[styles.text, {color: color}]}>{btntext}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  top: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '5%',
    height: 50,
    width: '100%',
  },
  btn: {
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    width: 250,
    borderRadius: 7,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
