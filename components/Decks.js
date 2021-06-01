import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

const Deck = ({ title, numCards, navigation }) => (
    <TouchableOpacity
      style={styles.deck}
      onPress={() => navigation.navigate(
        'Deck View',
        { deckName: title }
      )}>
      <Text style={styles.deckTitle}>{title}</Text>
      <Text style={styles.cardCount}>{numCards} Cards</Text>
    </TouchableOpacity>
);

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

  const renderDeck = ({ item }) => (
    <Deck
      title={decks[item].title}
      numCards={decks[item].questions.length}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      {Object.keys(decks).length > 0
        ? <FlatList
            data={Object.keys(decks)}
            renderItem={renderDeck}
            keyExtractor={item => item}
          />

        : <Text>No Decks found.</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20
  },
  deck: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    borderWidth: 1,
    fontSize: 80,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20
  },
  deckTitle: {
    fontSize: 23
  },
  cardCount: {
    color: '#aaa',
    fontSize: 20
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks);
