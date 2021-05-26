import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { clearLocalNotifications, setLocalNotification } from '../utils/notification';

const QuizResults = (props) => {
  const { score, restartQuiz, backToDeck } = props;

  // TODO: when quiz complete, if NOTIFICATION hasn't been sent today
  // clear todays notification and set for tomorrow.
  // from UdaciFitness
  useEffect(() => {
    console.log('clearing local notification for today');
    clearLocalNotifications()
      .then(setLocalNotification());
  });

  return (
    <View>
      <Text>Quiz Complete!</Text>
      <Text>You got {score}% correct!</Text>
      <TouchableOpacity
        onPress={restartQuiz}>
        <Text>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={backToDeck}>
        <Text>Back To Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

export default QuizResults;
