import React from 'react';
import {StyleSheet, Text, View, Image,ScrollView } from 'react-native';
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
  console.log(users)
  return (
    <View>
      <ScrollView>

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
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                  }}
                  source={{
                    uri: 'https://res.cloudinary.com/dxg62sdjk/image/upload/v1590226578/default-user-image_exjw7k.png',
                  }}
                />
                //   style={{
                //     width: 100,
                //     height: 100,
                //     borderRadius: 50,
                //     backgroundColor: `${ColorCode(i)}`,
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //   }}>
                //   <Text
                //     style={{
                //       fontSize: 55,
                //       fontWeight: 'bold',
                //       color: COLORS.white,
                //     }}>
                //     {NameLetter(item.name)}
                //   </Text>
                // </View>
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
      </ScrollView>

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
