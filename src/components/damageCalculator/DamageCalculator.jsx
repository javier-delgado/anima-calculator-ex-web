import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Attacker from './attacker/Attacker';
import Defender from './defender/Defender';
import Critical from './critical/Critical';

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
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  right: {
    marginLeft: theme.spacing(2),
  },
}));

const DamageCalculator = ({ mainText, secondaryText, finalDamage }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper>
        <Box className={classes.top}>
          <Typography>{secondaryText}</Typography>
          <Typography variant="h5">{mainText}</Typography>
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
  finalDamage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ mainText: state.calculator.mainText, secondaryText: state.calculator.secondaryText, finalDamage: state.calculator.finalDamage });

export default connect(mapStateToProps)(DamageCalculator);
