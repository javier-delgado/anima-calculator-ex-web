import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import DiceRoller from '../../../domain/diceRoller';
import ModifiersList from '../modifiersList/ModifiersList';
import { ATTACK_MODIFIERS } from '../../../domain/modifiers.constants';
import { actionUpdateAttackerData } from '../../../redux/calculator/calculator.actions';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  statInput: {
    width: '100%',
  },
  modifiers: {
    marginTop: 6,
    flex: 1,
    overflowY: 'scroll',
  },
  inputGrid: {
    marginBottom: 42,
  },
}));

const diceRoller = new DiceRoller();

const Attacker = ({ data, updateAttackerData }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleStateChange = field => (newValue) => {
    updateAttackerData({ [field]: newValue });
  };

  const handleAttackRollClick = () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    updateAttackerData({ roll: finalResult, fumbleLevel });
  };

  const handleModifierTogle = modifier => () => {
    const currentIndex = data.modifiers.indexOf(modifier);

    const newModifiers = [...data.modifiers];
    if (currentIndex === -1) {
      newModifiers.push(modifier);
    } else {
      newModifiers.splice(currentIndex, 1);
    }

    updateAttackerData({ modifiers: newModifiers });
  };

  const attackerFumbled = () => data.fumbleLevel > 0;

  const composeAttackText = () => {
    let text = t('attack_value', { value: data.totalAttack });
    if (attackerFumbled()) text = text.concat(` (nvl pifia: ${data.fumbleLevel})`);
    return text;
  };

  return (
    <Box className={classes.root}>
      <Typography gutterBottom>{composeAttackText()}</Typography>
      <br />
      <Grid container spacing={2} className={classes.inputGrid}>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.roll}
            onStatChange={handleStateChange('roll')}
            label={t('attack_roll')}
            onRoll={handleAttackRollClick}
            withRollButton
          />
        </Grid>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.fumbleLevel}
            onStatChange={handleStateChange('fumbleLevel')}
            label={t('fumble_level')}
          />
        </Grid>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.baseAttack}
            onStatChange={handleStateChange('baseAttack')}
            label={t('base_attack')}
          />
        </Grid>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.damage}
            onStatChange={handleStateChange('damage')}
            label={t('damage')}
          />
        </Grid>
      </Grid>
      <br />
      <ModifiersList modifiers={ATTACK_MODIFIERS} selectedModifiers={data.modifiers} onSelect={handleModifierTogle} />
    </Box>
  );
};

Attacker.propTypes = {
  updateAttackerData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    roll: PropTypes.number,
    fumbleLevel: PropTypes.number,
    baseAttack: PropTypes.number,
    damage: PropTypes.number,
    modifiers: PropTypes.arrayOf(PropTypes.string),
    totalAttack: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({ data: state.calculator.attackerData });

const mapDispatchToProps = {
  updateAttackerData: actionUpdateAttackerData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Attacker);
