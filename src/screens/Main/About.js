import AppIntroSlider from 'react-native-app-intro-slider';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {COLORS} from '../../assets/colors';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { DEVICESIZE } from '../../helper/DEVICESIZE';

const slides = [
  {
    key: 1,
    title: 'Welcome to Social Sharer',
    text:
      "Let's avoid boredom by \nupdating ourself with what our friends are enjoying !",
    image: require('../../assets/images/fans_r.png'),
    backgroundColor: COLORS.primarycolor,
  },
  {
    key: 2,
    title: 'How does it Work ?',
    text:
      'Make a post what are you \n enjoying  so friends could do exactly  what you did',
    image: require('../../assets/images/work-r.png'),
    backgroundColor: COLORS.primarycolor,
  },
  {
    key: 3,
    title: 'What else ! ',
    text:
      'You can even play Quiz with \n custom category with any  \n level of difficulty',
    image: require('../../assets/images/quiz.png'),
    backgroundColor: COLORS.primarycolor,
  },
];

const About = ({navigation}) => {
  const [showSlides, setshowSlides] = React.useState(true);
  React.useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: COLORS.primarycolor,
      },
      headerTintColor: '#000',
    });
  }, []);
  const renderSlide = ({item}) => {
    return (
      <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Animatable.Text
            style={styles.title}
            animation="fadeInLeft"
            easing="ease-out"
            // iterationCount="infinite"
          >
            {item.title}
          </Animatable.Text>
        </View>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="chevron-forward-circle"
          color="rgba(255, 255, 255, .9)"
          size={DEVICESIZE.width*.1}
        />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)"  size={DEVICESIZE.width*.1}
 />
      </View>
    );
  };
  const _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-play-forward-sharp"
          color="rgba(255, 255, 255, .9)"
          size={DEVICESIZE.width*.1}
        />
      </View>
    );
  };
  const onDone = () => {
    setshowSlides(false);
  };
  if (!showSlides) {
    navigation.navigate('Home');
    return <View></View>;
  } else {
    return (
      <AppIntroSlider
        showSkipButton
        renderItem={renderSlide}
        renderNextButton={_renderNextButton}
        renderDoneButton={_renderDoneButton}
        renderSkipButton={_renderSkipButton}
        data={slides}
        onDone={onDone}
      />
    );
  }
};
export default About;

const styles = StyleSheet.create({
  image: {
    height: DEVICESIZE.width*.6,
    // width: 200,
    width: null,
    // height: null,
    resizeMode: 'contain',
  },
  slide: {
    flex: 1,
  },
  buttonCircle: {
    width: DEVICESIZE.width*.17,
    height: DEVICESIZE.width*.17,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showSlides: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize:  DEVICESIZE.width*.04,
    textAlign: 'center',
    lineHeight:  DEVICESIZE.width*.065,
    color: COLORS.lightcolor,
    fontFamily: 'monospace',
  },
  title: {
    marginTop: 20,
    fontSize:  DEVICESIZE.width*.09,
    color: COLORS.white,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily: 'serif',
  },
});
