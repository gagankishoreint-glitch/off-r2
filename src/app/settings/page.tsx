'use client';

import { Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/companies"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <SettingsIcon className="w-8 h-8 text-blue-500" />
                        Settings
                    </h1>
                </div>

                <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <span className="text-2xl font-bold text-blue-500">
                                    {user?.displayName?.[0] || 'U'}
                                </span>
                            </div>
                        )}
                        <div>
                            <h2 className="text-xl font-medium">{user?.displayName || 'User'}</h2>
                            <p className="text-white/40">{user?.email}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-400">
                            Account settings and preferences will be available soon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
