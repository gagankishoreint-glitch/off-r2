// Authentication Context Provider
// Manages Firebase authentication state and provides auth methods

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase/config';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isFirebaseConfigured || !auth) {
            console.warn('[Auth] Firebase not configured - auth disabled');
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                console.log('[Auth] User signed in:', user.email);
            }
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        if (!isFirebaseConfigured || !auth) {
            throw new Error('Firebase not configured. Please set up Firebase Authentication.');
        }

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account',
        });

        try {
            const result = await signInWithPopup(auth, provider);
            console.log('[Auth] Google sign-in successful:', result.user.email);
        } catch (error: any) {
            console.error('[Auth] Google sign-in error:', error);
            throw new Error(error.message || 'Google sign-in failed');
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        if (!isFirebaseConfigured || !auth) {
            throw new Error('Firebase not configured');
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('[Auth] Email sign-in successful');
        } catch (error: any) {
            console.error('[Auth] Email sign-in error:', error);
            throw new Error(error.message || 'Sign in failed');
        }
    };

    const signUpWithEmail = async (email: string, password: string) => {
        if (!isFirebaseConfigured || !auth) {
            throw new Error('Firebase not configured');
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('[Auth] Email sign-up successful');
        } catch (error: any) {
            console.error('[Auth] Email sign-up error:', error);
            throw new Error(error.message || 'Sign up failed');
        }
    };

    const signOut = async () => {
        if (!isFirebaseConfigured || !auth) {
            throw new Error('Firebase not configured');
        }

        try {
            await firebaseSignOut(auth);
            console.log('[Auth] Sign out successful');
        } catch (error: any) {
            console.error('[Auth] Sign out error:', error);
            throw new Error(error.message || 'Sign out failed');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signInWithGoogle,
                signInWithEmail,
                signUpWithEmail,
                signOut,
                isConfigured: isFirebaseConfigured,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
