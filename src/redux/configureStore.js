import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

// Be sure to ONLY add this middleware in development!
const middleWares = process.env.NODE_ENV !== 'production'
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  ? [require('redux-immutable-state-invariant').default()]
  : [];

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(...middleWares),
    ),
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
