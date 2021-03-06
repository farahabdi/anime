import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';


export default (initialState = {}) => {
  let middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV !== 'production') {
    const { devToolsExtension } = window;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(rootReducer, initialState, middleware);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};
