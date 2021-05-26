import AsyncStorage from '@react-native-async-storage/async-storage';

export const DECKS_STORAGE_KEY = 'UdaciFlashcards:decks';

// get decks from async storage
export const getDecks = async () => {
  try {
    // uncomment to clear async storage on start
    // await AsyncStorage.removeItem(DECKS_STORAGE_KEY);

    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (decks === null || Object.keys(decks).includes('undefined')) {
      return null;
    }

    // decks found, return as JSON
    return JSON.parse(decks);

  } catch (e) {
    console.log(e);
    return null;
  }
}

// save deck to async storage
export const saveDeck = async ({ deckName }) => {

  try {
    // get existing decks if any
    let decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    // add deck to existing decks
    let data = JSON.parse(decks);
    data = {
      ...data,
      [deckName]: {
        title: deckName,
        questions: []
      }
    }

    // save decks to async storage
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));

  } catch (e) {
    console.log(e);
  }
}

// delete deck from async storage
export const deleteDeck = async ({ deckName }) => {
  try {
    // get existing decks
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const data = JSON.parse(decks);

    // delete requested deck
    data[deckName] = undefined;
    delete data[deckName];

    // add remaining decks back to async storage
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));

  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

// save card to deck
export const saveCard = async ({ deckName, card }) => {
  // get decks from async storage
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

  if (decks !== null) {
    const data = JSON.parse(decks);
    data[deckName].questions.push(card);
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  }
}
