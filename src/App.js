import React from 'react';
import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CharacterList from './components/characterList/CharacterList';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="ld">
        <CharacterList />
      </Container>
    </>
  );
}

export default App;
