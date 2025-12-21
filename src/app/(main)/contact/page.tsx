"use client";

import { Mail, MessageSquare, Send, Github, Linkedin, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const teamLeader = {
        name: "Gagan Kishore B",
        role: "Leader",
        email: "gagankishoreint@gmail.com",
        linkedin: "https://www.linkedin.com/in/gagankishore",
        github: "https://github.com/gagankishoreint-glitch"
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Have questions, feedback, or suggestions? We'd love to hear from you.
                    </p>
                </div>

                {/* Team Contact Card */}
                <div className="mb-12">
                    <h2 className="text-2xl font-heading font-semibold mb-8 text-foreground">
                        Project Leader
                    </h2>
                    <div className="grid sm:grid-cols-1 gap-6 max-w-2xl mx-auto">
                        <div className="p-8 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="w-8 h-8 text-foreground" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-heading font-bold mb-1 text-foreground">
                                        {teamLeader.name}
                                    </h3>
                                    <p className="text-lg text-muted-foreground font-medium mb-4">
                                        {teamLeader.role}
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        {/* Email */}
                                        <a
                                            href={`mailto:${teamLeader.email}`}
                                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <Send className="w-4 h-4" />
                                            {teamLeader.email}
                                        </a>

                                        {/* Socials */}
                                        <div className="flex items-center gap-4 mt-2">
                                            <a
                                                href={teamLeader.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                                LinkedIn <ExternalLink className="w-3 h-3 ml-1" />
                                            </a>
                                            <a
                                                href={teamLeader.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub <ExternalLink className="w-3 h-3 ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Card */}
                <div className="mb-12">
                    <h2 className="text-2xl font-heading font-semibold mb-8 text-foreground">
                        Share Feedback
                    </h2>
                    <div className="p-8 rounded-xl bg-muted">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                                    Help Us Improve
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Your feedback helps us make Off-Radar better. Share:
                                </p>
                                <ul className="text-muted-foreground space-y-2">
                                    <li>• Feature requests</li>
                                    <li>• Bug reports</li>
                                    <li>• Company data corrections</li>
                                    <li>• General suggestions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-muted p-8 rounded-xl mb-12">
                    <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                        Response Time
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        We Typically respond within <strong className="text-foreground">24-48 hours</strong>. For urgent matters, please mention "URGENT" in your email subject line.
                    </p>
                </div>
            </div>
        </div>
    );
}
