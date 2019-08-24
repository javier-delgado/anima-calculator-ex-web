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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
              <TableCell>{t('ord')}</TableCell>
              <TableCell>{t('name')}</TableCell>
              <Tooltip title={t('enemies_not_persisted')} placement="bottom">
                <TableCell>
                  {t('enemy')}
                </TableCell>
              </Tooltip>
              <TableCell className={classes.initiativeCell}>{t('uroboros')}</TableCell>
              <TableCell className={classes.initiativeCell}>{t('total_initiative')}</TableCell>
              <TableCell className={classes.initiativeCell}>{t('roll')}</TableCell>
              <TableCell className={classes.initiativeCell}>{t('turn')}</TableCell>
              <TableCell className={classes.initiativeCell}>{t('fumble')}</TableCell>
              <TableCell className={classes.initiativeCell}>{t('surprised_by')}</TableCell>
              <TableCell className={classes.initiativeCell}>{t('surprises')}</TableCell>
              <TableCell>{t('LP')}</TableCell>
              <TableCell>{t('fatigue')}</TableCell>
              <TableCell>{t('ki')}</TableCell>
              <TableCell>{t('zeon')}</TableCell>
              <TableCell>{t('PP')}</TableCell>
              <TableCell>{t('natura')}</TableCell>
              <TableCell>{t('notes')}</TableCell>
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
  zeon: PropTypes.number,
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
