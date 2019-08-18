import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  modifiers: {
    marginTop: 6,
    flex: 1,
    overflowY: 'scroll',
  },
}));

const ModifiersList = ({ selectedModifiers, modifiers, onSelect }) => {
  const classes = useStyles();

  return (
    <>
      <Typography>Modificadores</Typography>
      <List className={classes.modifiers} dense>
        {Object.keys(modifiers).map((modifier) => {
          const labelId = `checkbox-list-label-${modifier}`;

          return (
            <ListItem key={modifier} role={undefined} dense button onClick={onSelect(modifier)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedModifiers.indexOf(modifier) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={modifier} />
              <Typography>{modifiers[modifier]}</Typography>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

ModifiersList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedModifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  modifiers: PropTypes.shape({}).isRequired,
};

export default ModifiersList;
