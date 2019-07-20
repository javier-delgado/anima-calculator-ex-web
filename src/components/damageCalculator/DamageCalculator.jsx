import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { sumBy, max } from 'lodash';

import Attacker from './attacker/Attacker';
import Defender from './defender/Defender';
import { ATTACK_MODIFIERS, DEFENSE_MODIFIERS } from '../../domain/modifiers.constants';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
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

  const onAttackerChange = (newData) => {
    setState({
      ...state,
      ...composeText(newData),
      attackerData: { ...newData, totalAttack: totalAttack(newData) },
    });
  };

  const onDefenderChange = (newData) => {
    setState({
      ...state,
      ...composeText(newData),
      defenderData: { ...newData, totalDefense: totalDefense(newData) },
    });
  };

  const composeText = () => {
//     const result = 
//     if

//     when {
//       result == 0 || (attackerFumbled && defenderFumbled) -> {
//         noCombatResult()
//       }
//         (result < 0 || attackerFumbled) && !defenderFumbled -> {
//           val counterAttackBonus = - result / 10 * 5
//                 counterAttackResult(
//             when {
//               counterAttackBonus > 150 -> 150
//       counterAttackBonus < 0 -> 0
//                         else -> counterAttackBonus
//                     }
//                 )
//             }
//             else -> {
//   val percentage: Int = combat.calculateDamagePercentage()
//                 val damageDealt: Int = combat.calculateDamageDealt()

//                 if(percentage > 0)
// attackWinsResult(percentage, damageDealt)
//                 else
// defenseWinsResult()
//             }
//         }

    return {
      mainText: '-',
      secondaryText: '-',
    };
  };

  return (
    <>
      <Box className={classes.root}>
        <Typography>{state.secondaryText}</Typography>
        <Typography variant="h5">{state.mainText}</Typography>
      </Box>
      <Box className={classes.bottom}>
        <Attacker data={state.attackerData} onChange={onAttackerChange} />
        <Defender data={state.defenderData} onChange={onDefenderChange} />
      </Box>
    </>
  );
};

export default DamageCalculator;
