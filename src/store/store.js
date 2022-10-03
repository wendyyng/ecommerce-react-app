import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

// root-reducer
import { rootReducer } from './root.reducer'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//If not in production, don't render the logger
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
    Boolean
);

//if not in production and 
//there's a window object and dev tools exists then use this compose, otherwise use copmose we have from redux
const composeEnhancer = 
(process.env.NODE_ENV !== 'production' && 
    window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//Library helpers run before an action hits the reducers
//compose is used to pass multiple functions
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store);