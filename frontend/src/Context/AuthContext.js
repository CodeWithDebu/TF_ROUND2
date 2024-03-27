import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged} from "firebase/auth";
import {auth} from '../Firebase.js';
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    // const navigate = useNavigate();

    const googleSignIn = ()  => {
        const provider = new GoogleAuthProvider();
         signInWithPopup(auth, provider)
        //  navigate('/workshops');
    }

    const gochaGo = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log('user', currentUser)
            // navigate('/workshops')
        });
        return ()  => {
            unsubscribe()
        }   
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, gochaGo, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )

}

export const UserAuth = () => {
    return useContext(AuthContext)
}