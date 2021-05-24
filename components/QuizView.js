import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { round } from 'react-native-reanimated';
import { connect } from 'react-redux';
import QuizResults from './QuizResults';
import QuizQuestionAnswer from './QuizQuestionAnswer';

const QuizView = (props) => {
  const { decks, navigation, route } = props;
  const deckName = route.params.deckName;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const questions = decks[deckName].questions;

  const viewResults = () => {
    setShowResults(true);
  }

  const showNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion >= questions.length) {
      viewResults();
    } else {
      setCurrentQuestion(nextQuestion);
    }
  }

  const markCorrect = () => {
    const newScore = score + 1;
    setScore(newScore);
    showNextQuestion();
  }

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setScore(0);
  }

  const backToDeck = () => {
    navigation.goBack();
  }

  return (
    <View>
      { questions.length > 0 &&
      (<Text>{currentQuestion + 1} / {questions.length}</Text>)
      }
      <Text>Quiz View</Text>
      {questions.length === 0
        ? <Text>There are no questions in this deck.  Add some!</Text>
        : <>
            { showResults
              ? <QuizResults
                  score={Math.round((((score)/questions.length) * 100))}
                  restartQuiz={restartQuiz}
                  backToDeck={backToDeck}
                />
              : <QuizQuestionAnswer
                  question={questions[currentQuestion].question}
                  answer={questions[currentQuestion].answer}
                  markCorrect={markCorrect}
                  showNextQuestion={showNextQuestion}
                />
            }
          </>
      }
    </View>
  );
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(QuizView);
