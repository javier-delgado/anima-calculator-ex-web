import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';

/**
 * An input for the user to type a stat like initiative, Attack, Defense, etc.
 * Allows for simple math operators within the input (plus and minus)
 * @return {React.Component}
 */
const CharacterStatInput = ({initialStatValue}) => {
  const [statValue, setStatValue] = useState(initialStatValue);

  const handleChange = (event) => {
    setStatValue(addbits(event.target.value));
    console.log(statValue);
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
      return (s.replace(/\s/g, '').match(/[+\-]?([0-9\.]+)/g) || [])
          .reduce((sum, value) => {
            return parseFloat(sum) + parseFloat(value);
          });
    } catch (typeError) {
      console.error(typeError);
      return 0;
    }
  };

  return (
    <TextField onChange={handleChange} type={'number'} />
  );
};

CharacterStatInput.propTypes = {
  initialStatValue: PropTypes.number.isRequired,
};

export default CharacterStatInput;
