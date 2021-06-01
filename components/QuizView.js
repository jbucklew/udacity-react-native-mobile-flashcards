import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import QuizResults from './QuizResults';
import QuizQuestionAnswer from './QuizQuestionAnswer';

const QuizView = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { decks, navigation, route } = props;
  const deckName = route.params.deckName;
  const questions = decks[deckName].questions;

  const viewResults = () => {
    setShowResults(true);
  }

  const handleShowNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion >= questions.length) {
      viewResults();
    } else {
      setCurrentQuestion(nextQuestion);
    }
  }

  const handleMarkCorrect = () => {
    const newScore = score + 1;
    setScore(newScore);
    handleShowNextQuestion();
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setScore(0);
  }

  const handleBackToDeck = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
        { questions.length > 0 &&
          (
            <View>
              <Text>{currentQuestion + 1} / {questions.length}</Text>
            </View>
          )
        }

      <View style={styles.flexContainer}>
        {questions.length === 0
          ? <Text>There are no questions in this deck.  Add some!</Text>
          : <>
              { showResults
                ? <QuizResults
                    score={Math.round((((score)/questions.length) * 100))}
                    handleRestartQuiz={handleRestartQuiz}
                    handleBackToDeck={handleBackToDeck}
                  />
                : <QuizQuestionAnswer
                    question={questions[currentQuestion].question}
                    answer={questions[currentQuestion].answer}
                    handleMarkCorrect={handleMarkCorrect}
                    handleShowNextQuestion={handleShowNextQuestion}
                  />
              }
            </>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
  },
  flexContainer: {
    flex: 1,
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(QuizView);
