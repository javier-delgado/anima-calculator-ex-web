import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';

/**
 * An input for the user to type a stat like initiative, Attack, Defense, etc.
 * Allows for simple math operators within the input (plus and minus)
 * @return {React.Component}
 */
const CharacterStatInput = ({initialStatValue, onStatChange}) => {
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
    if (isEmpty(s)) return 0;

    try {
      // eslint-disable-next-line
      const numbers = (s.replace(/\s/g, '').match(/[+\-]?([0-9\.]+)/g) || []).map((item) => parseFloat(item));
      return numbers.reduce((sum, value) => sum + value);
    } catch (typeError) {
      console.error(typeError);
      return 0;
    }
  };

  const removeUnwantedChars = (s) => s.replace(/[^\d+-]/g, '');

  return (
    <TextField onChange={handleChange} value={statText} />
  );
};

CharacterStatInput.propTypes = {
  initialStatValue: PropTypes.number.isRequired,
  onStatChange: PropTypes.func,
};

export default CharacterStatInput;
