class DiceRoll {
  constructor(
    finalResult = 0,
    openRollCount = 0,
    results = [],
    fumbleLevel = 0,
    confirmedPalindromeCount = 0,
    tag = null,
  ) {
    this.finalResult = finalResult;
    this.openRollCount = openRollCount;
    this.results = results;
    this.fumbleLevel = fumbleLevel;
    this.confirmedPalindromeCount = confirmedPalindromeCount;
    this.tag = tag;
  }

  get didFumble() { return this._fumbleLevel > 0; }

  get didOpenRoll() { return this._openRollCount > 0; }

  get didPalindromeRoll() { return this._confirmedPalindromeCount > 0; }
}

export default DiceRoll;
