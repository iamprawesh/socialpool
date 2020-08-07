import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Spacer = ({height}) => {
  let h;
  if (height) {
    h = height;
  } else {
    h = 5;
  }
  return <View style={{height: h}}></View>;
};

export default Spacer;

const styles = StyleSheet.create({});
