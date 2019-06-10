import { ADD_CHARACTER, UPDATE_CHARACTER } from './characters.constants';

export const addCharacter = character => ({ type: ADD_CHARACTER, character });

export const updateCharacter = (uid, changes) => ({ type: UPDATE_CHARACTER, uid, changes });

export const sortCharacters = () => ({ type: UPDATE_CHARACTER });
