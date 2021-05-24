import AsyncStorage from '@react-native-async-storage/async-storage';

export const DECKS_STORAGE_KEY = 'UdaciFlashcards:decks';


export const getDecks = async () => {
  try {
    // TODO: remove after testing
    // clear async storage
    // await AsyncStorage.removeItem(DECKS_STORAGE_KEY);

    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    console.log('api getDecks initial decks');
    console.log(decks);
    if (decks === null || Object.keys(decks).includes('undefined')) {
      console.log('api getDecks returning null');
      return null;
    }
    console.log('api getDecks return JSON');
    return JSON.parse(decks);
    // return decks !== null && decks !== undefined ? JSON.parse(decks) : null;
  } catch (e) {
    // error reading value
    console.log('returning error');
    console.log(e);
    return null;
  }
}

export const saveDeck = async ({ deckName }) => {
  console.log('saving deck with name');
  console.log(deckName);

  try {
    let decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    let data = JSON.parse(decks);
    data = {
      ...data,
      [deckName]: {
        title: deckName,
        questions: []
      }
    }
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));

    decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (decks !== null) {
      const data = JSON.parse(decks);
      console.log('async storage after adding deck');
      console.log(JSON.stringify(data));
    }
  } catch (e) {
    alert(`Error: ${e}`);
  }
}

export const removeDeck = async ({ deckName }) => {
  console.log(`api deleting deck ${deckName}`);
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const data = JSON.parse(decks);
    data[key] = undefined;
    delete data[key];

    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));

    decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (decks !== null) {
      const data = JSON.parse(decks);
      console.log('async storage after deleting deck');
      console.log(JSON.stringify(data));
    }
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

export const saveCard = async ({ deckName, card }) => {
  console.log('saveCard deckName')
  console.log(deckName);
  console.log('card');
  console.log(card);
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (decks !== null) {
    const data = JSON.parse(decks);
    data[deckName].questions.push(card);
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));

    const decksAfter = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    console.log('async storage after saveCard');
    console.log(decksAfter);
  }
}
