import { connect } from 'react-redux';
import CharacterList from './CharacterList';
import { addCharacter, updateCharacter, sortCharacters } from '../../redux/characters/characters.actions';

const mapStateToProps = state => ({
  characters: state.characters,
});

const mapDispatchToProps = ({
  addCharacter,
  updateCharacter,
  sortCharacters,
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
