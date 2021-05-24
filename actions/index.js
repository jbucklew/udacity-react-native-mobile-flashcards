export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    name: deck
  }
}

export function removeDeck(deckName) {
  console.log(`action removeDeckname ${deckName}`);
  return {
    type: REMOVE_DECK,
    deckName
  }
}

export function addCard(deckName, card) {
  return {
    type: ADD_CARD,
    deckName,
    card
  }
}
