import React, { Suspense, useState } from 'react';
import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import ReactGA from 'react-ga';
import Container from '@material-ui/core/Container';
import CharacterList from './components/characterList/CharacterList';
import theme from './materialTheme';
import MobileWarning from './components/mobileWarning';
// import MainAppBar from './components/mainAppBar/MainAppBar';
import DamageCalculator from './components/damageCalculator/DamageCalculator';
import MigrationDialog from './components/migrationDialog/MigrationDialog';

if (process.env.NODE_ENV !== 'development') {
  ReactGA.initialize(process.env.REACT_APP_ANAYLTICS_ID);
  ReactGA.pageview('/');
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: theme.spacing(1),
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    marginBottom: theme.spacing(1),
    background: 'url("card-background.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleDialogClose = () => setDialogOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback="loading">
        <CssBaseline />
        {/* <MainAppBar /> */}
        <Container maxWidth="xl" className={classes.container}>
          <Paper className={classes.top}>
            <CharacterList />
            <MigrationDialog open={dialogOpen} onClose={handleDialogClose} />
          </Paper>
          <Box className={classes.bottom}>
            <DamageCalculator />
          </Box>
        </Container>
        <MobileWarning />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
