import { createContext, useEffect, useState } from 'react'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

//as the actual value you want to access
export const UserContext = createContext({
    //default value
    setCurrentUser: () => null,
    currentUser: null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
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