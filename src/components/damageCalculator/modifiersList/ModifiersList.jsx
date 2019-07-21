import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

import { ATTACK_MODIFIERS } from '../../../domain/modifiers.constants';

const useStyles = makeStyles(() => ({
  modifiers: {
    marginTop: 6,
    flex: 1,
    overflowY: 'scroll',
  },
}));

const ModifiersList = ({ modifiers, onSelect }) => {
  const classes = useStyles();

  return (
    <>
      <Typography>Modificadores</Typography>
      <List className={classes.modifiers} dense>
        {Object.keys(ATTACK_MODIFIERS).map((modifier) => {
          const labelId = `checkbox-list-label-${modifier}`;

          return (
            <ListItem key={modifier} role={undefined} dense button onClick={onSelect(modifier)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={modifiers.indexOf(modifier) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={modifier} />
              <Typography>{ATTACK_MODIFIERS[modifier]}</Typography>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

ModifiersList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// export default memo(ModifiersList, (prevProps, nextProps) => (
//   prevProps.modifiers.length === nextProps.modifiers.length
//   && prevProps.onSelect === nextProps.onSelect
// ));

export default ModifiersList;
