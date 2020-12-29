import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  NativeModules,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
// import {ListItem} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {Icon as ELEMENTICON, Text, Input} from 'react-native-elements';
import TaskItem from '../../components/TaskItem';
import {DEVICESIZE} from '../../helper/DEVICESIZE';
import ImagePicker from 'react-native-image-picker';
import KEY from '../../config/keys';
import {NameLetter} from '../../helper/NameLetter';
import Axios from 'axios';
import Snackbar from 'react-native-snackbar';
// import ImagePicker from 'react-native-image-crop-picker';
import NoFound from '../../assets/images/nopost.svg';
import {updatestatus} from '../../redux';
import LinearGradient from 'react-native-linear-gradient';
import Spacer from '../../helper/Spacer';

import UpdateStatus from '../../components/UpdateStatus';
import { formatDate } from '../../helper/Formatdate';
// var ImagePicker = NativeModules.ImageCropPicker;
const UserProfile = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState([]);
  const [image, setImage] = React.useState('');
  const [status, setStatus] = React.useState([]);
  const [showupdate, setShowUpdate] = React.useState(false);
  const tasks = useSelector((state) => state.task.tasks);
  const [userPosts, setUserPosts] = React.useState([]);
  const auth = useSelector((state) => state.auth);
  const tokenId = useSelector((state) => state.auth.token);
  const [randomColor, setRandomColor] = React.useState(
    `${COLORS.primarycolor}`,
  );
  React.useEffect(() => {
    const usertasks = tasks.filter(
      (item) => item.createdBy._id == route.params._id,
    );
    setUserPosts(usertasks);

    auth.users.map((item) => {
      if (item._id == route.params._id) {
        setUser(item);
        setStatus(item.status);
        setImage(item.pic);
      }
    });
  }, []);
  console.log(auth);
  console.log('auth');

  const options = {
    title: 'Select Profile Image',
    // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const imagepicker = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    //   cropperCircleOverlay: true,
    // })
    //   .then((img) => {
    //     let filename = img.path.split('/').pop();
    //     let source = {
    //       type: img.mime,
    //       name: filename,
    //       uri: img.path.replace(`/${filename}`, ''),
    //     };
    //     console.log(img);
    //     setImage(img.path);
    //     const data = new FormData();
    //     data.append('file', source);
    //     data.append('upload_preset', 'insta-clone');
    //     data.append('cloud_name', 'dxg62sdjk');
    //     console.log(data);
    //     // data.append('upload_preset', 'socialsharer');
    //     // data.append('cloud_name', 'dxg62sdjk');
    //     // Axios.post('https://api.cloudinary.com/v1_1/dxg62sdjk/image/upload', {
    //     //   data,
    //     // })
    //     //   .then((data) => console.log(data))
    //     //   .catch((err) => {
    //     //     console.log(err);
    //     //     console.log('error in axios post in cloudanry');
    //     //   });
    //     fetch('	https://api.cloudinary.com/v1_1/dxg62sdjk/image/upload', {
    //       method: 'post',
    //       body: data,
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         setUrl(data.url);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response);
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = {
          uri,
          type,
          name,
        };
        // console.log('Image ', source);

        setImage(source.uri);
        cloudinaryUpload(source);
      }
    });
  };
  const cloudinaryUpload = async (photo) => {
    const y = new FormData();
    y.append('file', photo);
    y.append('upload_preset', 'insta-clone');
    y.append('cloud_name', 'dxg62sdjk');
    // y.append('upload_preset', 'socialsharer');
    // y.append('cloud_name', 'dxg62sdjk');
    // data.append('upload_preset', 'ogcodes')
    // data.append("cloud_name", "ogcodes")

    // Axios({
    //   method: 'POST',
    //   url: 'http://api.cloudinary.com/v1_1/dxg62sdjk/image/upload',
    //   data: y,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // })
    try {
      let x = await Axios.post(
        'https://api.cloudinary.com/v1_1/dxg62sdjk/image/upload',
        y,
      );
    } catch (error) {
      console.log(error);
    }
    // Axios.post('http://api.cloudinary.com/v1_1/dxg62sdjk/image/upload', y)
    // .then((x) => {
    // console.log(x);
    // setPhoto(data.secure_url);
    // })
    // .catch((err) => {
    // console.log(err.response.data);
    // console.log(err);
    // Alert.alert('An Error Occured While Uploading');
    // });
  };
  const getRandomColor = () => {
    return setRandomColor(
      'rgb(' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ')',
    );
  };
  if(!user.name){
    return <Text></Text>
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <TouchableOpacity activeOpacity={0.9} onPress={() => getRandomColor()}> */}
        <View style={[styles.header, {backgroundColor: COLORS.lightblack}]}>
          <View style={styles.biotext}>
            <View>
              {image ? (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `${image}`,
                    // 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                  }}
                />
              ) : (
                <View
                  style={[
                    styles.avatar,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 55,
                      fontWeight: 'bold',
                      color: COLORS.white,
                    }}>
                    {NameLetter(user.name)}
                  </Text>
                </View>
              )}
              {route.params._id == auth.userId && (
                <View style={styles.icons}>
                  <ELEMENTICON
                    raised
                    size={18}
                    name="pencil"
                    type="octicon"
                    color={COLORS.lightblack}
                    onPress={() => imagepicker()}
                  />
                </View>
              )}
            </View>
            <View style={styles.bio}>
              <Spacer height={9} />
              <Text style={[styles.name, {fontSize: 20}]}>{user.name}</Text>
              <Text style={styles.name}>Status : {auth.status}</Text>
              {/* <Text style={styles.name}>Joined at : {user.createdAt}</Text> */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setShowUpdate(true);
                }}>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  colors={['#E55D87', '#5FC3E4']}
                  style={styles.updatebutton}>
                  <Text>Update Status</Text>
                </LinearGradient>
              </TouchableOpacity>

              <UpdateStatus
                status={status}
                onChangeStatus={(val) => setStatus(val)}
                val={showupdate}
                onSave={() => {
                  dispatch(updatestatus(auth.userId, status, tokenId));

                  setShowUpdate(!showupdate);
                }}
                onCancel={() => {
                  setShowUpdate(!showupdate);
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={styles.body}>
            {userPosts.length == 0 && (
              <View style={styles.notask}>
                <Text style={styles.info}>No Posts</Text>
                <NoFound width={200} height={200} />
                {route.params._id == auth.userId ? (
                  <View>
                    <Spacer height={20} />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate('CreateScreen');
                      }}>
                      <LinearGradient
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
                        colors={['#5FC3E4', '#E55D87']}
                        style={[styles.updatebutton, {paddingHorizontal: 30}]}>
                        <Text style={{fontSize: 30, color: COLORS.white}}>
                          Create Post
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.info}>Your Friend has not Post </Text>
                  </View>
                )}
              </View>
            )}
            {userPosts.map((item, i) => (
              <View key={i}>
                <TaskItem item={item} />
              </View>
            ))}
          </View>
        </View>
        {/* </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
  },
  updatebutton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 40,
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: DEVICESIZE.height * 0.3,
  },
  notask: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  biotext: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icons: {
    position: 'absolute',
    marginTop: 80,
    marginLeft: 55,
  },
  avatar: {
    marginTop: 20,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: COLORS.white,
    marginBottom: 10,
  },
  name: {
    width: 200,
    textTransform: 'capitalize',
    fontSize: 14,
    color: COLORS.lightcolor,
    fontWeight: '800',
  },
  body: {
    marginTop: 40,
  },
  info: {
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    // color: COLORS.lightblack,
  },
  bio: {
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
});
