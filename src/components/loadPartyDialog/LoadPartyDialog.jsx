import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const LoadPartyDialog = ({ parties, open, onClose, onPartyLoad }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{t('load_party')}</DialogTitle>
      { parties.length ? (
        <List>
          {parties.map(partyName => (
            <ListItem button onClick={onPartyLoad(partyName)} key={partyName}>
              <ListItemText primary={partyName} />
            </ListItem>
          ))}
        </List>
      ) : (
        <DialogContent>
          <DialogContentText>
            {t('no_saved_parties')}
          </DialogContentText>
        </DialogContent>
      )
      }
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LoadPartyDialog.propTypes = {
  parties: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPartyLoad: PropTypes.func.isRequired,
};

export default LoadPartyDialog;
