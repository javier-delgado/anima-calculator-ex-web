import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Button, Typography, IconButton, Menu, MenuItem, SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundImage: 'linear-gradient(to right, #BA4C17 , #831804)',
    color: theme.palette.lightText,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.lightText,
    flex: '0 0 auto',
  },
  title: {
    flex: '0 0 auto',
  },
}));

const CharacterListButtonsBar = ({ onNewCharacter, onSort, onnRollAll }) => {
  const classes = useToolbarStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => { setAnchorEl(event.currentTarget); };

  const handleClose = () => { setAnchorEl(null); };

  return (
    <Toolbar className={classes.root} variant="dense">
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Personajes
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Button onClick={onSort} color="inherit">Ordenar</Button>
        <Button onClick={onnRollAll} color="inherit">Calcular inciativa</Button>
        <Button onClick={onNewCharacter} color="inherit">Nuevo personaje</Button>
        <IconButton edge="end" color="inherit" onClick={handleMenu}>
          <SvgIcon>
            <path
              // eslint-disable-next-line max-len
              d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
            />
          </SvgIcon>
        </IconButton>
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Guardar party</MenuItem>
        <MenuItem onClick={handleClose}>Cargar Party</MenuItem>
        <MenuItem onClick={handleClose}>Limpiar party actual</MenuItem>
      </Menu>
    </Toolbar>
  );
};

CharacterListButtonsBar.propTypes = {
  onNewCharacter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onnRollAll: PropTypes.func.isRequired,
};

export default memo(CharacterListButtonsBar);
