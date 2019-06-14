import { connect } from 'react-redux';
import CharacterList from './CharacterList';
import { addCharacter,
  removeCharacter,
  updateCharacter,
  sortCharacters,
  rollInitiativeForAll } from '../../redux/characters/characters.actions';

const mapStateToProps = state => ({
  characters: state.characters,
});

const mapDispatchToProps = ({
  addCharacter,
  removeCharacter,
  updateCharacter,
  sortCharacters,
  rollInitiativeForAll,
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
