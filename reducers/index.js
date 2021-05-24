import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD
} from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }

    case ADD_DECK:
      return {
        ...state,
        [action.name]: {
          title: action.name,
          questions: []
        }
      }

    case REMOVE_DECK:
      console.log(`reducer remove deck ${action.deckName}`);
      decks = {...state};
      console.log('before');
      console.log(decks);
      delete decks[action.deckName];
      console.log('after');
      console.log(decks);
      return decks;

    case ADD_CARD:
      // TODO: remove
      // ...state is the entire state object, keys defined after will
      // replace previous ones from the spread
      console.log('reducer');
      console.log(action);
      return {
        ...state,
        [action.deckName]: {
            ...state[action.deckName],
            questions: state[action.deckName].questions.concat(action.card)
        }
      }

    default:
      return state;
  }
}

export default decks;
