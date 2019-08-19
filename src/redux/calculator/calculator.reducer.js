import { sumBy, max, min, ceil } from 'lodash';

import { UPDATE_ATTACKER_DATA, UPDATE_DEFENDER_DATA } from './calculator.constants';
import { ATTACK_MODIFIERS, DEFENSE_MODIFIERS } from '../../domain/modifiers.constants';

const CONSECUTIVE_DEFENSE_PENALTIES = {
  1: 0,
  2: -30,
  3: -50,
  4: -70,
  5: -90,
};

const initialState = {
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
};

const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ATTACKER_DATA: {
      const newAttackerData = { ...state.attackerData, ...action.changes };
      return {
        ...state,
        ...composeText(newAttackerData, state.defenderData),
        attackerData: {
          ...newAttackerData,
          totalAttack: totalAttack(newAttackerData),
        },
      };
    }
    case UPDATE_DEFENDER_DATA: {
      const newDefenderData = { ...state.defenderData, ...action.changes };
      return {
        ...state,
        ...composeText(state.attackerData, newDefenderData),
        totalDefense: totalDefense(newDefenderData),
        defenderData: {
          ...newDefenderData,
          totalDefense: totalDefense(newDefenderData),
        },
      };
    }
    default:
      return state;
  }
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

const calculateDamagePercentage = (result, defenderData) => {
  const absDifference = result - (20 + defenderData.ta * 10);
  return absDifference / 10 * 10;
};

const calculateDamageDealt = (damagePercentage, attackerDamage) => parseInt(ceil(damagePercentage * attackerDamage / 100), 10);

const totalAttack = data => max([data.baseAttack + data.roll + sumBy(data.modifiers, mod => ATTACK_MODIFIERS[mod]), 0]);

const totalDefense = (data) => {
  let defenseSum = data.baseDefense + data.roll + CONSECUTIVE_DEFENSE_PENALTIES[data.consecutiveDefense] + sumBy(data.modifiers, mod => DEFENSE_MODIFIERS[mod]);
  if (data.fumbleLevel > 0) defenseSum -= data.fumbleLevel;

  if (data.baseDefense + data.roll >= 0) return max([defenseSum, 0]);
  return defenseSum;
};

export default calculatorReducer;
