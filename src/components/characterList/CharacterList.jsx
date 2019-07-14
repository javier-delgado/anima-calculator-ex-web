import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { TableCell, Tooltip } from '@material-ui/core';

import { actionAddCharacter,
  actionSortCharacters,
  actionRollInitiativeForAll } from '../../redux/characters/characters.actions';
import CharacterRow from './characterRow/CharacterRow';
import CharacterListButtonsBar from './buttonsBar/CharacterListButtonsBar';

const useStyles = makeStyles(() => ({
  tableHead: {
    whiteSpace: 'nowrap',
  },
  tableWrapper: {
    overflow: 'scroll',
    flexGrow: 1,
    paddingBottom: 16,
  },
  table: {
    minWidth: 650,
  },
  initiativeCell: {
    background: '#F8F8F8',
  },
}));

/**
 * A list of character rows.  Used to keep track of initiative and other stats.
 * @return {React.Component}
 */
const CharacterList = ({ characters, addCharacter, sortCharacters, rollInitiativeForAll }) => {
  const classes = useStyles();

  const handleNewCharacter = () => addCharacter();

  const handleSort = () => sortCharacters(characters);

  const handleRollForAll = () => rollInitiativeForAll(characters);

  return (
    <>
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
              <Tooltip title="Los enemigos no se persisten al guardar la party" placement="bottom">
                <TableCell>
                    Enemigo
                </TableCell>
              </Tooltip>
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
          <TableBody className={classes.tableBody}>
            { characters.map((character, idx) => (
              <CharacterRow
                key={character.uid}
                order={idx + 1}
                characterUid={character.uid}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
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

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(characterShape).isRequired,
  addCharacter: PropTypes.func.isRequired,
  sortCharacters: PropTypes.func.isRequired,
  rollInitiativeForAll: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  characters: state.characters,
});

const mapDispatchToProps = ({
  addCharacter: actionAddCharacter,
  sortCharacters: actionSortCharacters,
  rollInitiativeForAll: actionRollInitiativeForAll,
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(CharacterList));
