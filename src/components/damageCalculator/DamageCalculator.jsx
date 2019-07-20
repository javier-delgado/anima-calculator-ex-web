import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Attacker from './attacker/Attacker';
import Defender from './defender/Defender';

const useStyles = makeStyles(() => ({
  bottom: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const DamageCalculator = () => {
  const classes = useStyles();

  return (
    <Box className={classes.bottom}>
      <Attacker></Attacker>
      <Defender></Defender>
    </Box>
  );
};

export default DamageCalculator;
