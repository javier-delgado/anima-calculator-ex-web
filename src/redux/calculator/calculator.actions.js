import { UPDATE_ATTACKER_DATA, UPDATE_DEFENDER_DATA } from './calculator.constants';

// const diceRoller = new DiceRoller();

// // <ACTIONS>
// export const actionAddCharacter = character => ({ type: ADD_CHARACTER, character });

// export const actionRemoveCharacter = character => ({ type: REMOVE_CHARACTER, character });

export const actionUpdateAttackerData = changes => ({ type: UPDATE_ATTACKER_DATA, changes });

export const actionUpdateDefenderData = changes => ({ type: UPDATE_DEFENDER_DATA, changes });

// export const actionSortCharacters = characters => ({ type: SORT_CHARACTERS, sorted: sortCharacterList(characters) });

// export const actionRollInitiativeForAll = characters => ({
//   type: ROLL_INITIATIVE_FOR_ALL,
//   charactersWithNewInitiative: sortCharacterList(
//     characters.map((character) => {
//       const { finalResult, fumbleLevel } = diceRoller.perform();
//       return getUpdatedCharacter(character, {
//         initiativeRoll: finalResult, initiativeFumble: -fumbleLevel,
//       });
//     }),
//   ),
// });

// export const actionReplaceCharacters = newCharacters => ({ type: REPLACE_CHARACTERS, newCharacters });

// export const actionClearParty = () => ({ type: CLEAR_CURRENT_PARTY });
// // </ACTIONS>

// const getUpdatedCharacter = (character, changes) => {
//   const updatedCharacter = { ...character, ...changes };
//   updatedCharacter.totalInitiative = totalInitiative(updatedCharacter);
//   return updatedCharacter;
// };

// const totalInitiative = character => character.baseInitiative
//   + character.initiativeRoll + character.initiativeFumble;

// const sortCharacterList = list => [...list].sort((char1, char2) => -(char1.totalInitiative - char2.totalInitiative));
