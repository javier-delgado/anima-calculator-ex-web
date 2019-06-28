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
  typography: {
    fontSize: 12,
  },
  spacing: 4,
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: 4,
      },
    },
    MuiTableCell: {
      sizeSmall: {
        padding: '2px 8px',
      },
    },
  },
});

export default theme;
