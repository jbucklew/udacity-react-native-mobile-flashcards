import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuizQuestionAnswer = (props) => {
  const { question, answer, handleMarkCorrect, handleShowNextQuestion } = props;
  const [showQuestion, setShowQuestion] = useState(true);

  const handleToggleQuestionAnswer = () => {
    setShowQuestion(!showQuestion);
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        { showQuestion
          ? <View style={styles.qaContainer}>
              <Text style={styles.qaText}>{question}</Text>
              <TouchableOpacity
                onPress={handleToggleQuestionAnswer}>
                <Text style={styles.btnTextRed}>View Answer</Text>
              </TouchableOpacity>
            </View>

          : <View style={styles.qaContainer}>
              <Text style={styles.qaText}>{answer}</Text>
              <TouchableOpacity
                onPress={handleToggleQuestionAnswer}>
                <Text style={styles.btnTextRed}>View Question</Text>
              </TouchableOpacity>
            </View>
        }
      </View>

      <View style={styles.row}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={Platform.OS === 'ios'
              ? styles.iosCorrectBtn
              : styles.androidCorrectBtn
            }
            onPress={handleMarkCorrect}>
            <Text style={styles.btnTextWhite}> Correct </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios'
              ? [styles.iosCorrectBtn, styles.iosIncorrectBtn]
              : [styles.androidCorrectBtn, styles.androidIncorrectBtn]
            }
            onPress={handleShowNextQuestion}>
            <Text style={styles.btnTextWhite}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    // justifyContent: 'space-around',
    // borderWidth: 1,
    // borderColor: 'black'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  btnContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: 'green'
  },
  qaContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iosCorrectBtn: {
    alignItems: 'center',
    backgroundColor: '#008744',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 7,
    marginVertical: 10
  },
  iosIncorrectBtn: {
    backgroundColor: '#cd0000'
  },
  androidBtn: {
    backgroundColor: '#008744',
    paddingVertical: 10,
    paddingHorizontal: 60,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidIncorrectBtn: {
    backgroundColor: '#cd0000'
  },
  btnTextWhite: {
    color: '#fff'
  },
  qaText: {
    fontSize: 35,
    paddingBottom: 10,
    paddingTop: 20
  },
  btnTextRed: {
    color: '#cd0000'
  }
});

export default QuizQuestionAnswer;
