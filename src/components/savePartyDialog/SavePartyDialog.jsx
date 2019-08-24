import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SavePartyDialog = ({ open, onClose, onSave }) => {
  const { t } = useTranslation();
  const [partyName, setPartyName] = useState('');

  const onPartyNameChange = event => setPartyName(event.target.value);

  const handleSave = () => {
    onSave(partyName);
    setPartyName('');
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Guardar party</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('overwrite_party_explanation')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="party-name"
          fullWidth
          label={t('party_name')}
          value={partyName}
          onChange={onPartyNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('cancel')}
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={!partyName}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SavePartyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SavePartyDialog;
