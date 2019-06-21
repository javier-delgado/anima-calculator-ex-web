import { connect } from 'react-redux';
import CharacterRow from './CharacterRow';
import { removeCharacter, updateCharacter } from '../../../redux/characters/characters.actions';

const mapStateToProps = (state, ownProps) => {
  const char = state.characters.find(item => item.uid === ownProps.characterUid);
  return {
    character: char,
    surprisedBy: state.characters.filter(otherChar => (otherChar.totalInitiative - char.totalInitiative > 150)),
  };
};

const mapDispatchToProps = ({
  removeCharacter,
  updateCharacter,
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterRow);
