'use client';

import { CreditCard, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionPage() {
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
                        <CreditCard className="w-8 h-8 text-purple-500" />
                        Subscription
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Free Plan */}
                    <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">Current Plan</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Free Tier</h3>
                        <p className="text-3xl font-bold mb-6">$0<span className="text-sm text-white/40 font-normal">/month</span></p>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <Check className="w-4 h-4 text-green-500" />
                                Basic Resume Analysis
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <Check className="w-4 h-4 text-green-500" />
                                Access to Community Data
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <Check className="w-4 h-4 text-green-500" />
                                5 AI Chat Comparisons / day
                            </li>
                        </ul>

                        <button disabled className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-white/40 cursor-not-allowed">
                            Active
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-gradient-to-b from-purple-500/10 to-[#0F0F0F] border border-purple-500/20 rounded-xl p-6 relative">
                        <h3 className="text-xl font-bold mb-2 text-purple-400">Pro Access</h3>
                        <p className="text-3xl font-bold mb-6">$9<span className="text-sm text-white/40 font-normal">/month</span></p>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <Check className="w-4 h-4 text-purple-400" />
                                Advanced Resume Tailoring
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <Check className="w-4 h-4 text-purple-400" />
                                Unlimited AI Comparisons
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <Check className="w-4 h-4 text-purple-400" />
                                Priority Support
                            </li>
                        </ul>

                        <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                            Upgrade (Coming Soon)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
