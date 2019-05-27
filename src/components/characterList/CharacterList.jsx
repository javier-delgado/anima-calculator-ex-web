import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CharacterRow from './characterRow/CharacterRow';
import {TableCell} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

/**
 * A list of character rows.  Used to keep track of initiative and other stats.
 * @return {React.Component}
 */
const CharacterList = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CharacterRow />
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default CharacterList;
