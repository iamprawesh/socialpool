const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/images/welcoe-r.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/images/hoe-r.png'),
    backgroundColor: 'red',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../assets/images/quiz.png'),
    backgroundColor: '#22bcb5',
  },
];
import AppIntroSlider from 'react-native-app-intro-slider';
import image1 from '../../assets/images/how.svg';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSlides: true,
    };
  }
  renderSlide = ({item}) => {
    return (
      <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <Image source={item.image} style={styles.image} />
        </View>

        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({showSlides: false});
  };
  render() {
    if (!this.state.showSlides) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>You are Home!!</Text>
        </View>
      );
    } else {
      return (
        <AppIntroSlider
          showSkipButton
          renderItem={this.renderSlide}
          data={slides}
          onDone={this.onDone}
        />
      );
    }
  }
}

export default About;

const styles = StyleSheet.create({
  image: {
    width: null,
    height: 250,
    resizeMode: 'contain',
  },
  slide: {
    flex: 1,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
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
    fontSize: 16,
  },
});
