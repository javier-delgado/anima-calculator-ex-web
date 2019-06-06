import DiceRoll from '../models/diceRoll';
import DiceRollConfig from '../models/diceRollConfig';
import { randomIntegerBetween } from '../../../functions';

class DiceRoller {
  constructor(defaultRollConfig = new DiceRollConfig()) {
    this.defaultRollConfig = defaultRollConfig;
    this.roll = new DiceRoll();
  }

  perform() {
    this.roll = new DiceRoll();
    this.doRoll();
    return this.roll;
  }

  doRoll(rollConfig = this.defaultRollConfig) {
    let diceResult = this.random();

    if (rollConfig.fumbleEnabled && diceResult <= rollConfig.fumbleMaxValue) {
      this.roll.fumbleLevel = this.random();
      this.roll.results.push(diceResult);
      this.roll.finalResult += diceResult;
      return;
    }

    if (rollConfig.palindromeEnabled && diceResult > 9 && diceResult.isPalindrome()) {
      const confirmationRollValue = this.random();
      if (confirmationRollValue.isPalindrome()) {
        this.roll.confirmedPalindromeCount += 1;
        diceResult = 100;
      }
    }

    this.roll.results.push(diceResult);
    this.roll.finalResult += diceResult;

    if (rollConfig.openRollEnabled && diceResult >= rollConfig.openRollMinValue) {
      this.roll.openRollCount += 1;

      // If it's open, we roll again with fumble disabled
      const newOpenRollMinValue = (rollConfig.openRollMinValue < 100) ? (rollConfig.openRollMinValue + 1) : 100;
      const newRollConfig = { ...rollConfig, fumbleEnabled: false, openRollMinValue: newOpenRollMinValue };

      this.doRoll(newRollConfig);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  random() {
    return randomIntegerBetween(1, 100);
  }
}

export default DiceRoller;
