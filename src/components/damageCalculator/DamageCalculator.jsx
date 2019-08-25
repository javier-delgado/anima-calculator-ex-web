import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, IconButton, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Attacker from './attacker/Attacker';
import Defender from './defender/Defender';
import Critical from './critical/Critical';
import { actionClearData } from '../../redux/calculator/calculator.actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  top: {
    textAlign: 'center',
    color: '#FFF',
    backgroundImage: 'linear-gradient(to right, #BA4C17 , #831804)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: '0 auto',
    display: 'flex',
    position: 'relative',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  right: {
    marginLeft: theme.spacing(2),
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    marginTop: 1,
    color: 'white',
  },
  titles: {
    margin: '0 auto',
  },
}));

const DamageCalculator = ({ mainText, secondaryText, finalDamage, clearData }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper>
        <Box className={classes.top}>
          <Box className={classes.titles}>
            <Typography>{secondaryText}</Typography>
            <Typography variant="h5">{mainText}</Typography>
          </Box>
          <Tooltip title={t('clear_inputs')} placement="bottom">
            <IconButton aria-label="Clear" className={classes.clearButton} color="inherit" onClick={clearData}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box className={classes.bottom}>
          <Attacker />
          <Defender />
        </Box>
      </Paper>
      <Paper className={classes.right}>
        <Critical suggestedDamage={finalDamage} />
      </Paper>
    </Box>
  );
};

DamageCalculator.propTypes = {
  mainText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  finalDamage: PropTypes.number.isRequired,
  clearData: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({
  clearData: actionClearData,
});

const mapStateToProps = state => ({ mainText: state.calculator.mainText, secondaryText: state.calculator.secondaryText, finalDamage: state.calculator.finalDamage });

export default connect(mapStateToProps, mapDispatchToProps)(DamageCalculator);
