import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuizQuestionAnswer = (props) => {
  const { question, answer, markCorrect, showNextQuestion } = props;
  const [showQuestion, setShowQuestion] = useState(true);

  const toggleQuestionAnswer = () => {
    setShowQuestion(!showQuestion);
  }

  return (
    <View>
      { showQuestion
        ? <View>
            <Text>{ question }</Text>
            <TouchableOpacity
              onPress={toggleQuestionAnswer}>
              <Text>View Answer</Text>
            </TouchableOpacity>
          </View>

        : <View>
            <Text>{answer}</Text>
            <TouchableOpacity
              onPress={toggleQuestionAnswer}>
              <Text>View Question</Text>
            </TouchableOpacity>
          </View>
      }

      <TouchableOpacity
        onPress={markCorrect}>
        <Text>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={showNextQuestion}>
        <Text>Incorrect</Text>
      </TouchableOpacity>
    </View>
  );
}

export default QuizQuestionAnswer;
