import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import {COLORS} from '../assets/colors';

const NeedInternet = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <LottieView
        source={require('../assets/lottiefiles/nointernet.json')}
        autoPlay
      />
    </View>
  );
};

export default NeedInternet;

const styles = StyleSheet.create({});
