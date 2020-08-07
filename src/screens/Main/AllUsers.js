import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
// import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import {useSelector, useDispatch} from 'react-redux';

const AllUsers = ({navigation}) => {
  const {users} = useSelector((state) => state.auth);
  const list = [
    {
      name: 'Amy Farha',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
  ];

  console.log(users.length);
  return (
    <View>
      {users.map((item, i) => (
        <ListItem
          key={i}
          onPress={() => {
            navigation.navigate('Profile', {_id: item._id});
            console.log('hjgjjg');
          }}
          rightTitleStyle={{fontWeight: 'bold'}}
          leftElement={
            <View>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}
              />
            </View>
          }
          title={item.name}
          titleStyle={{
            fontSize: 20,
          }}
          // rightSubtitle={'hgsaghsgh'}
          subtitle={`${item.status}`}
          bottomDivider
          // checkmark={true}
          // chevron={true}
          topDivider
          // pad={29}
        />
      ))}
    </View>
  );
};

export default AllUsers;

const styles = StyleSheet.create({
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});
