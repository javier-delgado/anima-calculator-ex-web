import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: 120,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

/**
 * Displays the list of characters affected by surprise
 * (positively or negatively).
 * @return {React.Component}
 */
const Surprise = ({ surprisedBy }) => {
  const classes = useStyles();

  const text = surprisedBy.map(char => char.name).join(', ') || '-';
  return (
    <Tooltip title={text} placement="top">
      <div className={classes.root}>
        {text}
      </div>
    </Tooltip>
  );
};

const characterShape = PropTypes.shape({
  name: PropTypes.string,
});

Surprise.propTypes = {
  characterUid: PropTypes.number.isRequired,
  evalFunc: PropTypes.func.isRequired,
  surprisedBy: PropTypes.arrayOf(characterShape).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const char = state.characters.find(item => item.uid === ownProps.characterUid);
  return {
    surprisedBy: state.characters.filter(otherChar => ownProps.evalFunc(char, otherChar)),
  };
};

export default connect(mapStateToProps)(Surprise);
