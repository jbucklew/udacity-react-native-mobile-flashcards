import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

const Decks = (props) => {
  const { decks, dispatch, navigation } = props;

  // react hook that can be used in place of componentDidMount()
  // get decks from async storage and update state
  useEffect(() => {
    const fetchData = async () => {
      const decks = await getDecks();
      dispatch(receiveDecks(decks));
   }
   fetchData();
  }, []);

  return (
    <View>
      <Text>Decks View</Text>
      {Object.keys(decks).length > 0
        ? Object.keys(decks).map((deckName) => {
          return (
            <TouchableOpacity
              key={deckName}
              onPress={() => navigation.navigate(
                'Deck View',
                { deckName: deckName }
              )}>
              <Text>{deckName}</Text>
              <Text>{decks[deckName].questions.length} Cards</Text>
            </TouchableOpacity>
          )
        })
        : <Text>No Decks found.</Text>
      }
    </View>
  );
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks);
