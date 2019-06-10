import { ADD_CHARACTER, UPDATE_CHARACTER } from './characters.constants';

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
        ...state.characters.map(character => (
          character.uid === action.uid ? getUpdatedCharacter(character, action.changes) : character
        )),
      ]);
    default:
      return state;
  }
};

const getUpdatedCharacter = (character, changes) => {
  const updatedCharacter = { ...character, ...changes };
  updatedCharacter.totalInitiative = totalInitiative(updatedCharacter);
  return updatedCharacter;
};

const totalInitiative = character => character.baseInitiative
  + character.initiativeRoll + character.initiativeFumble;

export default charactersReducer;
