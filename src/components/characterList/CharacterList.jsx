import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { TableCell } from '@material-ui/core';
import CharacterRow from './characterRow/CharacterRow';
import CharacterListButtonsBar from './buttonsBar/CharacterListButtonsBar';
import DiceRoller from '../../domain/diceRoller';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  tableHead: {
    whiteSpace: 'nowrap',
  },
  tableWrapper: {
    overflowX: 'auto',
    overflowY: 'auto',
  },
  table: {
    minWidth: 650,
  },
  initiativeCell: {
    background: '#F8F8F8',
  },
}));

const diceRoller = new DiceRoller();

/**
 * A list of character rows.  Used to keep track of initiative and other stats.
 * @return {React.Component}
 */
const CharacterList = ({
  characters,
  addCharacter,
  updateCharacter,
  sortCharacters,
  rollInitiativeForAll,
  removeCharacter,
}) => {
  const classes = useStyles();

  const handleNewCharacter = () => addCharacter();

  const handleRemoveCharacterClick = character => () => removeCharacter(character);

  const handleSort = () => sortCharacters(characters);

  const handleRollForAll = () => rollInitiativeForAll(characters);

  const handleCharacterUpdate = originalCharacter => changes => updateCharacter(originalCharacter, changes);

  const handleInitiativeRollClick = originalCharacter => () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    updateCharacter(originalCharacter, {
      initiativeRoll: finalResult,
      initiativeFumble: -fumbleLevel,
    });
  };

  return (
    <Paper className={classes.root}>
      <CharacterListButtonsBar
        onNewCharacter={handleNewCharacter}
        onSort={handleSort}
        onnRollAll={handleRollForAll}
      />
      <Box className={classes.tableWrapper}>
        <Table className={classes.table} size="small">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Ord.</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Enemigo</TableCell>
              <TableCell className={classes.initiativeCell}>Uroboros</TableCell>
              <TableCell className={classes.initiativeCell}>Iniciativa total</TableCell>
              <TableCell className={classes.initiativeCell}>Tirada</TableCell>
              <TableCell className={classes.initiativeCell}>Turno</TableCell>
              <TableCell className={classes.initiativeCell}>Pifia</TableCell>
              <TableCell className={classes.initiativeCell}>Sorprendido por</TableCell>
              <TableCell className={classes.initiativeCell}>Sorprende a</TableCell>
              <TableCell>Vida</TableCell>
              <TableCell>Cansancio</TableCell>
              <TableCell>Ki</TableCell>
              <TableCell>Xeon</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>Natura</TableCell>
              <TableCell>Notas</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            { characters.map((character, idx) => (
              <CharacterRow
                key={character.uid}
                order={idx + 1}
                character={character}
                characters={characters}
                onUpdate={handleCharacterUpdate(character)}
                onInitiativeRollClick={handleInitiativeRollClick(character)}
                onRemoveCharacterClick={handleRemoveCharacterClick(character)}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
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

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(characterShape).isRequired,
  addCharacter: PropTypes.func.isRequired,
  updateCharacter: PropTypes.func.isRequired,
  sortCharacters: PropTypes.func.isRequired,
  rollInitiativeForAll: PropTypes.func.isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

export default CharacterList;
