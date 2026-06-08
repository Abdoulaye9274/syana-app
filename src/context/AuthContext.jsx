import { createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    updatePassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import { auth } from '@/services/firebase/config'
import { getUserProfile } from '@/services/users'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(authUser)

            if (authUser) {
                // Récupérer le profil utilisateur depuis Firestore
                try {
                    const profile = await getUserProfile(authUser.uid)
                    setUserProfile(profile)
                } catch (error) {
                    console.error('Error fetching user profile:', error)
                    setUserProfile(null)
                }
            } else {
                setUserProfile(null)
            }

            setLoading(false)
        })

        return unsubscribe
    }, [])

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUser = (displayName) => {
        return updateProfile(auth.currentUser, { displayName })
    }

    const updateUserPassword = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword)
    }

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const value = {
        user,
        userProfile,
        loading,
        signup,
        login,
        logout,
        resetPassword,
        updateUser,
        updateUserPassword,
        loginWithGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
