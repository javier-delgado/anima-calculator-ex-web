import React from 'react';
import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import ReactGA from 'react-ga';
import Container from '@material-ui/core/Container';
import CharacterList from './components/characterList/characterList.connector';
import theme from './materialTheme';

ReactGA.initialize(process.env.REACT_APP_ANAYLTICS_ID);
ReactGA.pageview('/');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <CharacterList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
