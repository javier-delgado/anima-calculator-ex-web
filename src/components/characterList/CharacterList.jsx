import React, { useState } from 'react';
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

const EMPTY_CHARACTER = {
  uid: Date.now(),
  name: '',
  baseInitiative: 0,
  enemy: false,
  uroboros: false,
  order: 1,
  initiativeRoll: 0,
  initiativeFumble: 0,
  totalInitiative: 0,
  surprise: { todo: 'think of the structure here' },
};

const diceRoller = new DiceRoller();

/**
 * A list of character rows.  Used to keep track of initiative and other stats.
 * @return {React.Component}
 */
const CharacterList = () => {
  const [characters, setCharacters] = useState([{ ...EMPTY_CHARACTER }]);

  const classes = useStyles();

  const handleNewCharacter = () => setCharacters([
    ...characters,
    { ...EMPTY_CHARACTER, uid: Date.now() },
  ]);

  const handleSort = () => setCharacters([...sortCharacters(characters)]);

  const handleRollForAll = () => {
    const updatedCharacters = [];

    characters.forEach((character) => {
      const { finalResult, fumbleLevel } = diceRoller.perform();
      updatedCharacters.push(getUpdatedCharacter(character, {
        initiativeRoll: finalResult, initiativeFumble: -fumbleLevel,
      }));
    });

    setCharacters(sortCharacters(updatedCharacters));
  };

  const handleInitiativeRollClick = originalCharacter => () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    updateCharacter(originalCharacter, {
      initiativeRoll: finalResult,
      initiativeFumble: -fumbleLevel,
    });
  };

  const handleCharacterUpdate = originalCharacter => changes => updateCharacter(originalCharacter, changes);

  const updateCharacter = (originalCharacter, changes) => {
    setCharacters([
      ...characters.map(character => (
        character.uid === originalCharacter.uid ? getUpdatedCharacter(character, changes) : character
      )),
    ]);
  };

  const getUpdatedCharacter = (character, changes) => {
    const updatedCharacter = { ...character, ...changes };
    updatedCharacter.totalInitiative = totalInitiative(updatedCharacter);
    return updatedCharacter;
  };

  const sortCharacters = list => list.sort((char1, char2) => -(char1.totalInitiative - char2.totalInitiative));

  const totalInitiative = character => character.baseInitiative
    + character.initiativeRoll + character.initiativeFumble;

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
            <TableCell>Sorpresa</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          { characters.map((character, idx) => (
            <CharacterRow
              key={character.uid}
              order={idx + 1}
              character={character}
              onUpdate={handleCharacterUpdate(character)}
              onInitiativeRollClick={handleInitiativeRollClick(character)}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CharacterList;
