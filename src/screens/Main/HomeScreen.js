import React from 'react';
import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  signoutUser,
  getallUsers,
  getUserTasks,
} from '../../redux/auth/authAction';
import {connect} from 'react-redux';
import {COLORS} from '../../assets/colors';
import FooterNaviagtion from '../../components/FooterNaviagtion';
// import Advice from '../../components/Advice';
// import PopUpModel from '../../popUpModel/PopUpOne';
import {
  fetchCategoryNow,
  getTaskNow,
  getTaskNowFromLocal,
  fetchQuizCategoryNow,
} from '../../redux';
import {Avatar, Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/Loading';
import TaskItem from '../../components/TaskItem';
import {Button, Overlay} from 'react-native-elements';
import NeedInternet from '../../components/NeedInternet';
import {DEVICESIZE} from '../../helper/DEVICESIZE';

const HomeScreen = ({
  getTaskNow,
  tasks,
  getUserTasks,
  getallUsers,
  fetchCategoryNow,
  fetchQuizCategoryNow,
}) => {
  const error = useSelector((state) => state.task.error);
  const loading = useSelector((state) => state.task.loading);
  const [network, setNewtwork] = React.useState('loading');
  const auth = useSelector((state) => state.auth);
  NetInfo.fetch().then((state) => {
    setNewtwork(`${state.isConnected}`);
  });

  

  React.useEffect(() => {
    if (network) {
      getTaskNow();
      getallUsers(auth.userId);
      getUserTasks(auth.userId);
      fetchQuizCategoryNow();
    } else {
      getTaskNowFromLocal();
    }
    fetchCategoryNow();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <NeedInternet />;
  }
  const isHermes = () => !!global.HermesInternal;
  return (
    <View
      style={{
        flex: 1,
      }}>

        <Button title="Jjjj"></Button>
                {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
      <View style={{flex: 10, marginTop: 10}}>
        {error ? <Text>ddd</Text> : null}
          <FlatList
          // getItemLayout={(data, index) => { return {length: 33, index, offset: 33 * index} }}
          style={{flex:1}}
            data={tasks}
            ref={(ref) => { this.flatListRef = ref; }}
            keyExtractor={(x) => x._id}
            renderItem={({item}) => <TaskItem item={item} />}
          />
      </View>
      <View style={styles.footer}>
        <FooterNaviagtion />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    logindata: state.auth,
    tasks: state.task.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signoutUser: () => {
      dispatch(signoutUser());
    },
    fetchCategoryNow: () => {
      dispatch(fetchCategoryNow());
    },
    getTaskNowFromLocal: () => {
      dispatch(getTaskNowFromLocal());
    },
    getTaskNow: () => {
      dispatch(getTaskNow());
    },
    getallUsers: (userId) => {
      dispatch(getallUsers(userId));
    },
    getUserTasks: (id) => {
      dispatch(getUserTasks(id));
    },
    fetchQuizCategoryNow: () => {
      dispatch(fetchQuizCategoryNow());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  footer: {
    flex: 2,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: COLORS.lightblack,
  },
  item: {
    height: 120,
  },

  title: {
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  bottom: {
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
});
