import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
  const handleConfirm = () => onConfirm();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { content }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
        >
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.defaultProps = {
  title: '',
  content: '',
};

ConfirmationDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
