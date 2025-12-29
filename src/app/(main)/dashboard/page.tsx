"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
    FileText,
    Building2,
    Calculator,
    Scale,
    ArrowRight,
    TrendingUp,
    Clock
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const quickActions = [
        {
            title: "Resume Scanner",
            description: "Check your resume against ATS score and job descriptions",
            icon: FileText,
            href: "/resume",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20"
        },
        {
            title: "Explore Companies",
            description: "Discover salaries and reviews for top tech companies",
            icon: Building2,
            href: "/companies",
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20"
        },
        {
            title: "Compare Offers",
            description: "AI-powered comparison of your job offers",
            icon: Scale,
            href: "/compare",
            color: "text-green-500",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20"
        },
        {
            title: "CTC Calculator",
            description: "Calculate your in-hand salary and tax breakdown",
            icon: Calculator,
            href: "/calculator",
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
            borderColor: "border-orange-500/20"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back, {user.displayName?.split(' ')[0] || 'User'}! 👋
                </h1>
                <p className="text-white/60">
                    Track your career progress and manage your applications
                </p>
            </div>

            {/* Quick Stats / Recent Activity Placeholder */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <h3 className="font-medium text-white">Market Status</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">Bullish</p>
                    <p className="text-xs text-white/40 mt-1">Tech hiring up 12% relative to last month</p>
                </div>
            </div> */}

            {/* Quick Actions Grid */}
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action) => (
                    <Link
                        key={action.title}
                        href={action.href}
                        className="group bg-[#0F0F0F] hover:bg-[#151515] border border-white/10 hover:border-white/20 rounded-xl p-6 transition-all duration-200"
                    >
                        <div className={`w-12 h-12 rounded-lg ${action.bgColor} ${action.borderColor} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                            <action.icon className={`w-6 h-6 ${action.color}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-between">
                            {action.title}
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                        </h3>
                        <p className="text-sm text-white/50">
                            {action.description}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Recent Analysis Section (Placeholder) */}
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        View All
                    </button>
                </div>

                <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-8 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <Clock className="w-8 h-8 text-white/20" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-white mb-1">No recent activity</h3>
                            <p className="text-white/50 mb-4 text-sm">
                                Start by scanning your resume or comparing job offers to see your history here.
                            </p>
                            <Link
                                href="/resume"
                                className="inline-flex items-center justify-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-colors"
                            >
                                Start Resume Scan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
