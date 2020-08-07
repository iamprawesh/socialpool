import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';

import Modal from 'react-native-modal';
import {updateStatus, updatestatus} from '../redux';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../assets/colors';
import {DEVICESIZE} from '../helper/DEVICESIZE';
import LinearGradient from 'react-native-linear-gradient';
import Spacer from '../helper/Spacer';

const UpdateStatus = ({status, onChangeStatus, val, onSave, onCancel}) => {
  const auth = useSelector((state) => state.auth);
  return (
    <View>
      <Modal
        onSwipeComplete={onSave}
        swipeDirection="left"
        isVisible={val}
        animationIn="slideInUp"
        onBackButtonPress={onCancel}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: DEVICESIZE.width * 0.7,
              height: DEVICESIZE.height * 0.3,
              borderRadius: 50,
              backgroundColor: COLORS.white,
              //   justifyContent: 'center',
              paddingTop: 10,
              paddingHorizontal: DEVICESIZE.width * 0.09,
              alignItems: 'center',
            }}>
            <View style={{width: DEVICESIZE.width * 0.5}}>
              <TextInput
                defaultValue={`${auth.status}`}
                style={{backgroundColor: 'white'}}
                multiline={true}
                onChangeText={(val) => onChangeStatus(val)}
                blurOnSubmit={true}
                numberOfLines={3}
                style={{
                  borderBottomWidth: 1,
                  fontFamily: 'sans-serif-light',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <Spacer height={20} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  onSave();
                }}>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  colors={['#E55D87', '#5FC3E4']}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>Update Status</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Spacer height={DEVICESIZE.height * 0.04} />
            <View
              style={{
                width: 80,
                alignSelf: 'flex-end',
              }}>
              <Button
                onPress={onCancel}
                title="Cancel"
                type="outline"
                buttonStyle={{
                  //   backgroundColor: COLORS.lightblack,
                  borderRadius: 10,
                }}
              />
              {/* <Button outline title="Cancel" onPress={onSave} /> */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateStatus;

const styles = StyleSheet.create({});
