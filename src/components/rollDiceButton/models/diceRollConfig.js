class DiceRollConfig {
  constructor(
    openRollEnabled = true,
    fumbleEnabled = true,
    palindromeEnabled = false,
    fumbleMaxValue = 3,
    openRollMinValue = 90,
  ) {
    this.openRollEnabled = openRollEnabled;
    this.fumbleEnabled = fumbleEnabled;
    this.palindromeEnabled = palindromeEnabled;
    this.fumbleMaxValue = fumbleMaxValue;
    this.openRollMinValue = openRollMinValue;
  }
}

export default DiceRollConfig;
