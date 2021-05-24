import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeDeck } from '../actions';

const DeckView = (props) => {
  const { navigation, route, dispatch, decks } = props;
  const deckName = route.params.deckName;
  console.log(`DeckView for deckName ${deckName}`);

  const addCard = () => {
    navigation.navigate(
      'Add Card',
      { deckName: deckName }
    );
  }

  const startQuiz = () => {
    navigation.navigate(
      'Quiz View',
      { deckName }
    );
  }

  const deleteDeck = () => {
    console.log(`deleting deck ${deckName}`);
    navigation.navigate('Decks');
    //navigation.goBack();
    dispatch(removeDeck(deckName));
    // TODO: update reducer and action to deckName from deck
    // and add api call to removeDeck
    // navigate back to deck view
  }

  return (
    <View>
      { deckName in decks && (<>
      <Text>Deck View {deckName}</Text>
      <Text>{decks[deckName].questions.length} Cards</Text>
      <TouchableOpacity onPress={addCard}>
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={startQuiz}>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteDeck}>
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
