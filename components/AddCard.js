import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { saveCard } from '../utils/api';

const AddCard = (props) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { dispatch, route, navigation } = props;
  const deckName = route.params.deckName;

  const createCard = () => {
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
    <View>
      <Text>Add Card</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder='Question'
        onChangeText={question => setQuestion(question)}
        defaultValue={question}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Answer'
        onChangeText={answer => setAnswer(answer)}
        defaultValue={answer}
      />
      <TouchableOpacity
        onPress={createCard}>
        <Text>Create Card</Text>
      </TouchableOpacity>
    </View>
  );
}

export default connect()(AddCard);
