import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: 120,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

/**
 * Displays the list of characters affected by surprise
 * (positively or negatively).
 * @return {React.Component}
 */
const Surprises = ({ character, otherCharacters }) => {
  const classes = useStyles();
  const [surprises, setSurprises] = useState([]);

  useEffect(() => {
    setSurprises([
      ...otherCharacters.filter(otherChar => (
        character.totalInitiative - otherChar.totalInitiative > (character.uroboros ? 100 : 150)
      )),
    ]);
  }, [character, otherCharacters]);

  const text = surprises.map(char => char.name).join(', ') || '-';

  return (
    <Tooltip title={text} placement="top">
      <div className={classes.root}>
        {text}
      </div>
    </Tooltip>
  );
};

const characterShape = PropTypes.shape({
  name: PropTypes.string,
  uroboros: PropTypes.bool,
  totalInitiative: PropTypes.number,
});

Surprises.propTypes = {
  character: characterShape.isRequired,
  otherCharacters: PropTypes.arrayOf(characterShape).isRequired,
};

export default Surprises;
