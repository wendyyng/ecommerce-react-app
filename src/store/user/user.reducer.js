import { USER_ACTION_TYPES } from './user.types'

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    console.log('dispatched');
    console.log(action)

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            //don't respond to actions, return current state
            return state;
    }
}
