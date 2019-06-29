import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const SavePartyDialog = ({ open, onClose, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Guardar party</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Si una party con el mismo nombre ya existe, será sobre-escrita
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="party-name"
          fullWidth
          label="Nombre de la party"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SavePartyDialog.defaultProps = {
  onClose: () => {},
  onSave: () => {},
};

SavePartyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default SavePartyDialog;
