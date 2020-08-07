// import 'react-native-paper';
import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ViewContainer from '../../helper/ViewContainer';
import {COLORS} from '../../assets/colors';
import Spacer from '../../helper/Spacer';
import {DEVICESIZE} from '../../helper/DEVICESIZE';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import images from './ImageCollection';
import Loading from '../../components/Loading';
import NetInfo from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {addTaskNow} from '../../redux/task/taskAction';
import {Button, Input} from 'react-native-elements';

const CreatePostScreen = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [place, setPlace] = React.useState('');
  const [category, setCategory] = React.useState('5f0fe5e64d173b239468fefb');

  const [error, setError] = React.useState({
    title: '',
    desc: '',
    place: '',
  });
  const categories = useSelector((state) => state.category.categories);
  const tokenId = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.task.loading);
  const dispatch = useDispatch();

  // console.log(categories);
  // NetInfo.fetch().then((state) => {
  //   console.log('Connection type', state.type);
  //   console.log('Is connected?', state.isConnected);
  // });
  const handleSetCategory = (item) => {
    setCategory(item._id);
    console.log(item.name);
  };
  let FirstInput = useRef(null);

  let SecondInput = useRef(null);
  let ThirdInput = useRef(null);
  const handleSubmit = () => {
    if (title.length < 15) {
      setError((prev) => {
        return {...prev, title: 'Title must be 15 character '};
      });
    } else {
      setError((prev) => {
        return {...prev, title: ' '};
      });
    }
    if (description.length < 30) {
      setError((prev) => {
        return {...prev, desc: 'Description must be 30 character '};
      });
    } else {
      setError((prev) => {
        return {...prev, desc: ' '};
      });
    }
    if (place.length < 5) {
      setError((prev) => {
        return {...prev, place: 'Place must be 5 character'};
      });
    } else {
      setError((prev) => {
        return {...prev, place: ' '};
      });
    }
    if (error.title == ' ') {
      if (error.desc == ' ') {
        if (error.place == ' ') {
          console.log('hj');
          // console.log(error);
          console.log(error.title.length);
          console.log(error.desc.length);
          console.log(error.place.length);

          console.log('if block', error.title);
          // console.log(place, title, description);
          dispatch(addTaskNow(title, description, place, category, tokenId));
          console.log('The state for loading is ', loading);
        }
      }
    }
  };
  if (categories.length != 10) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: COLORS.lightcolor}}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightcolor,
          marginVertical: 10,
        }}>
        <ViewContainer>
          <Input
            label="What's Up ! "
            labelStyle={styles.label}
            returnKeyType={'next'}
            // returnKeyType={!error.desc && !error.place ? 'next' : 'done'}
            blurOnSubmit={false}
            value={title}
            onChangeText={(text) => setTitle(text)}
            theme={{
              colors: {
                primary: COLORS.lightblack,
                underlineColor: 'transparent',
              },
            }}
            onSubmitEditing={() => {
              {
                !error.desc && !error.title && SecondInput.focus();
              }
            }}
            style={{
              borderColor: 'red',
              color: COLORS.grey,
              backgroundColor: COLORS.lightcolor,
            }}
            placeholder="Simple Like :  I watch movie !"
            // errorMessage={`${error.title}`}
            // errorStyle={styles.errorS}
          />
          <Animatable.Text
            animation="bounce"
            easing="ease-out"
            iterationCount={2}
            style={styles.errorS}>
            {error.title}
          </Animatable.Text>

          {/* <Text style={styles.errorS}>ahsdksa</Text> */}
          <Input
            labelStyle={styles.label}
            keyboardType="default"
            ref={(x) => {
              SecondInput = x;
            }}
            label="A bit More . ?"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              ThirdInput.focus();
            }}
            returnKeyType="next"
            multiline={true}
            numberOfLines={3}
            blurOnSubmit={true}
            value={description}
            onChangeText={(text) => setDescription(text)}
            theme={{
              colors: {
                primary: COLORS.lightblack,
                underlineColor: 'transparent',
              },
            }}
            style={{
              borderColor: 'red',
              color: COLORS.grey,
              backgroundColor: COLORS.lightcolor,
            }}
            placeholder="for eg : What thing you liked in that movie,book etc ?"
          />
          <Animatable.Text
            animation="bounce"
            easing="ease-out"
            iterationCount={2}
            style={styles.errorS}>
            {error.desc}
          </Animatable.Text>
          <Input
            labelStyle={styles.label}
            ref={(x) => {
              ThirdInput = x;
            }}
            label="Where did you found it ?"
            value={place}
            onChangeText={(text) => setPlace(text)}
            theme={{
              colors: {primary: COLORS.lightblack},
            }}
            style={{
              borderColor: 'red',
              color: COLORS.grey,
              backgroundColor: COLORS.lightcolor,
            }}
            placeholder="A netflix"
          />
          <Animatable.Text
            animation="bounce"
            easing="ease-out"
            iterationCount={2}
            style={styles.errorS}>
            {error.place}
          </Animatable.Text>
          <Spacer />
          <Spacer />
          <FlatList
            horizontal={true}
            data={categories}
            keyExtractor={(item) => item.name.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  handleSetCategory(item);
                }}>
                <View
                  style={[
                    styles.item,
                    category === item._id && {
                      borderWidth: 1,
                      backgroundColor: COLORS.lightcolor,
                    },
                  ]}>
                  {category === item._id && (
                    <Animatable.View animation="bounceIn">
                      <Icon
                        name="check"
                        size={23}
                        color={COLORS.black}
                        style={{
                          alignSelf: 'center',
                          paddingHorizontal: 1,
                          marginTop: 5,
                        }}
                      />
                    </Animatable.View>
                  )}
                  <Text style={styles.catText}>{item.name}</Text>
                  <Image
                    style={styles.iconImg}
                    source={images[`${item.name}`]}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Button
              title=" Save"
              titleStyle={{
                fontSize: 17,
              }}
              buttonStyle={{
                width: DEVICESIZE.width * 0.7,
                backgroundColor: COLORS.primarycolor,
                borderRadius: 20,
                paddingVertical: 10,
              }}
              onPress={() => handleSubmit()}
              icon={<Icon name="send" size={20} color="white" />}
            />
          </View>
        </ViewContainer>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginRight: 10,
    marginBottom: 10,
  },
  catText: {
    fontSize: 13,
    alignSelf: 'center',
    color: COLORS.black,
    fontWeight: 'bold',
  },
  iconImg: {
    width: 35,
    marginLeft: 2,
    height: 35,
  },
  label: {
    color: COLORS.lightblack,
    marginBottom: -7,
    fontSize: 13,
  },
  errorS: {
    color: 'red',
    fontSize: 15,
    marginTop: -20,
    marginBottom: 10,
    textAlign: 'center',
  },
});
