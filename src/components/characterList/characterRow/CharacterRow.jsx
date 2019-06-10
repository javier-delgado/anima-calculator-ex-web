import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TextField, Checkbox } from '@material-ui/core';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import RollDiceButton from '../../rollDiceButton/RollDiceButton';
import Surprises from './surprises/Surprises';
import SurprisedBy from './surprisedBy/SurprisedBy';

/**
 * A row containing the data for a character.
 * @return {React.Component}
 */
const CharacterRow = ({ character, characters, order, onUpdate, onInitiativeRollClick }) => {
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
      </TableRow>
    </>
  );
};

const characterShape = PropTypes.shape({
  name: PropTypes.string,
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
  order: PropTypes.number.isRequired,
  characters: PropTypes.arrayOf(characterShape).isRequired,
};

export default CharacterRow;
