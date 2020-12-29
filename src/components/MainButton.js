import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../assets/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DEVICESIZE } from '../helper/DEVICESIZE';

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
    <View style={{
      flex:1,
      width:'95%'
    }}>
      <TouchableOpacity onPress={onPressed} style={styles.top}>
        <View
          style={[
            styles.btn,
            {
              backgroundColor: bgcolor,
              borderColor: COLORS.primarycolor,
              flexDirection: x,
              paddingTop: y,
              // justifyContent: 'space-around',
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
    alignItems: 'center',
    marginBottom: '5%',
    justifyContent:'center',
  },
  btn: {
    borderWidth: 2,
    flex: 1,
    width: 250,
    width:'100%',
    paddingVertical:'4%',
    borderRadius: 7,
    justifyContent: 'center', //Centered vertically
   alignItems: 'center', // Centered horizontally
  },
  text: {
    paddingTop:'4%',
    // textAlign: 'center',
    // textAlignVertical: 'center',
    // justifyContent:'center',
    fontSize: DEVICESIZE.width*.035,
    letterSpacing: 1,
    fontWeight: 'bold',
    // alignItems: 'center',
  },
});
