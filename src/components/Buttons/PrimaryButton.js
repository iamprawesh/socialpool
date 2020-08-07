import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../assets/colors';
import {DEVICESIZE} from '../../helper/DEVICESIZE';
import LinearGradient from 'react-native-linear-gradient';

const PrimaryButton = ({text, onPressbtn}) => {
  return (
    <TouchableOpacity onPress={onPressbtn} activeOpacity={0.8}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.btn}
        colors={['#16222A', '#3A6073']}
        //   colors={[`${COLORS.primarycolor}`, `${COLORS.secondarycolor}`]}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.primarycolor,
    borderRadius: 20,
    width: DEVICESIZE.width * 0.6,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
});
