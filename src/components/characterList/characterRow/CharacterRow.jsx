import React, {useState} from 'react';
import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import RollDiceButton from '../../rollDiceButton/RollDiceButton';
import SurpriseDetail from './surpriseDetail/SurpriseDetail';
import {TableRow, TableCell, TextField, Checkbox} from '@material-ui/core';

/**
 * A row containing the data for a character.
 * @return {React.Component}
 */
const CharacterRow = () => {
  const [character, setCharacter] = useState({
    name: '',
    baseInitiative: 0,
    enemy: false,
    uroboros: false,
  });
  const [initiativeData, setInitiativeData] = useState({
    order: 1,
    initiativeRoll: 0,
    initiativeFumble: 0,
    surprise: {todo: 'think of the structure here'},
  });

  const handleStatChange = (whichState, name) => (value) => {
    console.log(value);
    if (whichState === 'character') {
      setCharacter({...character, [name]: value});
    } else if (whichState === 'initiativeData') {
      setInitiativeData({...initiativeData, [name]: value});
    }
  };

  const handleCharacterChange = (name) => (event) => {
    setCharacter({...character,
      [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value});
  };

  const totalInitiative = () => {
    return character.baseInitiative + initiativeData.initiativeRoll - initiativeData.initiativeFumble;
  };

  return (
    <>
      <TableRow>
        <TableCell> {/* Order */}
          {initiativeData.order}
        </TableCell>
        <TableCell> {/* Name */}
          <TextField value={character.name}
            onChange={handleCharacterChange('name')}/>
        </TableCell>
        <TableCell> {/* TotalInitiative */}
          {totalInitiative()}
        </TableCell>
        <TableCell> {/* InitiativeRoll */}
          <CharacterStatInput initialStatValue={initiativeData.initiativeRoll}
            onStatChange={handleStatChange('initiativeData', 'initiativeRoll')}/>
        </TableCell>
        <TableCell> {/* BaseInitiative */}
          <CharacterStatInput initialStatValue={character.baseInitiative}
            onStatChange={handleStatChange('character', 'baseInitiative')}/>
        </TableCell>
        <TableCell> {/* InitiativeFumble */}
          <CharacterStatInput initialStatValue={initiativeData.initiativeFumble}
            onStatChange={handleStatChange('initiativeData', 'initiativeFumble')}/>
        </TableCell>
        <TableCell> {/* Enemy */}
          <Checkbox checked={character.enemy}
            onChange={handleCharacterChange('enemy')}/>
        </TableCell>
        <TableCell> {/* Uroboros */}
          <Checkbox checked={character.uroboros}
            onChange={handleCharacterChange('uroboros')}/>
        </TableCell>
        <TableCell> {/* Surprise */}
          <SurpriseDetail />
        </TableCell>
        <TableCell> {/* RollInitiativeButton */}
          <RollDiceButton />
        </TableCell>
      </TableRow>
    </>
  );
};

export default CharacterRow;
