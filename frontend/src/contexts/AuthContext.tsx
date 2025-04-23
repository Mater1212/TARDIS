"use client";

import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const login = (userData: any) => {
        const firstName = userData.fullName?.split(' ')[0] || 'User';
        const userWithFirst = { ...userData, firstName };

        console.log("Logging in with userData:", userData);

        localStorage.setItem('user', JSON.stringify(userWithFirst));
        setUser(userWithFirst);

        document.cookie = 'user=true; path=/';

        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);

        document.cookie = 'user=; Max-Age=0; path=/';

        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
