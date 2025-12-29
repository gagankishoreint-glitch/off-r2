"use client";

import Link from "next/link";
import { Radar, Sun, Moon, DollarSign, Zap, Target } from "lucide-react";
import { useTheme } from "@/store/use-theme-store";
import { useUserStore } from "@/store/use-user-store";

import AuthModal from "@/components/auth/AuthModal";
import { useState } from "react";

export default function LandingPage() {
    const { theme, toggleTheme } = useTheme();
    const userCount = useUserStore(state => state.getUserCount());
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Auth Modal */}
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab="signup" />

            {/* Navigation */}
            <header className="px-6 lg:px-12 h-16 flex items-center bg-background">
                <Link className="flex items-center gap-2 font-bold text-xl" href="/">
                    <Radar className="w-6 h-6" />
                    <span className="font-heading font-bold text-foreground">Off-Radar</span>
                </Link>
                <nav className="ml-auto flex items-center gap-6">
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/about">
                        About Us
                    </Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/compare">
                        Compare Offers
                    </Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/contact">
                        Contact
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md hover:bg-muted transition-colors"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Moon className="w-5 h-5 text-muted-foreground" />
                        )}
                    </button>
                    <button
                        onClick={() => setShowAuthModal(true)}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => setShowAuthModal(true)}
                        className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors"
                    >
                        Join Community
                    </button>
                </nav>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-20 md:py-28 lg:py-36">
                    <div className="container px-6 md:px-12 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            {/* Badge with Live User Count */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-muted rounded-full text-sm">
                                <span className="text-purple-600 font-semibold">{userCount.toLocaleString()}+</span>
                                <span className="text-muted-foreground">Students utilizing community intelligence</span>
                            </div>

                            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
                                Career decisions<br />
                                made clearer with<br />
                                <span className="text-muted-foreground">honest data</span>
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed">
                                Use Off-Radar as your trusted career ally. Instantly compare internship offers,
                                decode complex salary structures, and understand company culture trade-offs.
                                We help you navigate the noise of recruitment to find the signal in your career path.
                            </p>

                            <div className="flex gap-4 mt-4">
                                <Link href="/companies">
                                    <button className="px-8 py-3.5 bg-foreground text-background text-base font-medium rounded-md hover:bg-foreground/90 transition-colors">
                                        Explore Companies
                                    </button>
                                </Link>
                                <Link href="/compare">
                                    <button className="px-8 py-3.5 border border-border text-foreground text-base font-medium rounded-md hover:bg-muted transition-colors">
                                        Compare Offers
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full py-20 border-t border-border bg-muted/20">
                    <div className="container px-6 md:px-12 max-w-6xl mx-auto">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Smart Engineers Use Off-Radar</h2>
                            <p className="text-muted-foreground">
                                Traditional job boards show you the "advertised" version of a company. We show you the reality.
                                Data-driven insights to protect your time and maximizing your earnings.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
                                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold mb-3">Real In-Hand Salary</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Companies love to inflate CTC with one-time joining bonuses, ESOPs vested over 4 years, and employer PF contributions.
                                    Our calculator strips away the fluff to show you your actual monthly bank credit. Know exactly what you can afford.
                                </p>
                            </div>
                            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold mb-3">Culture Signals</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Is the company a rocket ship or a sinking ship? Detect red flags like "Hustle Culture", "High Churn", or "Slow Growth"
                                    from aggregated community patterns and Verified alumni feedback. Don't join a team that burns you out.
                                </p>
                            </div>
                            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                                    <Target className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold mb-3">Career Fit Score</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Not every "Tier 1" company is right for you. Get a personalized compatibility score based on your unique priorities—
                                    whether you value rapid learning, high salary, remote flexibility, or work-life balance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works (New Content for SEO) */}
                <section className="w-full py-20 border-t border-border">
                    <div className="container px-6 md:px-12 max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Decode Your Offer Letter in 3 Steps</h2>
                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold shrink-0">1</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Input your Options</h4>
                                            <p className="text-muted-foreground">Paste the details from your offer letter or select a company from our database of 500+ tech firms.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Run the Algorithm</h4>
                                            <p className="text-muted-foreground">Our "Reality Engine" adjusts for tax regimes, cost of living, and projected career growth velocity.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold shrink-0">3</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Make the Right Choice</h4>
                                            <p className="text-muted-foreground">See the "True Value" of each offer side-by-side and sign with confidence.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-muted rounded-2xl p-8 border border-border">
                                <div className="space-y-4">
                                    <div className="h-2 w-1/3 bg-foreground/10 rounded"></div>
                                    <div className="h-8 w-3/4 bg-foreground/20 rounded"></div>
                                    <div className="h-32 w-full bg-background rounded-xl border border-border p-4 shadow-sm">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="h-4 w-24 bg-foreground/10 rounded"></div>
                                            <div className="h-4 w-12 bg-green-500/20 rounded"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-foreground/5 rounded"></div>
                                            <div className="h-2 w-5/6 bg-foreground/5 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="h-32 w-full bg-background rounded-xl border border-border p-4 shadow-sm opacity-60">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="h-4 w-24 bg-foreground/10 rounded"></div>
                                            <div className="h-4 w-12 bg-yellow-500/20 rounded"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-foreground/5 rounded"></div>
                                            <div className="h-2 w-5/6 bg-foreground/5 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section (New Content for SEO) */}
                <section className="w-full py-20 bg-muted/10 border-t border-border">
                    <div className="container px-6 md:px-12 max-w-4xl mx-auto text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            <div>
                                <h4 className="font-bold text-lg mb-2">How accurate is the salary data?</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    We aggregate data from verified public sources like Levels.fyi, Glassdoor, and direct community submissions.
                                    While base salaries are highly accurate, variable pay (bonus/stock) depends on individual performance.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">Is Off-Radar free to use?</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Yes, 100% free for students and job seekers. Our mission is transparency.
                                    We do not sell your data to recruiters.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">What does "CTC Reality" mean?</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    "Cost to Company" includes expenses that don't reach your pocket (insurance, office space, tax).
                                    Our "Reality" score adjusts this to reflect your actual disposable income.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">Can you review my resume?</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    We have a dedicated AI Resume Scanner that benchmarks your profile against FAANG hiring bars.
                                    Check the "Resume Scanner" tab in the dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="w-full py-20 bg-foreground text-background">
                    <div className="container px-6 md:px-12 max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            Built by students,<br />for students
                        </h2>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed">
                            We faced the same confusion about CTC breakdowns, hidden trade-offs, and confusing offer letters.
                            Recruiters have the upper hand with information asymmetry—Off-Radar is here to level the playing field.
                            We believe transparency is the foundation of a fair career market.
                        </p>
                        <Link href="/about">
                            <button className="px-8 py-3.5 bg-background text-foreground text-base font-bold rounded-md hover:bg-background/90 transition-colors">
                                Read Our Manifesto
                            </button>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border py-8">
                <div className="container px-6 md:px-12 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">© 2024 Off-Radar. Built by students, for students.</p>
                    <nav className="flex gap-6">
                        <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/compare">
                            Compare Offers
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/contact">
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
