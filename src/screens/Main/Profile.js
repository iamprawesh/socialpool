import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {COLORS} from '../../assets/colors';
import {Avatar, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import TaskItem from '../../components/TaskItem';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <View style={{flex: 1}}>
      <View style={styles.top}>
        <View style={styles.side1}>
          <Avatar
            rounded
            title="CR"
            size="xlarge"
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
        </View>
        <View style={styles.side2}>
          <View>
            <Text style={{color: '#fff'}}>Ram will</Text>
          </View>
          <KeyboardAwareScrollView>
            <Input
              placeholder="INPUT WITH CUSTOM ICON"
              leftIcon={<Icon name="user" size={24} color="black" />}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text>ah</Text>
        {auth.tasks.map((item) => {
          <View style={{backgroundColor: 'green'}}>
            <TaskItem item={item} />;
          </View>;
        })}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  top: {
    flex: 2,
    backgroundColor: COLORS.black,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottom: {
    flex: 4,
    backgroundColor: 'red',
    top: 100,
  },
  side1: {},
  side2: {
    color: 'white',
    width: 100,
    alignSelf: 'stretch',
    // alignItems: 'center',
    // backgroundColor: COLORS.white,
  },
});
