import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TextField, Checkbox, Select, OutlinedInput, MenuItem, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { actionRemoveCharacter, actionUpdateCharacter } from '../../../redux/characters/characters.actions';

import ConfirmationDialog from '../../confirmationDialog/ConfirmationDialog';
import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import Surprise from './surprise/Surprise';
import DiceRoller from '../../../domain/diceRoller';

const useStyles = makeStyles(() => ({
  name: {
    minWidth: 120,
  },
  notes: {
    minWidth: 200,
  },
  natura: {
    minWidth: 100,
    maxWidth: 300,
  },
  input: {
    fontSize: 14,
  },
  initiativeCell: {
    backgroundColor: '#F8F8F8',
  },
  naturaSelect: {
    width: '100%',
  },
}));

const diceRoller = new DiceRoller();

/**
 * A row containing the data for a character.
 * @return {React.Component}
 */
const CharacterRow = ({ characterUid, character, order, removeCharacter, updateCharacter }) => {
  const classes = useStyles();
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const handleRemoveDialogClose = () => setRemoveDialogOpen(false);

  const handleRemoveDialoOpenn = () => setRemoveDialogOpen(true);

  const handleStatChange = name => value => updateCharacter(character, { [name]: value });

  const handleCharacterChange = name => (event) => {
    updateCharacter(
      character,
      { [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value },
    );
  };

  const handleRemoveCharacter = () => removeCharacter(character);

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
          <Surprise
            characterUid={characterUid}
            evalFunc={(char, otherChar) => (otherChar.totalInitiative - char.totalInitiative > 150)}
          />
        </TableCell>
        {/* Surprises */}
        <TableCell align="center" className={classes.initiativeCell}>
          <Surprise
            characterUid={characterUid}
            evalFunc={(char, otherChar) => (char.totalInitiative - otherChar.totalInitiative > (char.uroboros ? 100 : 150))}
          />
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
          <Select
            value={character.natura}
            onChange={(handleCharacterChange('natura'))}
            input={<OutlinedInput />}
            className={classes.naturaSelect}
          >
            <MenuItem value="Natura +0">Natura +0</MenuItem>
            <MenuItem value="Natura +5/+10">Natura +5/+10</MenuItem>
            <MenuItem value="Natura +15">Natura +15</MenuItem>
          </Select>
        </TableCell>
        {/* Notas */}
        <TableCell align="center">
          <Tooltip title={character.notes || ''} placement="top">
            <TextField
              onChange={(handleCharacterChange('notes'))}
              className={classes.notes}
              value={character.notes}
            />
          </Tooltip>
        </TableCell>
        {/* RemoveCharacter */}
        <TableCell align="center">
          <IconButton aria-label="Delete" color="secondary" onClick={handleRemoveDialoOpenn}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        open={removeDialogOpen}
        onConfirm={handleRemoveCharacter}
        onClose={handleRemoveDialogClose}
        title="Eliminar personaje"
        content={`¿Estás seguro que quieres eliminar a ${character.name}?`}
      />
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

const mapStateToProps = (state, ownProps) => {
  const char = state.characters.find(item => item.uid === ownProps.characterUid);
  return {
    character: char,
  };
};

const mapDispatchToProps = ({
  removeCharacter: actionRemoveCharacter,
  updateCharacter: actionUpdateCharacter,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  memo(CharacterRow, (prevProps, nextProps) => (
    prevProps.order === nextProps.order && isEqual(prevProps.character, nextProps.character)
  )),
);
