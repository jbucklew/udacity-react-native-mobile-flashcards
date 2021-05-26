import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeDeck } from '../actions';
import { deleteDeck } from '../utils/api';

const DeckView = (props) => {
  const { navigation, route, dispatch, decks } = props;
  const deckName = route.params.deckName;

  const handleAddCard = () => {
    navigation.navigate(
      'Add Card',
      { deckName: deckName }
    );
  }

  const handleStartQuiz = () => {
    navigation.navigate(
      'Quiz View',
      { deckName }
    );
  }

  const handleDeleteDeck = () => {
    // delete deck from async storage
    deleteDeck({ deckName });

    dispatch(removeDeck(deckName));

    navigation.navigate('Decks');

  }

  return (
    <View>
      { deckName in decks && (<>
      <Text>Deck View {deckName}</Text>
      <Text>{decks[deckName].questions.length} Cards</Text>
      <TouchableOpacity onPress={handleAddCard}>
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleStartQuiz}>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteDeck}>
        <Text>Delete Deck</Text>
      </TouchableOpacity>
      </>)}
    </View>
  );
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckView);
