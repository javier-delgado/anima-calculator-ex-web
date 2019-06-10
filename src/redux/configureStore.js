import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

// Be sure to ONLY add this middleware in development!
const middleWares = process.env.NODE_ENV !== 'production'
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  ? [require('redux-immutable-state-invariant').default()]
  : [];

export default function configureStore() {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(...middleWares),
    ),
  );
}
