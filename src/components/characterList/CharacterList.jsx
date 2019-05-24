import React from 'react';
import CharacterRow from './characterRow/CharacterRow';

/**
 * A list of character rows.  Used to keep track of initiative and other stats.
 * @return {React.Component}
 */
const CharacterList = () => {
  return (
    <>
      <div>Character list</div>
      <CharacterRow/>
    </>
  );
};

export default CharacterList;
