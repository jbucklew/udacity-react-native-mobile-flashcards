import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { saveCard } from '../utils/api';

const AddCard = (props) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { dispatch, route, navigation } = props;
  const deckName = route.params.deckName;

  const handleCreateCard = () => {
    if (question && question.length > 0 && answer && answer.length > 0) {
      const card = {
        question,
        answer
      }
      dispatch(addCard(deckName, card));

      setQuestion('');
      setAnswer('');

      navigation.goBack();

      // save card to async storage
      saveCard({ deckName, card });

    } else {
      alert('Both Question and Answer must contain values.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            maxLength={120}
            placeholder='Question'
            onChangeText={question => setQuestion(question)}
            defaultValue={question}
          />
          <TextInput
            style={styles.input}
            maxLength={120}
            placeholder='Answer'
            onChangeText={answer => setAnswer(answer)}
            defaultValue={answer}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
            }
            onPress={handleCreateCard}>
            <Text style={styles.btnTextWhite}>Create Card</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginVertical: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderRadius: Platform.OS === 'ios' ? 7 : 2,
    borderWidth: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  btnContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  iosSubmitBtn: {
    alignItems: 'center',
    backgroundColor: '#2e79ff',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 7,
    marginVertical: 10
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
  btnTextWhite: {
    color: '#fff'
  },
});

export default connect()(AddCard);
