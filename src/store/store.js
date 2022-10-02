import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

// root-reducer
import { rootReducer } from './root.reducer'

const loggerMiddleware = (store) => (next) => (action) => {
    //log out appropriate action
    if(!action.type){
        //nothing happens
        return next(action);
    }
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState());

    //pass the action along now, updating reducers
    next(action);
    console.log('next state: ', store.getState());
}

const middleWares = [logger];

//Library helpers run before an action hits the reducers
//compose is used to pass multiple functions
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers)

