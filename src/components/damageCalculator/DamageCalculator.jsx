import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Attacker from './attacker/Attacker';
import Defender from './defender/Defender';
import Critical from './critical/Critical';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  top: {
    textAlign: 'center',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
}));

const DamageCalculator = ({ mainText, secondaryText, finalDamage }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Box className={classes.top}>
          <Typography>{secondaryText}</Typography>
          <Typography variant="h5">{mainText}</Typography>
        </Box>
        <Box className={classes.bottom}>
          <Attacker />
          <Defender />
        </Box>
      </Box>
      <Box className={classes.right}>
        <Critical suggestedDamage={finalDamage} />
      </Box>
    </Box>
  );
};

DamageCalculator.propTypes = {
  mainText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  finalDamage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({ mainText: state.calculator.mainText, secondaryText: state.calculator.secondaryText, finalDamage: state.calculator.finalDamage });

export default connect(mapStateToProps)(DamageCalculator);
