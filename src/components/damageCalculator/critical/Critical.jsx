import React, { memo, useState, useEffect } from 'react';
import { Box, Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import DiceRoller from '../../../domain/diceRoller';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  titles: {
    textAlign: 'center',
    color: '#FFF',
    backgroundImage: 'linear-gradient(to right, #BA4C17 , #831804)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  statInput: {
    width: '100%',
  },
  inputGrid: {
    padding: theme.spacing(2),
    width: '240px',
  },
}));

const diceRoller = new DiceRoller({ fumbleEnabled: false, openRollEnabled: false });

const Attacker = ({ suggestedDamage }) => {
  const { t } = useTranslation();
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

    const txtCritLevel = t('crit_level', { level: critLevel });
    const txtTotalResistance = t('total_phys_res', { value: totalResistance });

    let txtMainHeader;
    let txtSecondaryHeader;
    if (state.damage === 0 || state.resFis === 0) {
      txtMainHeader = '-';
      txtSecondaryHeader = '-';
    } else if (state.defenderRoll === 100) {
      txtMainHeader = t('defender_rolled_100');
      txtSecondaryHeader = t('defender_endures_critical_hit');
    } else if (totalResistance >= critLevel) {
      txtMainHeader = '-';
      txtSecondaryHeader = t('defender_endures_critical_hit');
    } else {
      txtMainHeader = t('difference_', { value: critLevel - totalResistance });
      txtSecondaryHeader = t('attacker_deals_critical_hit');
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
      <Grid container spacing={2} className={classes.inputGrid}>
        <Grid item xs={12}>
          {t('attack_value', { value: state.txtCritLevel })}
        </Grid>
        <Grid item xs={12}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={state.damage}
            onStatChange={handleStateChange('damage')}
            label={t('damage')}
          />
        </Grid>
        <Grid item xs={12}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={state.attackerRoll}
            onStatChange={handleStateChange('attackerRoll')}
            label={t('roll')}
            onRoll={handleRollClick('attackerRoll')}
            withRollButton
          />
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          {t('defense_value', { value: state.txtTotalResistance })}
        </Grid>
        <Grid item xs={12}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={state.resFis}
            onStatChange={handleStateChange('resFis')}
            label={t('base_phys_res')}
          />
        </Grid>
        <Grid item xs={12}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={state.defenderRoll}
            onStatChange={handleStateChange('defenderRoll')}
            label={t('roll')}
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
