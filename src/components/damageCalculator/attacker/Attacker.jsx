import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sumBy } from 'lodash';

import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import DiceRoller from '../../../domain/diceRoller';
import { ATTACK_MODIFIERS } from '../../../domain/modifiers.constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
}));

const diceRoller = new DiceRoller();

const Attacker = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    roll: 0,
    baseAttack: 0,
    damage: 0,
    modifiers: [],
  });

  const totalAttack = () => state.baseAttack + state.roll + sumBy(state.modifiers, mod => ATTACK_MODIFIERS[mod]);

  const handleStateChange = field => (newValue) => {
    setState({
      ...state,
      [field]: newValue,
    });
  };

  const handleAttackRollClick = () => {
    const { finalResult, fumbleLevel } = diceRoller.perform();
    setState({ ...state, roll: finalResult });
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

  return (
    <Box className={classes.root}>
      <Typography gutterBottom>{`Ataque ${totalAttack()}`}</Typography>
      <CharacterStatInput
        className={classes.statInput}
        initialStatValue={state.roll}
        onStatChange={handleStateChange('roll')}
        label="Tirada de ataque"
        onRoll={handleAttackRollClick}
        withRollButton
      />
      <br />
      <CharacterStatInput
        className={classes.statInput}
        initialStatValue={state.baseAttack}
        onStatChange={handleStateChange('baseAttack')}
        label="Ataque base"
      />
      <br />
      <CharacterStatInput
        className={classes.statInput}
        initialStatValue={state.damage}
        onStatChange={handleStateChange('damage')}
        label="Daño"
      />
      <br />
      <Typography>Modificadores</Typography>
      <List className={classes.modifiers}>
        {Object.keys(ATTACK_MODIFIERS).map((modifier) => {
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
              <Typography>{ATTACK_MODIFIERS[modifier]}</Typography>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Attacker;
