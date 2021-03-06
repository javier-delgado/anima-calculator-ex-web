import React from 'react';
import { Box, Select, Grid, MenuItem, OutlinedInput, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import DiceRoller from '../../../domain/diceRoller';
import ModifiersList from '../modifiersList/ModifiersList';
import { DEFENSE_MODIFIERS } from '../../../domain/modifiers.constants';
import { actionUpdateDefenderData } from '../../../redux/calculator/calculator.actions';


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
  rGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  defenseTitle: {
    fontFamily: 'marigold',
    fontSize: '2.4em',
    color: '#2F366A',
    marginRight: '0.2em',
  },
  title: {
    marginTop: '-0.6em',
    marginBottom: '1em',
  },
}));

const diceRoller = new DiceRoller();

const Defender = ({ data, updateDefenderData }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleStateChange = field => newValue => updateDefenderData({ [field]: newValue });

  const handleTAChange = event => updateDefenderData({ ta: event.target.value });

  const handleConsecutiveDefenseChange = event => updateDefenderData({ consecutiveDefense: event.target.value });

  const handleDefenseRollClick = () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    updateDefenderData({ roll: finalResult, fumbleLevel });
  };

  const handleModifierTogle = modifier => () => {
    const currentIndex = data.modifiers.indexOf(modifier);

    const newModifiers = [...data.modifiers];
    if (currentIndex === -1) {
      newModifiers.push(modifier);
    } else {
      newModifiers.splice(currentIndex, 1);
    }

    updateDefenderData({ modifiers: newModifiers });
  };

  const handleModifierDeselectAll = () => updateDefenderData({ modifiers: [] });

  const defenseFumbled = () => data.fumbleLevel > 0;

  const composeDefenseText = () => {
    let text = `${data.totalDefense}`;
    if (defenseFumbled()) text = text.concat(' ').concat(t('fumble_level_', { level: data.fumbleLevel }));
    return text;
  };

  return (
    <Box className={classes.root}>
      <div className={classes.title}>
        <span className={classes.defenseTitle}>{t('defense')}</span>
        <span>{composeDefenseText()}</span>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.roll}
            onStatChange={handleStateChange('roll')}
            label={t('defense_roll')}
            onRoll={handleDefenseRollClick}
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
            initialStatValue={data.baseDefense}
            onStatChange={handleStateChange('baseDefense')}
            label={t('base_defense')}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            className={classes.statInput}
            value={data.ta}
            onChange={handleTAChange}
            input={<OutlinedInput name="ta" id="ta" />}
          >
            <MenuItem value={0}>{t('at_n', { number: 0 })}</MenuItem>
            <MenuItem value={1}>{t('at_n', { number: 1 })}</MenuItem>
            <MenuItem value={2}>{t('at_n', { number: 2 })}</MenuItem>
            <MenuItem value={3}>{t('at_n', { number: 3 })}</MenuItem>
            <MenuItem value={4}>{t('at_n', { number: 4 })}</MenuItem>
            <MenuItem value={5}>{t('at_n', { number: 5 })}</MenuItem>
            <MenuItem value={6}>{t('at_n', { number: 6 })}</MenuItem>
            <MenuItem value={7}>{t('at_n', { number: 7 })}</MenuItem>
            <MenuItem value={8}>{t('at_n', { number: 8 })}</MenuItem>
            <MenuItem value={9}>{t('at_n', { number: 9 })}</MenuItem>
            <MenuItem value={10}>{t('at_n', { number: 10 })}</MenuItem>
            <MenuItem value={11}>{t('at_n', { number: 11 })}</MenuItem>
            <MenuItem value={12}>{t('at_n', { number: 12 })}</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <RadioGroup
            aria-label="Consecutive defense"
            name="consecutive_defense"
            className={classes.rGroup}
            value={data.consecutiveDefense}
            onChange={handleConsecutiveDefenseChange}
          >
            <FormControlLabel value="1" control={<Radio />} label={t('first')} />
            <FormControlLabel value="2" control={<Radio />} label={t('second')} />
            <FormControlLabel value="3" control={<Radio />} label={t('third')} />
            <FormControlLabel value="4" control={<Radio />} label={t('fourth')} />
            <FormControlLabel value="5" control={<Radio />} label={t('fifth_plus')} />
          </RadioGroup>
        </Grid>
      </Grid>
      <br />
      <ModifiersList modifiers={DEFENSE_MODIFIERS} selectedModifiers={data.modifiers} onSelect={handleModifierTogle} onDeselectAll={handleModifierDeselectAll} />
    </Box>
  );
};

Defender.propTypes = {
  updateDefenderData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    roll: PropTypes.number,
    fumbleLevel: PropTypes.number,
    baseDefense: PropTypes.number,
    ta: PropTypes.number,
    consecutiveDefense: PropTypes.string,
    totalDefense: PropTypes.number,
    modifiers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = state => ({ data: state.calculator.defenderData });

const mapDispatchToProps = {
  updateDefenderData: actionUpdateDefenderData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Defender);
