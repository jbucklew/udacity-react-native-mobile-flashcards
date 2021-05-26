import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

const Decks = (props) => {
  const { decks, dispatch, navigation } = props;
  console.log('Decks component');
  console.log(decks);

  useEffect(() => {
    console.log('Decks Component getting inital decks from async storage');

    const fetchData = async () => {
      const decks = await getDecks();
      console.log(decks);
      dispatch(receiveDecks(decks));
   }
   fetchData();
  }, []);

  return (
    <View>
      <Text>Decks View</Text>
      <Text>{JSON.stringify(decks)}</Text>
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
