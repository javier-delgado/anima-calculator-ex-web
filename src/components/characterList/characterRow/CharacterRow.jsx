import React from 'react';
import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import RollDiceButton from '../../rollDiceButton/RollDiceButton';
import SurpriseDetail from './surpriseDetail/SurpriseDetail';
import {TableRow, TableCell, TextField, Checkbox} from '@material-ui/core';

/**
 * A row containing the data for a character.
 * @return {React.Component}
 */
const CharacterRow = () => {
  return (
    <>
      <TableRow>
        <TableCell>1.</TableCell> {/* Order */}
        <TableCell> {/* Name */}
          <TextField />
        </TableCell>
        <TableCell><CharacterStatInput initialStatValue={0} /></TableCell> {/* InitiativeRoll */}
        <TableCell><CharacterStatInput initialStatValue={0} /></TableCell> {/* BaseInitiative */}
        <TableCell><CharacterStatInput initialStatValue={0} /></TableCell> {/* InitiativeFumble */}
        <TableCell><Checkbox /></TableCell> {/* Enemy */}
        <TableCell><Checkbox /></TableCell> {/* Uroboros */}
        <TableCell><SurpriseDetail /></TableCell> {/* Surprise */}
        <TableCell><RollDiceButton /></TableCell> {/* RollInitiativeButton */}
      </TableRow>
    </>
  );
};

export default CharacterRow;
