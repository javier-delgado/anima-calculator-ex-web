import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableCell } from '@material-ui/core';
import CharacterRow from './characterRow/CharacterRow';
import CharacterListButtonsBar from './buttonsBar/CharacterListButtonsBar';
import DiceRoller from '../../domain/diceRoller';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const diceRoller = new DiceRoller();

/**
 * A list of character rows.  Used to keep track of initiative and other stats.
 * @return {React.Component}
 */
const CharacterList = ({ characters, addCharacter, updateCharacter, sortCharacters }) => {
  const classes = useStyles();

  const handleNewCharacter = () => addCharacter();

  const handleSort = () => sortCharacters();

  const handleRollForAll = () => {
    // const updatedCharacters = [];

    // characters.forEach((character) => {
    //   const { finalResult, fumbleLevel } = diceRoller.perform();
    //   updatedCharacters.push(getUpdatedCharacter(character, {
    //     initiativeRoll: finalResult, initiativeFumble: -fumbleLevel,
    //   }));
    // });

    // setCharacters(sortCharacters(updatedCharacters));
  };

  const handleInitiativeRollClick = originalCharacter => () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    updateCharacter(originalCharacter, {
      initiativeRoll: finalResult,
      initiativeFumble: -fumbleLevel,
    });
  };

  const handleCharacterUpdate = originalCharacter => changes => updateCharacter(originalCharacter.uid, changes);

  //const sortCharacters = list => list.sort((char1, char2) => -(char1.totalInitiative - char2.totalInitiative));

  return (
    <Paper className={classes.root}>
      <CharacterListButtonsBar
        onNewCharacter={handleNewCharacter}
        onSort={handleSort}
        onnRollAll={handleRollForAll}
      />
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ord.</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Iniciativa total</TableCell>
            <TableCell>Tirada</TableCell>
            <TableCell>Base</TableCell>
            <TableCell>Pifia</TableCell>
            <TableCell>Enemigo</TableCell>
            <TableCell>Uroboros</TableCell>
            <TableCell>Sorprendido por</TableCell>
            <TableCell>Sorprende a</TableCell>
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
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
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

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(characterShape).isRequired,
  addCharacter: PropTypes.func.isRequired,
  updateCharacter: PropTypes.func.isRequired,
  sortCharacters: PropTypes.func.isRequired,
};

export default CharacterList;
