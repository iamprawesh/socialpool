import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../assets/colors';
import {DEVICESIZE} from '../helper/DEVICESIZE';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {fetchAdviceNow, fetchAdvice, adviceToggle} from '../redux';

const PopUpOne = ({advice, adviceToggle}) => {
  const toggleModal = () => {
    adviceToggle();
  };
  // console.log(advice);
  return (
    <View>
      <Modal
        isVisible={advice.show}
        animationIn="bounceInLeft"
        animationOut="bounceOut"
        animationOutTiming={600}
        animationInTiming={1000}
        onModalWillHide={() => console.log('cliecked hide')}
        onSwipeStart={() => console.log('onSwipe start')}
        onBackButtonPress={() => adviceToggle()}
        // onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => toggleModal()}>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: COLORS.lightcolor,
            height: DEVICESIZE.height * 0.2,
            width: DEVICESIZE.width * 0.5,
            left: DEVICESIZE.width * 0.15,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          {/* <View
            style={{
              width: '50%',
              height: 70,
            }}> */}
          {/* <LottieView
              source={require('../assets/lottiefiles/success.json')}
              autoPlay
              // loop
            /> */}
          {/* </View> */}
          <Text
            style={{
              color: COLORS.lightblack,
              textAlign: 'center',
              fontSize: 20,
            }}>
            {advice.text}
          </Text>
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </View>
      </Modal>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdviceNow: () => {
      dispatch(fetchAdviceNow());
    },
    adviceToggle: () => {
      dispatch(adviceToggle());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PopUpOne);

const styles = StyleSheet.create({});
