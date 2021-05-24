import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuizResults = (props) => {
  const { score, restartQuiz, backToDeck } = props;

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
