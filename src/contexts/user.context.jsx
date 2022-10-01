import { createContext, useEffect, useState, useReducer } from 'react'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'
import { createAction } from '../utils/reducer/reducer.utils'

//as the actual value you want to access
export const UserContext = createContext({
    //default value
    setCurrentUser: () => null,
    currentUser: null,
})

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null)
    //state: current object stored by reducer, dispatch function: pass it an action object
    // const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);

    // const value = { currentUser, setCurrentUser };
 
    // return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// const userReducer = (state, action) => {
//     return {
//         currentUser:
//     }
// }