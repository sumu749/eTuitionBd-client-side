import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = async (name, photo) => {
        setLoading(true);
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No authenticated user available");
        }

        await updateProfile(user, {
            displayName: name,
            photoURL: photo,
        });

        setUser(auth.currentUser);
        return auth.currentUser;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleLogin,
        logoutUser,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
