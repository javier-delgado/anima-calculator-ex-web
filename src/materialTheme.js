import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: '#000000',
    },
    accent: {
      main: '#B11016',
    },
    lightText: '#FAFAFA',
  },
});

export default theme;
