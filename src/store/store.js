import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga'



// export const store = compose(
//     applyMiddleware(sagaMiddleware),
//     window.devToolsExtension && window.devToolsExtension(),
// )(createStore)(rootReducer);

// export const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(sagaMiddleware),
//         composeWithDevTools()
//     )
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancers = [];

if (middleware.length > 0) {
    enhancers.push(applyMiddleware(...middleware));
}

export const store = createStore(rootReducer, composeEnhancers(...enhancers));

sagaMiddleware.run(rootSaga, store.dispatch);


