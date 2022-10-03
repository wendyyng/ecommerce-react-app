export const loggerMiddleware = (store) => (next) => (action) => {
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