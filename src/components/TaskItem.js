import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Icon as RIcon, colors} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../assets/colors';
import {NameLetter} from '../helper/NameLetter';
// need monent
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import KEY from '../config/keys';
import {fetchTask} from '../redux';
import Icon from 'react-native-vector-icons/Ionicons';
// import TimeAgo from 'react-native-timeago';
import * as Animatable from 'react-native-animatable';

const TaskItem = ({item}) => {
  const [color, setColor] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.task.tasks);
  const [userlikes, setUserLikes] = React.useState([]);
  const [date, setDate] = React.useState('');
  const dispatch = useDispatch();
  const tokenId = useSelector((state) => state.auth.token);

  React.useEffect(() => {
    setDate(
      moment(new Date(item.createdAt.toString()))
        .subtract(1, 'days')
        .calendar(),
    );
    setUserLikes(item.likes);
  }, []);
  const likeTask = () => {
    Axios.put(
      `${KEY.APIURL}/api/task/like`,
      {
        taskId: item._id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
      },
    ).then((result) => {
      const newdata = tasks.map((x) => {
        if (x._id == result.data._id) {
          return {...x, likes: result.data.likes};
        } else {
          return x;
        }
      });
      console.log(newdata);
      dispatch(fetchTask(newdata));
    });
  };

  const unlikeTask = () => {
    Axios.put(
      `${KEY.APIURL}/api/task/unlike`,
      {
        taskId: item._id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenId,
        },
      },
    ).then((result) => {
      // if (userlikes.length == 1 && userlikes[0].length == 0) {
      //   setUserLikes([]);
      //   console.log(userlikes);
      //   console.log('If ');
      // } else {
      //   setUserLikes(
      //     userlikes.filter((like) => {
      //       console.log(like);
      //       return like != auth.userId;
      //     }),
      //   );
      //   console.log(userlikes);
      //   console.log(typeof userlikes);

      //   console.log('else');
      // }

      // console.log(userlikes.length);
      // console.log('userlikes.length');
      // console.log(userlikes[0]);
      // console.log('userlikes[0]');

      // console.log(userlikes);
      const newdata = tasks.map((x) => {
        if (x._id == result.data._id) {
          return {...x, likes: result.data.likes};
        } else {
          return x;
        }
      });
      dispatch(fetchTask(newdata));
    });
  };
  console.log(item);
  return (
    <Animatable.View animation="flipInX" style={styles.item} elevation={10}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setColor(!color);
        }}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          colors={color ? ['#E55D87', '#5FC3E4'] : ['#5FC3E4', '#E55D87']}
          style={styles.linearGradient}>
          <View style={styles.top}>
            <View>
              {item.pic ? (
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                  }}
                  source={{
                    uri: `${item.pic}`,
                  }}
                />
              ) : (
                <Avatar
                  rounded
                  title={`${NameLetter(item.createdBy.name)}`}
                  size="large"
                  // source={{
                  // uri: `${item.pic}`,
                  // }}
                />
              )}
            </View>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.name}>{item.createdBy.name}</Text>
              {/* <Text style={styles.name}>{date}</Text> */}
              <Text style={styles.name}>{item.createdAt}</Text>
              {/* <TimeAgo time={item.createdAt} style={{color: '#fff'}} /> */}
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -10,
              }}>
              {item.likes.includes(auth.userId) ? (
                <Icon
                  onPress={() => unlikeTask()}
                  name="heart"
                  color="white"
                  size={37}
                />
              ) : (
                <Icon
                  onPress={() => likeTask()}
                  name="heart-outline"
                  color="white"
                  size={37}
                />
              )}
              <Text
                style={{color: COLORS.white, fontSize: 20, fontWeight: '800'}}>
                {item.likes.length}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.bottton}>
        <Text style={styles.text}>Titlte : {item.title}</Text>
        <Text style={styles.text}>A bit More : {item.description} </Text>
        <Text style={styles.text}>Found in : {item.place}</Text>
      </View>
    </Animatable.View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  item: {
    // height: 200,
    marginHorizontal: 10,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    marginBottom: 20,
  },
  linearGradient: {
    paddingHorizontal: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottton: {
    paddingLeft: 30,
  },
  name: {
    fontSize: 14,
    letterSpacing: 0.1,
    color: COLORS.white,
  },
  text: {
    paddingVertical: 13,
    fontSize: 14,
    paddingHorizontal: 10,
    // textAlign: 'center',
  },
});
