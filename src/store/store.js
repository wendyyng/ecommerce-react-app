import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

// root-reducer
import { rootReducer } from './root.reducer'

const middleWares = [logger];

//Library helpers run before an action hits the reducers
//compose is used to pass multiple functions
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers)

