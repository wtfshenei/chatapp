import {createContext, useEffect, useState} from "react";
import {auth} from '../assets/firebase/firebase.js'
import {onAuthStateChanged} from 'firebase/auth'

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        return () => {
            unsub()
        }
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}