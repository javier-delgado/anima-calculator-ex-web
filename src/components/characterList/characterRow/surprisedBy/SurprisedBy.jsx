import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the list of characters affected by surprise
 * (positively or negatively).
 * @return {React.Component}
 */
const SurprisedBy = ({ character, otherCharacters }) => {
  const [surprisedBy, setSurprisedBy] = useState([]);

  useEffect(() => {
    setSurprisedBy([
      ...otherCharacters.filter(otherChar => (otherChar.totalInitiative - character.totalInitiative > 150)),
    ]);
  }, [character, otherCharacters]);

  return (
    <div>
      {surprisedBy.map(char => char.name).join(', ') || '-'}
    </div>
  );
};

const characterShape = PropTypes.shape({
  name: PropTypes.string,
  uroboros: PropTypes.bool,
  totalInitiative: PropTypes.number,
});

SurprisedBy.propTypes = {
  character: characterShape.isRequired,
  otherCharacters: PropTypes.arrayOf(characterShape).isRequired,
};

export default SurprisedBy;
