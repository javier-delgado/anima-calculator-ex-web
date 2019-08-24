/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MobileView } from 'react-device-detect';
import { useTranslation, Trans } from 'react-i18next';

const MobileWarning = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <MobileView>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Diseñado para escritorio</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Trans t={t} i18nKey="mobile_warning.part_1">
              Esta aplicación esta diseñada para ser utilizada en computadoras de escritorio o dispositivos con pantalla grande.
              Si quieres acceder desde un dispositivo móvil Android, puedes descargar la
              aplicación <a href="https://play.google.com/store/apps/details?id=com.javierdelgado.anima_calculator_ex">aquí</a>.
            </Trans>
          </DialogContentText>
          <DialogContentText>
            {t('mobile_warning.part_2')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </MobileView>
  );
};

export default MobileWarning;
