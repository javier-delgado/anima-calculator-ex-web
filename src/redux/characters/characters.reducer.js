import { ADD_CHARACTER,
  UPDATE_CHARACTER,
  SORT_CHARACTERS,
  ROLL_INITIATIVE_FOR_ALL,
  REMOVE_CHARACTER } from './characters.constants';

const EMPTY_CHARACTER = {
  uid: Date.now(),
  name: '',
  hp: 0,
  fatigue: 0,
  ki: 0,
  xeon: 0,
  cv: 0,
  natura: '',
  notes: '',
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
    default:
      return state;
  }
};

export default charactersReducer;
