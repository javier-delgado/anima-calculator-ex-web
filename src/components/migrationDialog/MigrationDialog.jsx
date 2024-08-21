import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const MigrationDialog = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{t('migration_title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { t('migration_explain') }
          <hr />
          <a href="https://amt-v3.web.app/" target="blank">Anima Master Toolkit</a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
        >
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MigrationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MigrationDialog;
