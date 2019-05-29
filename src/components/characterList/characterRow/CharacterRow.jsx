import React, { useState } from 'react';
import { TableRow, TableCell, TextField, Checkbox } from '@material-ui/core';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import RollDiceButton from '../../rollDiceButton/RollDiceButton';
import SurpriseDetail from './surpriseDetail/SurpriseDetail';

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
    surprise: { todo: 'think of the structure here' },
  });

  const handleStatChange = (whichState, name) => (value) => {
    console.log(value);
    if (whichState === 'character') {
      setCharacter({ ...character, [name]: value });
    } else if (whichState === 'initiativeData') {
      setInitiativeData({ ...initiativeData, [name]: value });
    }
  };

  const handleCharacterChange = name => (event) => {
    setCharacter({
      ...character,
      [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const totalInitiative = () => character.baseInitiative + initiativeData.initiativeRoll - initiativeData.initiativeFumble;

  return (
    <>
      <TableRow>
        {/* Order */}
        <TableCell>
          {initiativeData.order}
        </TableCell>
        {/* Name */}
        <TableCell>
          <TextField
            value={character.name}
            onChange={handleCharacterChange('name')}
          />
        </TableCell>
        {/* TotalInitiative */}
        <TableCell>
          {totalInitiative()}
        </TableCell>
        {/* InitiativeRoll */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={initiativeData.initiativeRoll}
            onStatChange={handleStatChange('initiativeData', 'initiativeRoll')}
          />
        </TableCell>
        {/* BaseInitiative */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.baseInitiative}
            onStatChange={handleStatChange('character', 'baseInitiative')}
          />
        </TableCell>
        {/* InitiativeFumble */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={initiativeData.initiativeFumble}
            onStatChange={handleStatChange('initiativeData', 'initiativeFumble')}
          />
        </TableCell>
        {/* Enemy */}
        <TableCell>
          <Checkbox
            checked={character.enemy}
            onChange={handleCharacterChange('enemy')}
          />
        </TableCell>
        {/* Uroboros */}
        <TableCell>
          <Checkbox
            checked={character.uroboros}
            onChange={handleCharacterChange('uroboros')}
          />
        </TableCell>
        {/* Surprise */}
        <TableCell>
          <SurpriseDetail />
        </TableCell>
        {/* RollInitiativeButton */}
        <TableCell>
          <RollDiceButton />
        </TableCell>
      </TableRow>
    </>
  );
};

export default CharacterRow;
