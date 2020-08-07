import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ViewContainer = ({children}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
      }}>
      {children}
    </View>
  );
};

export default ViewContainer;

const styles = StyleSheet.create({});
