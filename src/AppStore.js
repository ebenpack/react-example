import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import appReducer from './AppModule';
import appSaga from './AppSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    appReducer,
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware
        )
    )
);

sagaMiddleware.run(appSaga);

export default store;