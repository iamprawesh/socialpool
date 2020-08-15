import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
// import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../assets/colors';
import {NameLetter} from '../../helper/NameLetter';

const AllUsers = ({navigation}) => {
  const [randomColor, setRandomColor] = React.useState('');
  const {users} = useSelector((state) => state.auth);
  // const random = Math.floor(Math.random() * ColorCode.length);

  const ColorCode = (i) => {
    'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')';
  };
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
  const getRandomColor = () => {
    return setRandomColor(
      'rgb(' +
        Math.floor(Math.random() * 250) +
        ',' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ')',
    );
  };
  return (
    <View>
      {users.map((item, i) => (
        <ListItem
          key={i}
          onPress={() => {
            navigation.navigate('Profile', {_id: item._id});
          }}
          rightTitleStyle={{fontWeight: 'bold'}}
          leftElement={
            <View>
              {/* <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}
              /> */}
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
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: `${ColorCode(i)}`,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 55,
                      fontWeight: 'bold',
                      color: COLORS.white,
                    }}>
                    {NameLetter(item.name)}
                  </Text>
                </View>
              )}
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
