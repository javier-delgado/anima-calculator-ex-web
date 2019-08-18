import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { sumBy, max, min, ceil } from 'lodash';

import Attacker from './attacker/Attacker';
import Defender from './defender/Defender';
import Critical from './critical/Critical';
import { ATTACK_MODIFIERS, DEFENSE_MODIFIERS } from '../../domain/modifiers.constants';

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

const CONSECUTIVE_DEFENSE_PENALTIES = {
  1: 0,
  2: -30,
  3: -50,
  4: -70,
  5: -90,
};

const DamageCalculator = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    mainText: '-',
    secondaryText: '-',
    finalDamage: 0,
    attackerData: {
      roll: 0,
      fumbleLevel: 0,
      baseAttack: 0,
      damage: 0,
      modifiers: [],
      totalAttack: 0,
    },
    defenderData: {
      roll: 0,
      fumbleLevel: 0,
      baseDefense: 0,
      ta: 0,
      consecutiveDefense: '1',
      modifiers: [],
      totalDefense: 0,
    },
  });

  const totalAttack = data => max([data.baseAttack + data.roll + sumBy(data.modifiers, mod => ATTACK_MODIFIERS[mod]), 0]);

  const totalDefense = (data) => {
    let defenseSum = data.baseDefense + data.roll + CONSECUTIVE_DEFENSE_PENALTIES[data.consecutiveDefense] + sumBy(data.modifiers, mod => DEFENSE_MODIFIERS[mod]);
    if (data.fumbleLevel > 0) defenseSum -= data.fumbleLevel;

    if (data.baseDefense + data.roll >= 0) return max([defenseSum, 0]);
    return defenseSum;
  };

  const calculateDamagePercentage = (result, defenderData) => {
    const absDifference = result - (20 + defenderData.ta * 10);
    return absDifference / 10 * 10;
  };

  const calculateDamageDealt = (damagePercentage, attackerDamage) => parseInt(ceil(damagePercentage * attackerDamage / 100), 10);

  const onAttackerChange = (newAtkData) => {
    setState({
      ...state,
      ...composeText(newAtkData, state.defenderData),
      attackerData: { ...newAtkData, totalAttack: totalAttack(newAtkData) },
    });
  };

  const onDefenderChange = (newDefData) => {
    setState({
      ...state,
      ...composeText(state.attackerData, newDefData),
      defenderData: { ...newDefData, totalDefense: totalDefense(newDefData) },
    });
  };

  const composeText = (attackerData, defenderData) => {
    const result = totalAttack(attackerData) - totalDefense(defenderData);
    const attackerFumbled = attackerData.fumbleLevel > 0;
    const defenderFumbled = defenderData.fumbleLevel > 0;

    if (attackerFumbled && !defenderFumbled) {
      return counterAttackText(attackerData.fumbleLevel);
    }

    if (result === 0 || (attackerFumbled && defenderFumbled)) {
      return noCombatText();
    }

    if (result < 0 && !defenderFumbled && !attackerFumbled) {
      let counterAttackBonus = parseInt(-result / 10, 10) * 5;
      counterAttackBonus = max([counterAttackBonus, 0]);
      counterAttackBonus = min([counterAttackBonus, 150]);
      return counterAttackText(counterAttackBonus);
    }

    const percentage = calculateDamagePercentage(result, defenderData);
    const damageDealt = calculateDamageDealt(percentage, attackerData.damage);

    return percentage > 0 ? attackerWinsResult(percentage, damageDealt, attackerData) : defenderWinsResult();
  };

  const noCombatText = () => ({
    mainText: 'No pasa nada',
    secondaryText: '-',
    finalDamage: 0,
  });

  const counterAttackText = counterAttackBonus => ({
    mainText: counterAttackBonus > 0 ? `Contraataque con +${counterAttackBonus} de bonus` : 'Contrataque sin bonus',
    secondaryText: '-',
    finalDamage: 0,
  });

  const defenderWinsResult = () => ({
    mainText: 'A la defensiva',
    secondaryText: '-',
    finalDamage: 0,
  });

  const attackerWinsResult = (percentage, damageDealt, attackerData) => ({
    mainText: `Daño causado: ${damageDealt}`,
    secondaryText: `${percentage}% causado de ${attackerData.damage} daño total`,
    finalDamage: damageDealt,
  });

  return (
    <Box className={classes.root}>
      <Box>
        <Box className={classes.top}>
          <Typography>{state.secondaryText}</Typography>
          <Typography variant="h5">{state.mainText}</Typography>
        </Box>
        <Box className={classes.bottom}>
          <Attacker data={state.attackerData} onChange={onAttackerChange} />
          <Defender data={state.defenderData} onChange={onDefenderChange} />
        </Box>
      </Box>
      <Box className={classes.right}>
        <Critical suggestedDamage={state.finalDamage} />
      </Box>
    </Box>
  );
};

export default DamageCalculator;
