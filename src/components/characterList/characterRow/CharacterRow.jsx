import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TextField, Checkbox } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import RollDiceButton from '../../rollDiceButton/RollDiceButton';
import Surprises from './surprises/Surprises';
import SurprisedBy from './surprisedBy/SurprisedBy';

/**
 * A row containing the data for a character.
 * @return {React.Component}
 */
const CharacterRow = ({ character, characters, order, onUpdate, onInitiativeRollClick, onRemoveCharacterClick }) => {
  const handleStatChange = name => value => onUpdate({ [name]: value });

  const handleCharacterChange = name => (event) => {
    onUpdate({ [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  };

  return (
    <>
      <TableRow>
        {/* Order */}
        <TableCell>
          {order}
        </TableCell>
        {/* Name */}
        <TableCell>
          <TextField
            value={character.name}
            onChange={handleCharacterChange('name')}
          />
        </TableCell>
        {/* Vida */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.hp}
            onStatChange={handleStatChange('hp')}
          />
        </TableCell>
        {/* Cansancio */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.fatigue}
            onStatChange={handleStatChange('fatigue')}
          />
        </TableCell>
        {/* Ki */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.ki}
            onStatChange={handleStatChange('ki')}
          />
        </TableCell>
        {/* Xeon */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.xeon}
            onStatChange={handleStatChange('xeon')}
          />
        </TableCell>
        {/* CV */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.cv}
            onStatChange={handleStatChange('cv')}
          />
        </TableCell>
        {/* Natura */}
        <TableCell>
          <TextField
            value={character.natura}
            onChange={handleCharacterChange('natura')}
          />
        </TableCell>
        {/* Notas */}
        <TableCell>
          TODO notes
        </TableCell>
        {/* TotalInitiative */}
        <TableCell>
          {character.totalInitiative}
        </TableCell>
        {/* InitiativeRoll */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.initiativeRoll}
            onStatChange={handleStatChange('initiativeRoll')}
          />
        </TableCell>
        {/* BaseInitiative */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.baseInitiative}
            onStatChange={handleStatChange('baseInitiative')}
          />
        </TableCell>
        {/* InitiativeFumble */}
        <TableCell>
          <CharacterStatInput
            initialStatValue={character.initiativeFumble}
            onStatChange={handleStatChange('initiativeFumble')}
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
        {/* Surprised by */}
        <TableCell>
          <SurprisedBy
            character={character}
            otherCharacters={characters.filter(char => char.uid !== character.uid)}
          />
        </TableCell>
        {/* Surprises */}
        <TableCell>
          <Surprises
            character={character}
            otherCharacters={characters.filter(char => char.uid !== character.uid)}
          />
        </TableCell>
        {/* RollInitiativeButton */}
        <TableCell>
          <RollDiceButton onClick={onInitiativeRollClick} />
        </TableCell>
        {/* RemoveCharacter */}
        <TableCell>
          <IconButton aria-label="Delete" color="secondary" onClick={onRemoveCharacterClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

const characterShape = PropTypes.shape({
  name: PropTypes.string,
  hp: PropTypes.number,
  fatigue: PropTypes.number,
  ki: PropTypes.number,
  xeon: PropTypes.number,
  cv: PropTypes.number,
  natura: PropTypes.string,
  notes: PropTypes.string,
  baseInitiative: PropTypes.number,
  enemy: PropTypes.bool,
  uroboros: PropTypes.bool,
  order: PropTypes.number,
  initiativeRoll: PropTypes.number,
  initiativeFumble: PropTypes.number,
  totalInitiative: PropTypes.number,
});

CharacterRow.propTypes = {
  character: characterShape.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onInitiativeRollClick: PropTypes.func.isRequired,
  onRemoveCharacterClick: PropTypes.func.isRequired,
  order: PropTypes.number.isRequired,
  characters: PropTypes.arrayOf(characterShape).isRequired,
};

export default CharacterRow;
