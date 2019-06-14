import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    flex: '0 0 auto',
  },
  title: {
    flex: '0 0 auto',
  },
}));

const CharacterListButtonsBar = ({ onNewCharacter, onSort, onnRollAll }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Personajes
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Button onClick={onSort}>Ordenar</Button>
        <Button onClick={onnRollAll}>Calcular inciativa</Button>
        <Button onClick={onNewCharacter}>Nuevo personaje</Button>
      </div>
    </Toolbar>
  );
};

CharacterListButtonsBar.propTypes = {
  onNewCharacter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onnRollAll: PropTypes.func.isRequired,
};

export default CharacterListButtonsBar;
