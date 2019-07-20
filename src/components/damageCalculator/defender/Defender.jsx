import React from 'react';
import { Box, Select, Grid, MenuItem, Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox, OutlinedInput, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
}));

const diceRoller = new DiceRoller();

const Defender = ({ data, onChange }) => {
  const classes = useStyles();

  const handleStateChange = field => (newValue) => {
    onChange({
      ...data,
      [field]: newValue,
    });
  };

  const handleTAChange = (event) => {
    onChange({
      ...data,
      ta: event.target.value,
    });
  };

  const handleConsecutiveDefenseChange = (event) => {
    onChange({
      ...data,
      consecutiveDefense: event.target.value,
    });
  };

  const handleDefenseRollClick = () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    onChange({ ...data, roll: finalResult, fumbleLevel });
  };

  const handleModifierTogle = modifier => () => {
    const currentIndex = data.modifiers.indexOf(modifier);

    const newData = { ...data, modifiers: [...data.modifiers] };
    if (currentIndex === -1) {
      newData.modifiers.push(modifier);
    } else {
      newData.modifiers.splice(currentIndex, 1);
    }

    onChange(newData);
  };

  const defenseFumbled = () => data.fumbleLevel > 0;

  const composeDefenseText = () => {
    let text = `Defensa ${data.totalDefense}`;
    if (defenseFumbled()) text = text.concat(` (nvl pifia: ${data.fumbleLevel})`);
    return text;
  };

  return (
    <Box className={classes.root}>
      <Typography gutterBottom>{composeDefenseText()}</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.roll}
            onStatChange={handleStateChange('roll')}
            label="Tirada de defensa"
            onRoll={handleDefenseRollClick}
            withRollButton
          />
        </Grid>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.fumbleLevel}
            onStatChange={handleStateChange('fumbleLevel')}
            label="Nivel de pifia"
          />
        </Grid>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.baseDefense}
            onStatChange={handleStateChange('baseDefense')}
            label="Defensa base"
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            className={classes.statInput}
            value={data.ta}
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
        </Grid>
        <Grid item xs={12}>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.rGroup}
            value={data.consecutiveDefense}
            onChange={handleConsecutiveDefenseChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="1º" />
            <FormControlLabel value="2" control={<Radio />} label="2º" />
            <FormControlLabel value="3" control={<Radio />} label="3º" />
            <FormControlLabel value="4" control={<Radio />} label="4º" />
            <FormControlLabel value="5" control={<Radio />} label="5º+" />
          </RadioGroup>
        </Grid>
      </Grid>
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
                  checked={data.modifiers.indexOf(modifier) !== -1}
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

Defender.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    roll: PropTypes.number,
    fumbleLevel: PropTypes.number,
    baseDefense: PropTypes.number,
    ta: PropTypes.number,
    consecutiveDefense: PropTypes.string,
    modifiers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Defender;
