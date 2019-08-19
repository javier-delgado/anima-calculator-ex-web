import React, { memo, useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import DiceRoller from '../../../domain/diceRoller';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  titles: {
    textAlign: 'center',
  },
  statInput: {
    width: '100%',
  },
  inputGrid: {
    width: '240px',
  },
}));

const diceRoller = new DiceRoller({ fumbleEnabled: false, openRollEnabled: false });

const Attacker = ({ suggestedDamage }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    attackerRoll: 0,
    defenderRoll: 0,
    resFis: 0,
    damage: 0,
    txtMainHeader: '-',
    txtSecondaryHeader: '-',
    txtCritLevel: '',
    txtTotalResistance: '',
  });

  useEffect(() => {
    setState(s => ({ ...s, damage: suggestedDamage, attackerRoll: 0, defenderRoll: 0, resFis: 0 }));
  }, [suggestedDamage]);

  useEffect(() => {
    composeText();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.attackerRoll, state.defenderRoll, state.resFis, state.damage]);

  const handleRollClick = which => () => {
    const { finalResult } = diceRoller.perform();
    setState({ ...state, [which]: finalResult });
  };

  const handleStateChange = which => (newValue) => {
    setState({ ...state, [which]: newValue });
  };

  const composeText = () => {
    const critLevel = state.damage + state.attackerRoll;
    const totalResistance = state.resFis + state.defenderRoll;

    const txtCritLevel = `Nivel de crítico: ${critLevel}`;
    const txtTotalResistance = `Res. Fis. total: ${totalResistance}`;

    let txtMainHeader;
    let txtSecondaryHeader;
    if (state.damage === 0 || state.resFis === 0) {
      txtMainHeader = '-';
      txtSecondaryHeader = '-';
    } else if (state.defenderRoll === 100) {
      txtMainHeader = 'El defensor tiró un 100 natural';
      txtSecondaryHeader = 'El defensor aguanta el golpe crítico';
    } else if (totalResistance >= critLevel) {
      txtMainHeader = '-';
      txtSecondaryHeader = 'El defensor aguanta el golpe crítico';
    } else {
      txtMainHeader = `Diferencia: ${critLevel - totalResistance}`;
      txtSecondaryHeader = 'El atacante hace crítico';
    }

    setState({
      ...state,
      txtMainHeader,
      txtSecondaryHeader,
      txtCritLevel,
      txtTotalResistance,
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titles}>
        <Typography>{state.txtSecondaryHeader}</Typography>
        <Typography variant="h5">{state.txtMainHeader}</Typography>
      </Box>
      <br />
      <Grid container spacing={2} className={classes.inputGrid}>
        <Grid item xs={12}>
          {`Attaque (${state.txtCritLevel})`}
        </Grid>
        <Grid item xs={12}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={state.damage}
            onStatChange={handleStateChange('damage')}
            label="Daño"
          />
        </Grid>
        <Grid item xs={12}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={state.attackerRoll}
            onStatChange={handleStateChange('attackerRoll')}
            label="Tirada"
            onRoll={handleRollClick('attackerRoll')}
            withRollButton
          />
        </Grid>
        <Grid item xs={12}>
          {`Defensa (${state.txtTotalResistance})`}
        </Grid>
        <Grid item xs={12}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={state.resFis}
            onStatChange={handleStateChange('resFis')}
            label="Res. Fís. base"
          />
        </Grid>
        <Grid item xs={12}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={state.defenderRoll}
            onStatChange={handleStateChange('defenderRoll')}
            label="Tirada"
            onRoll={handleRollClick('defenderRoll')}
            withRollButton
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Attacker.defaultProps = {
  suggestedDamage: 0,
};

Attacker.propTypes = {
  suggestedDamage: PropTypes.number,
};

export default memo(Attacker);
