import React, { useState, useEffect, memo } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = withRollButton => makeStyles(() => ({
  textInput: {
    minWidth: withRollButton ? 76 : 40,
  },
  input: {
    fontSize: 14,
  },
  icon: {
    margin: 0,
  },
  adornment: {
    marginRight: -12,
  },
  svgIcon: {
    height: 24,
    width: 24,
  },
}));

/**
 * An input for the user to type a stat like initiative, Attack, Defense, etc.
 * Allows for simple math operators within the input (plus and minus)
 * @return {React.Component}
 */
const CharacterStatInput = ({ initialStatValue, onStatChange, withRollButton, onRoll, ...other }) => {
  const UNSIGNED_NUMBER_REGEX = /[+\-]?([0-9\.]+)/g; // eslint-disable-line
  const NUMBERS_AND_OPERANDS_REGEX = /[^\d+-]/g; // eslint-disable-line
  const classes = useStyles(withRollButton)();

  const [statText, setStatText] = useState(initialStatValue === 0 ? '' : initialStatValue);

  useEffect(() => {
    setStatText(initialStatValue === 0 ? '' : initialStatValue);
  }, [initialStatValue]);

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

  const inputProps = {
    classes: {
      input: classes.input,
    },
    endAdornment: withRollButton ? (
      <InputAdornment position="end" className={classes.adornment}>
        <IconButton
          edge="end"
          size="small"
          aria-label="Roll initiative"
          onClick={onRoll}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={classes.svgIcon} viewBox="0 0 512 512">
            <g transform="translate(0,0)" style={{ touchAction: 'none' }}>
              <path
                // eslint-disable-next-line max-len
                d="M375.483 251.243l-109.98 51.138.213 183.381L477.01 266.346l-86.993-21.81zm-12.736 108.626l-5.947 14.699-48.604-8.955 5.007-12.832a141.306 141.306 0 0 0 13.51-11.358 167.184 167.184 0 0 0 16.566-17.517 170.478 170.478 0 0 0 12.606-17.958 115.607 115.607 0 0 0 9.514-17.97l14.068 2.51q-9.37 22.334-30.361 44.43-13.296 13.64-20.645 18.636zM121.603 244.334l-84.71 21.763L246.474 486V302.38l-109.946-51.137zm19.147 50.852a28.72 28.72 0 0 1 24.273 6.802 53.052 53.052 0 0 1 11.226 14.188l-13.081 2.676a28.542 28.542 0 0 0-5.388-7.374q-5.185-4.876-11.262-3.853l-.487.095a6.458 6.458 0 0 0-5.162 4.448c-.856 2.378-.238 5.554 1.796 9.371q4.08 7.6 10.81 9.027a23.785 23.785 0 0 0 8.563-.203l1.867-.344 5.791 10.822q-6.398 1.427-8.23 3.282-3.21 3.14.429 9.93a17.042 17.042 0 0 0 6.089 6.696 10.406 10.406 0 0 0 7.385 1.534l.416-.083q4.757-.964 5.079-4.757c.261-2.57-.655-5.744-2.748-9.514l12.38-2.545a49.247 49.247 0 0 1 4.103 11.226 19.956 19.956 0 0 1-.642 9.383 11.702 11.702 0 0 1-3.96 5.411 19.575 19.575 0 0 1-8.027 3.235l-1.19.214a27.971 27.971 0 0 1-17.494-2.7 32.193 32.193 0 0 1-14.128-14.092q-3.627-6.79-2.604-12.19a8.396 8.396 0 0 1 2.521-4.947h-.071q-1.844.31-7.04-2.497a32.11 32.11 0 0 1-12.916-13.593q-5.245-9.764-3.282-18.398 1.962-8.634 13.676-11zM27.19 248.865l108.78-116.309a7.135 7.135 0 0 1 1.427 0h.154q3.14.345 2.842 3.71a19.36 19.36 0 0 1-3.294 8.1 39.376 39.376 0 0 1-9.728 10.405q-3.912 2.938-15.044 9.514-12.796 7.505-19.55 14.77a92.535 92.535 0 0 0-11.513 14.486l32.907 3.758 8.182-12.963-20.967-2.378a36.415 36.415 0 0 1 4.757-3.83q2.379-1.605 8.444-5.125l6.422-3.747a92.975 92.975 0 0 0 12.903-8.776 61.472 61.472 0 0 0 12.51-14.414q6.84-10.846 6.494-17.957c-.19-3.949-2.105-6.434-5.684-7.505l79.798-85.161-102.097 179.576-5.708 10.06zm367.238-71.974q-3.817-5.458-3.758-8.515c0-2.033 1.19-3.199 3.568-3.448h.57a11.892 11.892 0 0 1 6.91 2.247 29.85 29.85 0 0 1 7.837 8.051q3.687 5.28 3.71 8.397c0 2.093-1.188 3.258-3.496 3.567h-.594a11.75 11.75 0 0 1-6.957-2.378 29.79 29.79 0 0 1-7.79-7.885zm-109.41-141.52l83.948 89.634h-1.189c-.38 0-.975 0-1.463.107q-7.825.892-8.324 6.862-.5 5.97 5.03 13.747a53.778 53.778 0 0 0 6.375 7.374 37.901 37.901 0 0 0 10.144 6.897q-2.117 2.89-.702 7.98a37.283 37.283 0 0 0 5.613 11.096 55.122 55.122 0 0 0 15.223 14.806q8.098 5.268 16.066 4.935.81 0 1.618-.13 8.776-.988 9.228-7.873a16.114 16.114 0 0 0-.463-4.853l58.689 62.686-91.572-22.941-6.1-10.703zm98.22 104.927l2.45 2.617c.451.57.903 1.189 1.355 1.784 1.808 2.592 2.723 4.757 2.723 6.529 0 1.771-1.034 2.782-3.127 3.02h-.512a10.346 10.346 0 0 1-6.077-1.95 22.596 22.596 0 0 1-6.184-6.137c-1.974-2.83-2.937-5.102-2.878-6.814.06-1.713 1.118-2.7 3.187-2.937h.524a10.263 10.263 0 0 1 6.005 1.879 19.147 19.147 0 0 1 2.533 2.01zM255.987 26L137.456 231.026l118.532 55.05 118.604-55.05zm-1.19 208.463q-17.529 0-24.58-12.273-7.053-12.273-7.053-34.988 0-22.714 7.052-35.047 7.052-12.332 24.582-12.344 17.53 0 24.582 12.332 7.052 12.333 7.052 35.047 0 22.715-7.052 34.988-7.053 12.273-24.582 12.285zm10.538-71.807q2.497 7.968 2.497 24.546 0 15.817-2.497 24.201-2.498 8.384-10.537 8.325-8.04 0-10.632-8.325-2.593-8.324-2.593-24.2 0-16.579 2.593-24.547t10.632-7.968q8.015-.012 10.513 7.956z"
                fill="#B11016"
                fillOpacity={1}
              />
            </g>
          </svg>
        </IconButton>
      </InputAdornment>
    ) : undefined,
  };

  return (
    <TextField
      className={classes.textInput}
      onChange={handleChange}
      value={statText}
      InputProps={inputProps}
      {...other}
    />
  );
};

CharacterStatInput.defaultProps = {
  onStatChange: () => {},
  withRollButton: false,
  onRoll: () => {},
};

CharacterStatInput.propTypes = {
  initialStatValue: PropTypes.number.isRequired,
  onStatChange: PropTypes.func,
  withRollButton: PropTypes.bool,
  onRoll: PropTypes.func,
};

export default memo(CharacterStatInput);
