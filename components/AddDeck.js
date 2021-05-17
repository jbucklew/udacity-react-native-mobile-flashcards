import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';

const AddDeck = (props) => {
  const { dispatch, navigation } = props;
  const [deckName, setDeckName] = useState('');

  const toHome = () => {
    navigation.navigate('Decks');
  }

  const onPress = () => {
    dispatch(addDeck(deckName));

    setDeckName('');

    toHome();

//     saveDeck({ deckName });
  };

  return (
    <View>
      <Text>Add Deck</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder='Deck Name'
        onChangeText={deckName => setDeckName(deckName)}
        defaultValue={deckName}
      />
      <TouchableOpacity
        onPress={onPress}>
        <Text>Add Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

export default connect()(AddDeck);
