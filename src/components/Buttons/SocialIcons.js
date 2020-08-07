import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../assets/colors';
// import {
//   LoginButton,
//   AccessToken,
// } from 'react-native-fbsdk';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialIcons = ({onPressed}) => {
  return (
    <TouchableOpacity onPress={onPressed()}>
      <FontAwesome
        name="facebook-square"
        style={styles.social}
        size={60}
        // iconStyle={{marginLeft: 10}}
      />
    </TouchableOpacity>
  );
};

export default SocialIcons;

const styles = StyleSheet.create({
  social: {
    color: '#4267B2',
    borderRadius: 5,
  },
  btn: {
    width: 60,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.grey,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
});
