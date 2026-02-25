import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Simple mock validation: if email contains 'teacher', login as teacher, else student
        const role = email.toLowerCase().includes('teacher') ? 'teacher' : 'student';
        const userData = {
            id: role === 'teacher' ? 't1' : 's1',
            name: role === 'teacher' ? 'Pro. Smith' : 'John Doe',
            role: role,
            email: email
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const signup = (name, email, password, role) => {
        const userData = {
            id: 'u' + Date.now(),
            name: name,
            role: role,
            email: email
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
