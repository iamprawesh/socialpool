import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {DEVICESIZE} from '../../../helper/DEVICESIZE';
import {COLORS} from '../../../assets/colors';
import Spacer from '../../../helper/Spacer';
import RNPickerSelect from 'react-native-picker-select';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useFetch from '../../../hooks/useFetch';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchQuizCategoryNow,
  fetchQuizQuestionsNow,
  setCategoryNow,
} from '../../../redux/quiz/quizAction';
import Loading from '../../../components/Loading';
import Axios from 'axios';

const QuizMain = ({navigation}) => {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [question, setQuestion] = React.useState('10');

  const [category, setCategory] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  // const {data, loading} = useFetch('https://opentdb.com/api_category.php');
  React.useEffect(() => {
    dispatch(fetchQuizCategoryNow());
  }, []);
  if (quiz.loading) {
    return <Loading />;
  }
  const save = () => {
    let cat_diff = '';
    if (category) {
      cat_diff = cat_diff + `&category=${category}`;
    }
    if (difficulty) {
      cat_diff = cat_diff + `&difficulty=${difficulty}`;
    }
    let url = `https://opentdb.com/api.php?amount=${question}${cat_diff}&type=multiple`;
    dispatch(setCategoryNow(category));

    dispatch(fetchQuizQuestionsNow(url));
    navigation.navigate('QuizQuestionRoute');
  };
  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: COLORS.lightcolor}}>
      <View style={styles.conatiner}>
        <View>
          <Spacer height={10} />
          <View style={styles.item}>
            <Text style={styles.text}>Number Of Questions : (1-50) </Text>
            <TextInput
              placeholder="Questions  (1-50)"
              style={styles.textField}
              keyboardType="number-pad"
              maxLength={2}
              value={`${question}`}
              onChangeText={(val) => setQuestion(val)}
              defaultValue={`${question}`}
            />
          </View>
          <Spacer height={20} />
          <View style={styles.item}>
            <Text style={styles.text}>Select category </Text>
            <View
              style={{
                borderWidth: 2,
                width: DEVICESIZE.width * 0.5,
                borderRadius: 10,
                borderColor: COLORS.secondarycolor,
              }}>
              <RNPickerSelect
                // style={styles.dropdown}
                onValueChange={(value) => setCategory(value)}
                items={quiz.qcategories}
                placeholder={{
                  label: 'Any Category',
                  value: null,
                }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
          <Spacer height={20} />

          <View style={styles.item}>
            <Text style={styles.text}>Select Level </Text>
            <View
              style={{
                borderWidth: 2,
                width: DEVICESIZE.width * 0.5,
                borderRadius: 10,
                borderColor: COLORS.secondarycolor,
              }}>
              <RNPickerSelect
                // style={styles.dropdown}
                onValueChange={(value) => setDifficulty(value)}
                items={[
                  {label: 'Easy', value: 'easy'},
                  {label: 'Medium', value: 'medium'},
                  {label: 'hard', value: 'hard'},
                ]}
                placeholder={{
                  label: 'Any Difficulty ',
                  value: null,
                }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>

          <Spacer height={DEVICESIZE.height * 0.04} />
          <PrimaryButton text={'Take Quiz'} onPressbtn={() => save()} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default QuizMain;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  item: {
    marginLeft: DEVICESIZE.width * 0.2,
    // alignSelf: 'center',
  },
  textField: {
    borderWidth: 2,
    fontSize: 20,
    width: DEVICESIZE.width * 0.3,
    // alignSelf: 'center',
    borderRadius: 10,
    borderColor: COLORS.secondarycolor,
    paddingHorizontal: 20,
  },
  dropdown: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
  text: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: COLORS.lightblack,
    marginBottom: 10,
  },
});
