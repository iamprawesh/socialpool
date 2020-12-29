const Entities = require('html-entities').XmlEntities;

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../components/Loading';
import {COLORS} from '../../../assets/colors';
import {DEVICESIZE} from '../../../helper/DEVICESIZE';
import {
  clearQuestionNow,
  fetchQuizQuestionsNow,
} from '../../../redux/quiz/quizAction';
import * as Animatable from 'react-native-animatable';
import {Button, Overlay} from 'react-native-elements';
import NeedInternet from '../../../components/NeedInternet';

const QuizQuestion = ({navigation, route}) => {
  const quiz = useSelector((state) => state.quiz);
  const [question, setQuestion] = React.useState([]);
  const [result, setResult] = React.useState({
    show: false,
    correct: 0,
    incorrect: 0,
    unanswerd: 0,
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    navigation.setOptions({title: quiz.s_category});
    dispatch(fetchQuizQuestionsNow(route.params.url));
  }, []);
  function shuffles(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));
      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  }

  // if (quiz.question == undefined) {
  //   return <NeedInternet />;
  // }
  React.useEffect(() => {
    setQuestion([]);
    quiz.questons.map((item) => {
      var question = item.question;
      var x = item.incorrect_answers;
      var user_ans = '';
      var correct_answer = item.correct_answer;
      let exists = Object.values(x).includes(correct_answer);
      if (!exists) {
        x.push(item.correct_answer);
      }
      let incorrect_answers = shuffles(x);

      setQuestion((prevState) => [
        ...prevState,
        {question, incorrect_answers, correct_answer, user_ans},
      ]);
    });
  }, [quiz.questons]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clearQuestionNow());
    });
    return unsubscribe;
  }, [navigation]);

  const converttoString = (question) => {
    const entities = new Entities();
    return entities.decode(question);
  };
  if (question.length == 0) {
    return <Loading />;
  }
  if (quiz.error) {
    return <NeedInternet />;
  }

  const handleSetAnswer = (answer, qns) => {
    let r = {
      show: false,
      correct: 0,
      incorrect: 0,
      unanswerd: 0,
    };
    setResult(r);
    question.map((item) => {
      if (item.question == qns) {
        setQuestion((p) =>
          p.map((i) => {
            if (i.question == qns) {
              i.user_ans = answer;
              return i;
            } else {
              return i;
            }
          }),
        );
      }
    });
  };

  const checkAnswers = () => {
    var correct = 0;
    var incorrect = 0;
    var unanswerd = 0;
    question.map((item) => {
      if (item.correct_answer == item.user_ans) {
        correct += 1;
      } else if (item.user_ans == '') {
        unanswerd += 1;
      } else {
        incorrect += 1;
      }
    });
    var r = {
      show: true,
      correct,
      incorrect,
      unanswerd,
    };
    setResult(r);
    scroll.current.scrollTo({x: 0, y: 0, animated: true});
    // useScrollToTop(ref);
  };
  const toggleAnswer = (correct, incorrect) => {
    setResult({...result, show: !result.show});
  };
  const scroll = React.createRef();
  return (
    <ScrollView ref={scroll}>
      {question.length == 0 && <Loading />}
      <View style={{flex: 1, marginVertical:  DEVICESIZE.width*.02}}>
        {result.show && (
          <View style={styles.quizresult}>
            <Text style={{color: 'green', fontSize:  DEVICESIZE.width*.04}}>
              Correct : {result.correct}
            </Text>
            <View
              style={{
                width: DEVICESIZE.width,
                borderColor: 'green',
              }}></View>
            <Text style={{color: 'red', fontSize:  DEVICESIZE.width*.04}}>
              Incorrect : {result.incorrect}
            </Text>
            <View
              style={{
                width: DEVICESIZE.width,
                borderColor: 'red',
                // alignItems: 'center',
                // justifyContent: 'center',
              }}></View>
            <Text style={{color: 'blue', fontSize:  DEVICESIZE.width*.04}}>
              Unanswer : {result.unanswerd}
            </Text>
            <View
              style={{
                width: DEVICESIZE.width,
                borderColor: 'blue',
              }}></View>
          </View>
        )}
        {/* <Overlay isVisible={result.show} onBackdropPress={toggleAnswer}>
          <View style={styles.quizresult}>
            <Text style={{color: 'green', fontSize: 17}}>
              Correct : {result.correct}
            </Text>
            <View
              style={{
                borderWidth: 0.7,
                width: DEVICESIZE.width * 0.3,
                borderColor: 'green',
              }}></View>
            <Text style={{color: 'red', fontSize: 17}}>
              Incorrect : {result.incorrect}
            </Text>
            <View
              style={{
                borderWidth: 0.7,
                width: DEVICESIZE.width * 0.3,
                borderColor: 'red',
              }}></View>
            <Text style={{color: 'blue', fontSize: 17}}>
              Unanswer : {result.unanswerd}
            </Text>
            <View
              style={{
                borderWidth: 0.7,
                width: DEVICESIZE.width * 0.3,
                borderColor: 'blue',
              }}></View>
          </View>
        </Overlay> */}
        {/* {result.show && (
          <View style={styles.quizresult}>
            <Text style={{color: 'green', fontSize: 14}}>
              Correct : {result.correct}
            </Text>
            <Text style={{color: 'red', fontSize: 14}}>
              Incorrect : {result.incorrect}
            </Text>
            <Text style={{color: 'red', fontSize: 14}}>
              Unanswer : {result.unanswerd}
            </Text>
          </View>
        )} */}
        {/* <FlatList
        data={question}
          keyExtractor={(x) => x.question}
          renderItem={({item})=>}
        /> */}
        {question.map((qn, index) => (
          <View style={styles.questionview} key={index}>
            <View style={styles.top}>
              <View
                style={{
                  padding: 3,
                  backgroundColor: COLORS.lightcolor,
                  borderRadius: 100,
                  alignSelf: 'baseline',
                }}>
                <Text style={{fontSize:  DEVICESIZE.width*.04}}>{index + 1}</Text>
              </View>
              <Text style={styles.question}>
                {converttoString(qn.question)}
                {/* {converttoString(qn.question)} */}
              </Text>
            </View>
            <View style={styles.bottom}>
              <View style={styles.answer}>
                {qn.incorrect_answers.map((ans) => (
                  <View key={ans}>
                    <TouchableOpacity
                      style={[
                        styles.option,
                        // qn.user_ans == ans
                        //   ? {backgroundColor: COLORS.secondarycolor}

                        qn.user_ans == ans
                          ? !result.show
                            ? {
                                backgroundColor: COLORS.secondarycolor,
                              }
                            : {
                                backgroundColor: 'red',
                              }
                          : {},
                        result.show
                          ? (qn.user_ans && qn.correct_answer) == ans && {
                              backgroundColor: 'green',
                            }
                          : {},
                      ]}
                      onPress={() => handleSetAnswer(ans, qn.question)}
                      activeOpacity={0.8}>
                      {/* <Animatable.View animation="bounceIn">
                        <Icon
                          name="check-decagram"
                          // name={
                          //   result.show //if result is true means submit is clicked
                          //     ? qn.user_ans === ans // if user_selected ans is equals the option itself
                          //       ? qn.correct_answer == ans //if above is true and correct ans is tru then
                          //         ? 'check-decagram'
                          //         : // if above is true and user select wrong ans then
                          //           'close-circle'
                          //       : ''
                          //     : ''
                          // }
                          size={
                            result.show //if result is true means submit is clicked
                              ? qn.user_ans === ans // if user_selected ans is equals the option itself
                                ? qn.correct_answer == ans //if above is true and correct ans is tru then
                                  ? 25
                                  : // if above is true and user select wrong ans then
                                    25
                                : 0
                              : 0
                          }
                          color={COLORS.lightcolor}
                          style={{
                            marginLeft: DEVICESIZE.width * 0.01,
                            alignSelf: 'center',
                          }}
                        />
                      </Animatable.View> */}
                      <Text
                        style={[
                          styles.choice,
                          ans.length > 14 && {fontSize:  DEVICESIZE.width*.028},
                        ]}>
                        {ans}
                      </Text>
                    </TouchableOpacity>
                    {result.show ? ( //if result is true means submit is clicked
                      qn.user_ans === ans ? ( // if user_selected ans is equals the option itself
                        qn.correct_answer == ans ? ( //if above is true and correct ans is tru then
                          <Text style={[styles.result, {color: 'green'}]}>
                            Correct
                          </Text>
                        ) : (
                          // if above is true and user select wrong ans then
                          <Text style={[styles.result, {color: 'red'}]}>
                            Opps!
                          </Text>
                        )
                      ) : (
                        <Text></Text>
                      )
                    ) : (
                      <Text></Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
        <PrimaryButton text={'Submit'} onPressbtn={() => checkAnswers()} />
      </View>
    </ScrollView>
  );
};

export default QuizQuestion;

const styles = StyleSheet.create({
  questionview: {
    elevation: 5,
    backgroundColor: COLORS.white,
    width: DEVICESIZE.width * 0.9,
    marginLeft: DEVICESIZE.width * 0.05,
    paddingHorizontal:  DEVICESIZE.width*.02,
    paddingVertical:  DEVICESIZE.width*.04,
    marginBottom:  DEVICESIZE.width*.04,
    borderRadius: 20,
  },
  quizresult: {
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical:  DEVICESIZE.width*.03,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  top: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  question: {
    textAlign: 'center',
    fontSize:  DEVICESIZE.width*.04,
    lineHeight:  DEVICESIZE.width*.05,
    marginHorizontal:  DEVICESIZE.width*.03,
  },
  bottom: {
    borderTopWidth: 2,
    borderColor: COLORS.primarycolor,
  },
  answer: {
    marginTop:  DEVICESIZE.width*.03,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    width: DEVICESIZE.width * 0.39,
    paddingVertical:  DEVICESIZE.width*.02,
    marginHorizontal:  DEVICESIZE.width*.01,
    backgroundColor: COLORS.grey,
    marginBottom:  DEVICESIZE.width*.02,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal:  DEVICESIZE.width*.02,
  },
  choice: {
    fontSize:  DEVICESIZE.width*.033,
    color: COLORS.white,
    textAlign: 'center',
  },
  result: {
    position: 'absolute',
    bottom: 0,
    marginLeft: DEVICESIZE.width * 0.1,
    fontWeight: 'bold',
  },
});
