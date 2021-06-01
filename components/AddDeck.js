import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';

const AddDeck = (props) => {
  const [deckName, setDeckName] = useState('');
  const { dispatch, navigation, deckNames } = props;

  const toHome = () => {
    navigation.navigate('Deck View', { deckName });
  }

  const handleCreateDeck = () => {
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
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            placeholder='Deck Name'
            onChangeText={deckName => setDeckName(deckName)}
            defaultValue={deckName}
          />
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={Platform.OS === 'ios'
            ? styles.iosSubmitBtn
            : styles.androidSubmitBtn
          }
          onPress={handleCreateDeck}>
          <Text style={styles.btnTextWhite}>Create Deck</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 35,
    paddingBottom: 10,
    paddingTop: 20
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    height: 40,
    marginVertical: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderRadius: Platform.OS === 'ios' ? 7 : 2,
    borderWidth: 1,
  },
  iosSubmitBtn: {
    alignItems: 'center',
    backgroundColor: '#2e79ff',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 7,
    marginVertical: 10
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
  btnTextWhite: {
    color: '#fff'
  },
});

function mapStateToProps(decks) {
  return {
    deckNames: Object.keys(decks)
  }
}

export default connect(mapStateToProps)(AddDeck);
