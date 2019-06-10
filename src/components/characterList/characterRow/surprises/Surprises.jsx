import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the list of characters affected by surprise
 * (positively or negatively).
 * @return {React.Component}
 */
const Surprises = ({ character, otherCharacters }) => {
  const [surprises, setSurprises] = useState([]);

  useEffect(() => {
    setSurprises([
      ...otherCharacters.filter(otherChar => (
        character.totalInitiative - otherChar.totalInitiative > (character.uroboros ? 100 : 150)
      )),
    ]);
  }, [character, otherCharacters]);

  return (
    <div>
      {surprises.map(char => char.name).join(', ') || '-'}
    </div>
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
