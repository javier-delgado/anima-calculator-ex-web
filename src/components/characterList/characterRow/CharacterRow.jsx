import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TextField, Checkbox } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import Surprises from './surprises/Surprises';
import SurprisedBy from './surprisedBy/SurprisedBy';
import DiceRoller from '../../../domain/diceRoller';

const useStyles = makeStyles(() => ({
  name: {
    minWidth: 120,
  },
  natura: {
    minWidth: 100,
  },
  input: {
    fontSize: 14,
  },
  initiativeCell: {
    backgroundColor: '#F8F8F8',
  },
}));

const diceRoller = new DiceRoller();

/**
 * A row containing the data for a character.
 * @return {React.Component}
 */
const CharacterRow = ({ characterUid, character, surprisedBy, surprises, order, removeCharacter, updateCharacter }) => {
  const classes = useStyles();

  // useEffect(() => {
  //   setCharacter(characters.find(element => element.uid === characterUid));
  // }, [characters]);

  useEffect(() => {
    console.log('render'+characterUid);
  });

  const handleStatChange = name => value => updateCharacter(character, { [name]: value });

  const handleCharacterChange = name => (event) => {
    updateCharacter(
      character,
      { [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value },
    );
  };

  const handleRemoveCharacterClick = () => removeCharacter(character);

  const handleInitiativeRollClick = () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    updateCharacter(character, {
      initiativeRoll: finalResult,
      initiativeFumble: -fumbleLevel,
    });
  };

  return (
    <>
      <TableRow>
        {/* Order */}
        <TableCell align="center">
          {order}
        </TableCell>
        {/* Name */}
        <TableCell align="center">
          <TextField
            className={classes.name}
            value={character.name}
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            onChange={handleCharacterChange('name')}
          />
        </TableCell>
        {/* Enemy */}
        <TableCell align="center">
          <Checkbox
            checked={character.enemy}
            onChange={handleCharacterChange('enemy')}
          />
        </TableCell>
        {/* Uroboros */}
        <TableCell align="center" className={classes.initiativeCell}>
          <Checkbox
            checked={character.uroboros}
            onChange={handleCharacterChange('uroboros')}
          />
        </TableCell>
        {/* TotalInitiative */}
        <TableCell align="center" className={classes.initiativeCell}>
          {character.totalInitiative}
        </TableCell>
        {/* InitiativeRoll */}
        <TableCell align="center" className={classes.initiativeCell}>
          <CharacterStatInput
            initialStatValue={character.initiativeRoll}
            onStatChange={handleStatChange('initiativeRoll')}
            withRollButton
            onRoll={handleInitiativeRollClick}
          />
        </TableCell>
        {/* BaseInitiative */}
        <TableCell align="center" className={classes.initiativeCell}>
          <CharacterStatInput
            initialStatValue={character.baseInitiative}
            onStatChange={handleStatChange('baseInitiative')}
          />
        </TableCell>
        {/* InitiativeFumble */}
        <TableCell align="center" className={classes.initiativeCell}>
          <CharacterStatInput
            initialStatValue={character.initiativeFumble}
            onStatChange={handleStatChange('initiativeFumble')}
          />
        </TableCell>
        {/* Surprised by */}
        <TableCell align="center" className={classes.initiativeCell}>
          {/* <SurprisedBy
            character={character}
            otherCharacters={characters.filter(char => char.uid !== character.uid)}
          /> */}
        </TableCell>
        {/* Surprises */}
        <TableCell align="center" className={classes.initiativeCell}>
          {/* <Surprises
            character={character}
            otherCharacters={characters.filter(char => char.uid !== character.uid)}
          /> */}
        </TableCell>
        {/* Vida */}
        <TableCell align="center">
          <CharacterStatInput
            initialStatValue={character.hp}
            onStatChange={handleStatChange('hp')}
          />
        </TableCell>
        {/* Cansancio */}
        <TableCell align="center">
          <CharacterStatInput
            initialStatValue={character.fatigue}
            onStatChange={handleStatChange('fatigue')}
          />
        </TableCell>
        {/* Ki */}
        <TableCell align="center">
          <CharacterStatInput
            initialStatValue={character.ki}
            onStatChange={handleStatChange('ki')}
          />
        </TableCell>
        {/* Xeon */}
        <TableCell align="center">
          <CharacterStatInput
            initialStatValue={character.xeon}
            onStatChange={handleStatChange('xeon')}
          />
        </TableCell>
        {/* CV */}
        <TableCell align="center">
          <CharacterStatInput
            initialStatValue={character.cv}
            onStatChange={handleStatChange('cv')}
          />
        </TableCell>
        {/* Natura */}
        <TableCell align="center">
          <TextField
            className={classes.natura}
            value={character.natura}
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            onChange={handleCharacterChange('natura')}
          />
        </TableCell>
        {/* Notas */}
        <TableCell align="center">
          TODO notes
        </TableCell>
        {/* RemoveCharacter */}
        <TableCell align="center">
          <IconButton aria-label="Delete" color="secondary" onClick={handleRemoveCharacterClick}>
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

CharacterRow.defaultProps = {
  order: 1,
};

CharacterRow.propTypes = {
  characterUid: PropTypes.number.isRequired,
  removeCharacter: PropTypes.func.isRequired,
  updateCharacter: PropTypes.func.isRequired,
  order: PropTypes.number,
  character: characterShape.isRequired,
};

// export default memo(CharacterRow, (prevProps, nextProps) => {
//   const prevChar = prevProps.characters.find(el => el.uid === prevProps.characterUid);
//   const nextChar = nextProps.characters.find(el => el.uid === nextProps.characterUid);
//   return prevChar === nextChar;
// });

export default memo(CharacterRow);
