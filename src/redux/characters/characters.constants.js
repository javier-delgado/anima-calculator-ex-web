export const ADD_CHARACTER = 'ADD_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const UPDATE_CHARACTER = 'UPDATE_CHARACTER';
export const SORT_CHARACTERS = 'SORT_CHARACTERS';
export const ROLL_INITIATIVE_FOR_ALL = 'ROLL_INITIATIVE_FOR_ALL';
export const REPLACE_CHARACTERS = 'REPLACE_CHARACTERS';
export const CLEAR_CURRENT_PARTY = 'CLEAR_CURRENT_PARTY';
export const EMPTY_CHARACTER = {
  uid: Date.now(),
  name: '',
  hp: 0,
  fatigue: 0,
  ki: 0,
  zeon: 0,
  cv: 0,
  natura: 'Natura +5/+10',
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
