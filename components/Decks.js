import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

const Decks = (props) => {
  const { decks, dispatch, navigation } = props;

  useEffect(() => {
    getDecks()
      .then((decks) => { dispatch(receiveDecks(decks)); });
  }, []);

  return (
    <View>
      <Text>Decks View</Text>
      {Object.keys(decks).length > 0
       ? Object.keys(decks).map((deck) =>{
          return (
            <Text key={deck}>{deck}</Text>
          )
         })
       : <Text>No Decks found.</Text>
      }
      <Button
        title='View Deck'
        onPress={() => navigation.navigate('Deck View')}
      />
    </View>
  );
}

function mapStateToProps (decks) {
  return {
      decks
  }
}

export default connect(mapStateToProps)(Decks);
