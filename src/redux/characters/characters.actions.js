import { ADD_CHARACTER,
  UPDATE_CHARACTER,
  SORT_CHARACTERS,
  ROLL_INITIATIVE_FOR_ALL,
  REMOVE_CHARACTER } from './characters.constants';
import DiceRoller from '../../domain/diceRoller';

const diceRoller = new DiceRoller();

// <ACTIONS>
export const addCharacter = character => ({ type: ADD_CHARACTER, character });

export const removeCharacter = character => ({ type: REMOVE_CHARACTER, character });

export const updateCharacter = (character, changes) => (
  { type: UPDATE_CHARACTER, uid: character.uid, updatedCharacter: getUpdatedCharacter(character, changes) }
);

export const sortCharacters = characters => ({ type: SORT_CHARACTERS, sorted: sortCharacterList(characters) });

export const rollInitiativeForAll = characters => ({
  type: ROLL_INITIATIVE_FOR_ALL,
  charactersWithNewInitiative: sortCharacterList(
    characters.map((character) => {
      const { finalResult, fumbleLevel } = diceRoller.perform();
      return getUpdatedCharacter(character, {
        initiativeRoll: finalResult, initiativeFumble: -fumbleLevel,
      });
    }),
  ),
});
// </ACTIONS>

const getUpdatedCharacter = (character, changes) => {
  const updatedCharacter = { ...character, ...changes };
  updatedCharacter.totalInitiative = totalInitiative(updatedCharacter);
  return updatedCharacter;
};

const totalInitiative = character => character.baseInitiative
  + character.initiativeRoll + character.initiativeFumble;

const sortCharacterList = list => [...list].sort((char1, char2) => -(char1.totalInitiative - char2.totalInitiative));
