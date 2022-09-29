import { createContext, useEffect, useState, useReducer } from 'react'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'
import { createAction } from '../utils/reducer/reducer.utils'

//as the actual value you want to access
export const UserContext = createContext({
    //default value
    setCurrentUser: () => null,
    currentUser: null,
})

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': 'SET_CURRENT_USER'
}
const userReducer = (state, action) => {
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
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}
const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null)
    //state: current object stored by reducer, dispatch function: pass it an action object
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser)

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
        // dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

    const value = { currentUser, setCurrentUser };

    //run once when component mounts
    useEffect(() => {
        //Centralize sign in and sign out into the listener callback
        const unsubscribe = onAuthStateChangedListener((user) => {
            //when the listener mounts, check the authentication state automatically when you
            //initialize the listener
            if (user){
                createUserDocumentFromAuth(user);
            }
            //the user that passes through: either unauthenticated user object/ null (user signs out)
            setCurrentUser(user);
            console.log(user);
        })
        //Unsubscribe when it unmounts
        return unsubscribe
    }, []);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// const userReducer = (state, action) => {
//     return {
//         currentUser:
//     }
// }