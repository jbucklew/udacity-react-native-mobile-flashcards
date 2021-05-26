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
      decks = {...state};
      delete decks[action.deckName];
      return decks;

    case ADD_CARD:
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
