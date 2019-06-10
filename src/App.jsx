import React from 'react';
import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CharacterList from './components/characterList/characterList.connector';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <CharacterList />
      </Container>
    </>
  );
}

export default App;
