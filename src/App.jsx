import React from 'react';
import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import Container from '@material-ui/core/Container';
import CharacterList from './components/characterList/CharacterList';
import theme from './materialTheme';
import MainAppBar from './components/mainAppBar/MainAppBar';

ReactGA.initialize(process.env.REACT_APP_ANAYLTICS_ID);
ReactGA.pageview('/');

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: theme.spacing(1),
  },
  bottomPaper: {
    flex: '0 0 50%',
    overflow: 'scroll',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <MainAppBar /> */}
      <Container maxWidth="xl" className={classes.container}>
        <CharacterList />
        {/* <Paper className={classes.bottomPaper}>Bottom component</Paper> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
