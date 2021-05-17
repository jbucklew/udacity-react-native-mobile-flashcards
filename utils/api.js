import AsyncStorage from '@react-native-async-storage/async-storage';

export const DECKS_STORAGE_KEY = 'UdaciFlashcards:decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => {
      if (data) {
        return data.json();
      } else {
        return {}
      }
    });
}

export function saveDeck ({ key }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [key]: {}
  }));
}
