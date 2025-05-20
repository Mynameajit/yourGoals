import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { auth } from '../Config/firebase';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const curentUser = auth.currentUser
        if (curentUser) {
            setIsAuth(true)
        }

    }, [user]);



    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const createUser = await signInWithEmailAndPassword(auth, email, password)
            setIsAuth(true)
            toast.success("User Login")
            setIsLoading(false)

        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)

        }

    };


    const handleRegister = async () => {
        try {
            setIsLoading(true)
            const createUser = await createUserWithEmailAndPassword(auth, email, password)
            setIsAuth(true)
            toast.success("User Create Successfully")
            setIsLoading(false)
            
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)

        }
    };



    const handleLogout = async () => {
        try {
            setIsLoading(true)
             await signOut(auth);
            setIsAuth(false)
            setIsLoading(false)
            toast.success("LogOut")
            window.onload()
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    };


    return (
        <UserContext.Provider value={{
            isAuth,
            isLogin,
            setIsLogin,
            userName,
            setUserName,
            email,
            setEmail,
            password,
            setPassword,
            handleLogin,
            handleRegister,
            handleLogout,
            setAnchorEl,
            anchorEl,
            isLoading,
            user

        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
