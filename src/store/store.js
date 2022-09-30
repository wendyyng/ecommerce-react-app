import { compose, configureStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

// root-reducer
import { rootReducer } from './root-reducer'

const middleWares = [logger];

//Middlewares
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore(rootReducer, undefined, composedEnhancers)

