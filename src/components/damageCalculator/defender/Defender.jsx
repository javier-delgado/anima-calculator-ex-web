import React, { useState } from 'react';
import { Box, Select, MenuItem, Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox, OutlinedInput, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sumBy, max } from 'lodash';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import DiceRoller from '../../../domain/diceRoller';
import { DEFENSE_MODIFIERS } from '../../../domain/modifiers.constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  statInput: {
    marginTop: 6,
    marginBottom: 6,
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
}));

const diceRoller = new DiceRoller();

const Defender = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    roll: 0,
    fumbleLevel: 0,
    baseDefense: 0,
    ta: 0,
    consecutiveDefense: 1,
    modifiers: [],
  });

  const handleStateChange = field => (newValue) => {
    setState({
      ...state,
      [field]: newValue,
    });
  };

  const handleTAChange = (event) => {
    setState({
      ...state,
      ta: event.target.value,
    });
  };

  const handleConsecutiveDefenseChange = (event) => {
    setState({
      ...state,
      consecutiveDefense: event.target.value,
    });
  };

  const handleDefenseRollClick = () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    setState({ ...state, roll: finalResult, fumbleLevel });
  };

  const handleModifierTogle = modifier => () => {
    const currentIndex = state.modifiers.indexOf(modifier);

    const newState = { ...state, modifiers: [...state.modifiers] };
    if (currentIndex === -1) {
      newState.modifiers.push(modifier);
    } else {
      newState.modifiers.splice(currentIndex, 1);
    }

    setState(newState);
  };

  const totalDefense = () => {
    let defenseSum = state.baseDefense + state.roll + consecutiveDefensePenalty() + sumBy(state.modifiers, mod => DEFENSE_MODIFIERS[mod]);
    if (defenseFumbled()) defenseSum -= state.fumbleLevel;

    if (state.baseDefense + state.roll >= 0) return max([defenseSum, 0]);
    return defenseSum;
  };

  const defenseFumbled = () => state.fumbleLevel > 0;

  const composeDefenseText = () => {
    let text = `Defense ${totalDefense()}`;
    if (defenseFumbled()) text = text.concat(` (nvl pifia: ${state.fumbleLevel})`);
    return text;
  };

  const consecutiveDefensePenalty = () => {
    switch (state.consecutiveDefense) {
      case 1: return 0;
      case 2: return -30;
      case 3: return -50;
      case 4: return -70;
      case 5: return -90;
      default: return 0;
    }
  };

  return (
    <Box className={classes.root}>
      <Typography gutterBottom>{composeDefenseText()}</Typography>
      <CharacterStatInput
        className={classes.statInput}
        initialStatValue={state.roll}
        onStatChange={handleStateChange('roll')}
        label="Tirada de defensa"
        onRoll={handleDefenseRollClick}
        withRollButton
      />
      <br />
      <CharacterStatInput
        className={classes.statInput}
        initialStatValue={state.fumbleLevel}
        onStatChange={handleStateChange('fumbleLevel')}
        label="Nivel de pifia"
      />
      <br />
      <CharacterStatInput
        className={classes.statInput}
        initialStatValue={state.baseDefense}
        onStatChange={handleStateChange('baseDefense')}
        label="Defensa base"
      />
      <br />
      <Select
        value={state.ta}
        onChange={handleTAChange}
        input={<OutlinedInput name="ta" id="ta" />}
      >
        <MenuItem value={0}>TA 0</MenuItem>
        <MenuItem value={1}>TA 1</MenuItem>
        <MenuItem value={2}>TA 2</MenuItem>
        <MenuItem value={3}>TA 3</MenuItem>
        <MenuItem value={4}>TA 4</MenuItem>
        <MenuItem value={5}>TA 5</MenuItem>
        <MenuItem value={6}>TA 6</MenuItem>
        <MenuItem value={7}>TA 7</MenuItem>
        <MenuItem value={8}>TA 8</MenuItem>
        <MenuItem value={9}>TA 9</MenuItem>
        <MenuItem value={10}>TA 10</MenuItem>
        <MenuItem value={11}>TA 11</MenuItem>
        <MenuItem value={12}>TA 12</MenuItem>
      </Select>
      <br />
      <RadioGroup
        aria-label="Gender"
        name="gender1"
        className={classes.rGroup}
        value={state.consecutiveDefense}
        onChange={handleConsecutiveDefenseChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="1º" />
        <FormControlLabel value="2" control={<Radio />} label="2º" />
        <FormControlLabel value="3" control={<Radio />} label="3º" />
        <FormControlLabel value="4" control={<Radio />} label="4º" />
        <FormControlLabel value="5" control={<Radio />} label="5º+" />
      </RadioGroup>
      <br />
      <Typography>Modificadores</Typography>
      <List className={classes.modifiers} dense>
        {Object.keys(DEFENSE_MODIFIERS).map((modifier) => {
          const labelId = `checkbox-list-label-${modifier}`;

          return (
            <ListItem key={modifier} role={undefined} dense button onClick={handleModifierTogle(modifier)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={state.modifiers.indexOf(modifier) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={modifier} />
              <Typography>{DEFENSE_MODIFIERS[modifier]}</Typography>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Defender;
