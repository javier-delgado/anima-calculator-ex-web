import { ADD_CHARACTER, UPDATE_CHARACTER, SORT_CHARACTERS, ROLL_INITIATIVE_FOR_ALL } from './characters.constants';

const EMPTY_CHARACTER = {
  uid: Date.now(),
  name: '',
  baseInitiative: 0,
  enemy: false,
  uroboros: false,
  order: 1,
  initiativeRoll: 0,
  initiativeFumble: 0,
  totalInitiative: 0,
  surprise: { todo: 'think of the structure here' },
};

const initialState = [{ ...EMPTY_CHARACTER }];

const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTER:
      return ([
        ...state,
        { ...EMPTY_CHARACTER, uid: Date.now() },
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
    default:
      return state;
  }
};

export default charactersReducer;
