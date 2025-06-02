import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { successToast, failToast } from '../Utils/ToastMessages';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [preferences, setPreferences] = useState(null);
    const [user, setUser] = useState(null); // Only non-HttpOnly values like email (if available)
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    // Ensure axios sends cookies with requests
    axios.defaults.withCredentials = true;

    const location = useLocation()
    const from = sessionStorage.getItem('redirectAfterLogin') || '/';
    useEffect(() => {

        console.log("auth page", from);

        // Optional: check auth status from server
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${url}/auth/status`, { withCredentials: true });


                if (res.data?.message === "Authenticated") {
                    setIsAuthenticated(true);
                    setUser({ email: res.data.email }); // if server sends email
                    // const res=await update
                    if (from === "/login" || from === "/signup") {
                        sessionStorage.removeItem('redirectAfterLogin');
                        navigate(from, { replace: true });
                    }

                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (err) {
                setIsAuthenticated(false);
                setUser(null);
            }
        };
        checkAuth();
    }, [isAuthenticated]);

    const login = async (formData) => {


        try {
            const response = await axios.post(`${url}/auth/login`, formData, {
                withCredentials: true, // important for cookie handling
            });

            successToast('Login successful!');
            setIsAuthenticated(true);
            setUser({ email: response.data.email }); // if email is sent back
            navigate('/');
        } catch (error) {
            const message =
                error.response?.data?.message || error.response?.statusText || 'Login failed';
            failToast(message);
            setIsAuthenticated(false);
            setUser(null);

        }
    };

    const signup = async (formData) => {
        try {
            const response = await axios.post(`${url}/auth/signup`, formData, {
                withCredentials: true,
            });

            if (response.status === 201 || response.status === 200) {
                successToast('Account created! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            const message =
                error.response?.data?.message || error.response?.statusText || 'Signup failed';
            failToast(message);

        }
    };

    const logout = async () => {
        try {
            await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });
            successToast('Logged out successfully!');
        } catch (err) {
            failToast('Logout failed, please try again.');
        }
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };



    const updatePreferences = async (preferencesArray) => {
        try {


            const res = await axios.put(
                `${url}/auth/update`,
                { preferences: preferencesArray }, // ✅ wrap array in object
                { withCredentials: true }
            );



            if (res.data?.statusCode === 200) {
                successToast("Updated preferences");
                setPreferences(res.data.data.preferences);
            } else {
                failToast("Update failed", res.data?.message || "Unknown error");
            }
        } catch (error) {

            failToast("Updation failed", error.response?.data?.message || error.message);
        }
    };


    const getPreferences = async () => {
        try {
            const res = await axios.get(`${url}/auth`, { withCredentials: true })
            setPreferences(res.data.data.preferences)

        } catch (error) {

        }
    }


    return (
        <AuthContext.Provider value={{ login, signup, logout, isAuthenticated, user, updatePreferences, getPreferences, preferences, setPreferences }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
