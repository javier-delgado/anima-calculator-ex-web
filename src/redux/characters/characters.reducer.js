import { EMPTY_CHARACTER,
  ADD_CHARACTER,
  UPDATE_CHARACTER,
  SORT_CHARACTERS,
  ROLL_INITIATIVE_FOR_ALL,
  REMOVE_CHARACTER,
  REPLACE_CHARACTERS,
  CLEAR_CURRENT_PARTY } from './characters.constants';

const initialState = [{ ...EMPTY_CHARACTER }];

const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTER:
      return ([
        ...state,
        { ...EMPTY_CHARACTER, uid: Date.now() },
      ]);
    case REMOVE_CHARACTER:
      return ([
        ...state.filter(character => character.uid !== action.character.uid),
      ]);
    case UPDATE_CHARACTER:
      return ([
        ...state.map(character => (
          character.uid === action.uid ? action.updatedCharacter : character
        )),
      ]);
    case SORT_CHARACTERS:
      return action.sorted;
    case ROLL_INITIATIVE_FOR_ALL:
      return action.charactersWithNewInitiative;
    case REPLACE_CHARACTERS:
      return action.newCharacters;
    case CLEAR_CURRENT_PARTY:
      return initialState;
    default:
      return state;
  }
};

export default charactersReducer;
