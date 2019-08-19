import { combineReducers } from 'redux';
import characters from './characters/characters.reducer';
import calculator from './calculator/calculator.reducer';

export default combineReducers({
  characters,
  calculator,
});
