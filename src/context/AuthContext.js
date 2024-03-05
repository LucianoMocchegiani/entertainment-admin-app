"use client"
import {createContext , useContext, useEffect, useState} from 'react';
import {signInWithPopup ,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../firebase/firebase';

export const authContext = createContext();
export function useAuth (){
    const context = useContext(authContext)
    return context
}


export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const signup = (email , password ) => 
        createUserWithEmailAndPassword(auth, email, password)
        .then(function(res) {return ({successful:res})})
        .catch(function(res) {return ({error:res.message})});
    const login = async (email, password ) =>
        signInWithEmailAndPassword(auth, email, password)
        .then(function(res) {return ({successful:res})})
        .catch(function(res) {return ({error:res.message})});
    const logout = async () => {
        try{
        await signOut(auth)
            return {success:'Logout successful!'}
        }
        catch{
            return {error:'Logout failed'}
        }
    }
    const loginWithGoogle =  () => {
        const googleProvider =  new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
    },[])
    return (
        <authContext.Provider value={{signup, login, user, logout, loading, setLoading, loginWithGoogle,}}>
             {children}
        </authContext.Provider>
    )
}