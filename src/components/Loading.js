import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {COLORS} from '../assets/colors';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightcolor,
      }}>
      <LottieView
        source={require('../assets/lottiefiles/loading.json')}
        autoPlay
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
