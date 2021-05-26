import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';

const AddDeck = (props) => {
  const [deckName, setDeckName] = useState('');
  const { dispatch, navigation, deckNames } = props;

  const toHome = () => {
    navigation.navigate('Deck View', { deckName });
  }

  const createDeck = () => {
    if (deckName && deckName.length > 0) {
      if (deckNames.includes(deckName)) {
        alert('There is already a deck with that name.  Choose a different name.');

      } else {
        dispatch(addDeck(deckName));

        setDeckName('');

        toHome();

        // save new deck to async storage
        saveDeck({ deckName });
      }

    } else {
      alert('Deck name can not be blank');
    }
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
        onPress={createDeck}>
        <Text>Create Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

function mapStateToProps(decks) {
  return {
    deckNames: Object.keys(decks)
  }
}

export default connect(mapStateToProps)(AddDeck);
