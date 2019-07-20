import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sumBy, max } from 'lodash';
import PropTypes from 'prop-types';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import DiceRoller from '../../../domain/diceRoller';
import { ATTACK_MODIFIERS } from '../../../domain/modifiers.constants';

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
}));

const diceRoller = new DiceRoller();

const Attacker = ({ onChange, data }) => {
  const classes = useStyles();

  const handleStateChange = field => (newValue) => {
    onChange({
      ...data,
      [field]: newValue,
    });
  };

  const handleAttackRollClick = () => {
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

  const attackerFumbled = () => data.fumbleLevel > 0;

  const composeAttackText = () => {
    let text = `Ataque ${data.totalAttack}`;
    if (attackerFumbled()) text = text.concat(` (nvl pifia: ${data.fumbleLevel})`);
    return text;
  };

  return (
    <Box className={classes.root}>
      <Typography gutterBottom>{composeAttackText()}</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.roll}
            onStatChange={handleStateChange('roll')}
            label="Tirada de ataque"
            onRoll={handleAttackRollClick}
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
            initialStatValue={data.baseAttack}
            onStatChange={handleStateChange('baseAttack')}
            label="Ataque base"
          />
        </Grid>
        <Grid item xs={6}>
          <CharacterStatInput
            className={classes.statInput}
            initialStatValue={data.damage}
            onStatChange={handleStateChange('damage')}
            label="Daño"
          />
        </Grid>
      </Grid>
      <br />
      <Typography>Modificadores</Typography>
      <List className={classes.modifiers} dense>
        {Object.keys(ATTACK_MODIFIERS).map((modifier) => {
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
              <Typography>{ATTACK_MODIFIERS[modifier]}</Typography>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

Attacker.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    roll: PropTypes.number,
    fumbleLevel: PropTypes.number,
    baseAttack: PropTypes.number,
    damage: PropTypes.number,
    modifiers: PropTypes.arrayOf(PropTypes.string),
    totalAttack: PropTypes.number,
  }).isRequired,
};

export default Attacker;
