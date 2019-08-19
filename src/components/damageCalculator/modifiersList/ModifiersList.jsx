import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import { sumBy } from 'lodash';

const useStyles = makeStyles(() => ({
  modifiers: {
    marginTop: 6,
    flex: 1,
    overflowY: 'scroll',
  },
}));

const ColorButton = withStyles(() => ({
  root: {
    color: '#FFF',
    backgroundImage: 'linear-gradient(to right, #BA4C17 , #831804)',
  },
}))(Button);

const ModifiersList = ({ selectedModifiers, modifiers, onSelect }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const doOpen = () => setOpen(true);

  const modifiersTotal = () => sumBy(selectedModifiers, mod => modifiers[mod]);

  const renderList = () => (
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
  );

  return (
    <>
      <ColorButton onClick={doOpen}>
        {`Modificadores (${modifiersTotal()})`}
      </ColorButton>

      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`Modificadores (${modifiersTotal()})`}</DialogTitle>
        {renderList()}
        <DialogActions>
          <Button onClick={onClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ModifiersList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedModifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  modifiers: PropTypes.shape({}).isRequired,
};

export default ModifiersList;
