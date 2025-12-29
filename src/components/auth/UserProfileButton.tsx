// User Profile Button Component
// Shows user avatar and provides sign-in/out functionality

'use client';

import { useState } from 'react';
import { User, LogOut, Settings, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function UserProfileButton() {
    const { user, signOut, loading, isConfigured } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            setShowMenu(false);
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    // If Firebase not configured, show setup button
    if (!isConfigured) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-xs text-yellow-400/60">Auth not configured</span>
                <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                    Setup Auth
                </button>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        );
    }

    // Not signed in
    if (!user) {
        return (
            <>
                <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    Sign In
                </button>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </>
        );
    }

    // Signed in
    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-6 h-6 rounded-full"
                    />
                ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                )}
                <span className="text-sm text-white">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                </span>
            </button>

            {/* Dropdown menu */}
            {showMenu && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[#0F0F0F] border border-white/10 rounded-lg shadow-2xl z-50">
                        <div className="p-3 border-b border-white/10">
                            <p className="text-sm font-medium text-white">{user.displayName || 'User'}</p>
                            <p className="text-xs text-white/60 truncate">{user.email}</p>
                        </div>

                        <div className="p-1">
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    // Navigate to profile
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>

                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    // Navigate to subscription
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors"
                            >
                                <CreditCard className="w-4 h-4" />
                                Subscription
                            </button>

                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
