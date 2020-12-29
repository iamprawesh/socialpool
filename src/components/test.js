import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Icon as RIcon, colors} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../assets/colors';
import {NameLetter} from '../helper/NameLetter';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import KEY from '../config/keys';
import {fetchTask} from '../redux';
import Icon from 'react-native-vector-icons/Ionicons';

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
    // console.log(item.likes);
    console.log('item.likes');

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
      // console.log('=====================like');

      // console.log('userlikes[0]');
      setUserLikes([...userlikes, auth.userId]);
      // console.log(result.likes);
      const newdata = tasks.map((x) => {
        if (x._id == result.data._id) {
          return {...x, likes: [result.data.likes]};
        } else {
          return x;
        }
      });

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

      if (userlikes.length == 1 && userlikes[0].length == 0) {
        setUserLikes([]);
      } else {
        setUserLikes(
          userlikes.filter((like) => {
            return like != auth.userId;
          }),
        );
      }

      const newdata = tasks.map((x) => {
        if (x._id == result.data._id) {
          return {...x, likes: [result.data.likes]};
        } else {
          return x;
        }
      });
      dispatch(fetchTask(newdata));
    });
  };


  return (
    <View style={styles.item} elevation={10}>
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
              <Avatar
                rounded
                // title={`${NameLetter(item.createdBy.name)}`}
                size="large"
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.name}>{item.createdBy.name}</Text>
              <Text style={styles.name}>{date}</Text>
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -10,
              }}>
              {userlikes.includes(auth.userId) ? (
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
                {userlikes.length}
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
    </View>
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
