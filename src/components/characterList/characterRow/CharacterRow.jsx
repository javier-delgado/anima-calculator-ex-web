import React from 'react';
import CharacterStatInput from '../../characterStatInput/CharacterStatInput';
import RollDiceButton from '../../rollDiceButton/RollDiceButton';
import SurpriseDetail from './surpriseDetail/SurpriseDetail';

/**
 * A row containing the data for a character.
 */
const CharacterRow = () => {
    return (
        <>
            <div>CharacterRow</div>
            <CharacterStatInput />
            <RollDiceButton />
            <SurpriseDetail />
        </>
    )
};

export default CharacterRow;
