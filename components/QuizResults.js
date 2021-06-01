import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearLocalNotifications, setLocalNotification } from '../utils/notification';

const QuizResults = (props) => {
  const { score, handleRestartQuiz, handleBackToDeck } = props;

  // clear todays notification and set for tomorrow.
  useEffect(() => {
    clearLocalNotifications()
      .then(setLocalNotification());
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Quiz Complete!</Text>
          <Text style={styles.score}>You got {score}% correct!</Text>
        </View>
      </View>


      <View style={styles.row}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={Platform.OS === 'ios'
              ? [styles.iosSubmitBtn, styles.iosAddBtn]
              : [styles.androidSubmitBtn, styles.androidAddBtn]
            }
            onPress={handleRestartQuiz}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
            }
            onPress={handleBackToDeck}>
            <Text style={styles.btnTextWhite}>Back To Deck</Text>
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
    justifyContent: 'space-around',
    padding: 20
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 35,
    paddingBottom: 10,
    paddingTop: 20
  },
  score: {
    fontSize: 30
  },
  iosSubmitBtn: {
    alignItems: 'center',
    backgroundColor: '#2e79ff',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 7,
    marginVertical: 10
  },
  iosAddBtn: {
    backgroundColor: '#ddd',
  },
  androidBtn: {
    backgroundColor: '#2e79ff',
    paddingVertical: 10,
    paddingHorizontal: 60,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidAddBtn: {
    backgroundColor: '#ddd',
  },
  btnTextWhite: {
    color: '#fff'
  },
});

export default QuizResults;
