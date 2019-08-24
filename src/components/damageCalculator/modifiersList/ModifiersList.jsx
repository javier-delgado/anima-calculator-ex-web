import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import { sumBy, sortBy } from 'lodash';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const doOpen = () => setOpen(true);

  const modifiersTotal = () => sumBy(selectedModifiers, mod => modifiers[mod]);

  const translatedModifiers = () => sortBy(Object.keys(modifiers).map(modifier => ({
    key: modifier,
    value: modifiers[modifier],
    text: t(`modifiers.${modifier}`),
  })), item => item.text);

  const renderList = () => (
    <List className={classes.modifiers} dense>
      {translatedModifiers().map((item) => {
        const labelId = `checkbox-list-label-${item.key}`;

        return (
          <ListItem key={item.key} role={undefined} dense button onClick={onSelect(item.key)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedModifiers.indexOf(item.key) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={item.text} />
            <Typography>{item.value}</Typography>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <>
      <ColorButton onClick={doOpen}>
        {t('modifiers_total', { total: modifiersTotal() })}
      </ColorButton>

      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('modifiers_total', { total: modifiersTotal() })}</DialogTitle>
        {renderList()}
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('ok')}
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
