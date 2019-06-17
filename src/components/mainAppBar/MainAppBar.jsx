import React from 'react';
import { makeStyles, SvgIcon } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AndroidIcon from '@material-ui/icons/Android';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  svgIcon: {
    width: 26,
    height: 26,
  },
  downloadText: {
    marginRight: 24,
    marginTop: 8,
  },
}));

const MainAppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Anima Calculator Ex
          </Typography>

          <Typography className={classes.downloadText}>
            Downloads:
          </Typography>
          <IconButton
            className={classes.iconButton}
            color="inherit"
            aria-label="Download for Android"
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.javierdelgado.anima_calculator_ex"
          >
            <AndroidIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            color="inherit"
            aria-label="Download for Windows"
            target="_blank"
            href="desktopBuilds/Anima Calculator Ex Setup.exe"
          >
            <SvgIcon className={classes.svgIcon}>
              <path
                // eslint-disable-next-line max-len
                d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z"
                fill="#ffffff"
              />
            </SvgIcon>
          </IconButton>
          <IconButton
            className={classes.iconButton}
            color="inherit"
            aria-label="Download for Mac OS"
            target="_blank"
            href="desktopBuilds/Anima Calculator Ex.dmg"
          >
            <SvgIcon className={classes.svgIcon}>
              <path
                // eslint-disable-next-line max-len
                d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"
                fill="#ffffff"
              />
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainAppBar;