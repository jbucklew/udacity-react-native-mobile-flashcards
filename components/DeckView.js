import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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
    <View style={styles.container}>
      { deckName in decks && (<>
        <View style={styles.row}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.deckTitle}>{deckName}</Text>
            <Text style={styles.cardCount}>{decks[deckName].questions.length} Cards</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={Platform.OS === 'ios'
                ? [styles.iosSubmitBtn, styles.iosAddBtn]
                : [styles.androidSubmitBtn, styles.androidAddBtn]
              }
              onPress={handleAddCard}>
              <Text style={styles.btnTextBlack}> Add Card </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Platform.OS === 'ios'
                ? styles.iosSubmitBtn
                : styles.androidSubmitBtn
              }
              onPress={handleStartQuiz}>
              <Text style={styles.btnTextWhite}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteDeck}>
              <Text style={styles.btnTextRed}>Delete Deck</Text>
            </TouchableOpacity>
          </View>
        </View>

      </>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-around',
    padding: 20
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 35,
    paddingBottom: 10,
    paddingTop: 20
  },
  cardCount: {
    color: '#aaa',
    fontSize: 22,
    paddingBottom: 10
  },
  iosSubmitBtn: {
    alignItems: 'center',
    backgroundColor: '#2e79ff',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 7,
    marginVertical: 10
  },
  iosAddBtn: {
    backgroundColor: '#ddd',
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
  androidAddBtn: {
    backgroundColor: '#ddd',
  },
  btnContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  btnTextBlack: {
    color: '#000'
  },
  btnTextWhite: {
    color: '#fff'
  },
  btnTextRed: {
    color: '#cd0000'
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckView);
