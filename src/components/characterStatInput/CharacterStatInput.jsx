import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

/**
 * An input for the user to type a stat like initiative, Attack, Defense, etc.
 * Allows for simple math operators within the input (plus and minus)
 * @return {React.Component}
 */
const CharacterStatInput = ({ initialStatValue, onStatChange }) => {
  const UNSIGNED_NUMBER_REGEX = /[+\-]?([0-9\.]+)/g; // eslint-disable-line
  const NUMBERS_AND_OPERANDS_REGEX = /[^\d+-]/g; // eslint-disable-line

  const [statText, setStatText] = useState(initialStatValue);

  const handleChange = (event) => {
    const cleanText = removeUnwantedChars(event.target.value);
    setStatText(cleanText);
    const sum = addbits(cleanText);
    onStatChange(sum);
  };

  /**
   * Performs simple math operations (addition, substracion) on a String
   * @param {String} s
   * @return {Number} Result of the operation
   */
  const addbits = (s) => {
    try {
      return (s.match(UNSIGNED_NUMBER_REGEX) || [])
        .map(item => parseFloat(item))
        .reduce((sum, value) => sum + value, 0);
    } catch (typeError) {
      console.error(typeError);
      return 0;
    }
  };

  const removeUnwantedChars = s => s.replace(NUMBERS_AND_OPERANDS_REGEX, '');

  return (
    <TextField onChange={handleChange} value={statText} />
  );
};

CharacterStatInput.defaultProps = {
  onStatChange: () => {},
};

CharacterStatInput.propTypes = {
  initialStatValue: PropTypes.number.isRequired,
  onStatChange: PropTypes.func,
};

export default CharacterStatInput;
