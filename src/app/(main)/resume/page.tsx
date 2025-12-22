"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertTriangle, XCircle, Search, Sparkles, ArrowRight, Loader2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ResumeScannerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
    const [scanProgress, setScanProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type.includes("image"))) {
            setFile(droppedFile);
            startScan();
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            startScan();
        }
    };

    const startScan = () => {
        setStatus('scanning');
        setScanProgress(0);

        // Simulation of scanning stages
        const intervals = [
            { check: "Extracting text...", time: 1000 },
            { check: "Identifying keywords...", time: 2000 },
            { check: "Analyzing formatting...", time: 1500 },
            { check: "Calculating ATS score...", time: 1000 },
        ];

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 2;
            setScanProgress(Math.min(currentProgress, 99));
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setScanProgress(100);
            setTimeout(() => setStatus('results'), 500);
        }, 5500);
    };

    const reset = () => {
        setFile(null);
        setStatus('idle');
        setScanProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-12 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                        AI Resume Scanner
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Check if your resume passes the ATS robots. Get instant feedback on keywords, formatting, and impact.
                    </p>
                </div>

                {status === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300",
                            isDragging
                                ? "border-primary bg-primary/5 scale-[1.02]"
                                : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30"
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={handleFileSelect}
                        />
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
                                <Upload className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Drop your resume here</h3>
                                <p className="text-muted-foreground">Support for PDF, PNG, JPG (Max 5MB)</p>
                            </div>
                            <button className="px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity">
                                Select File
                            </button>
                        </div>
                    </motion.div>
                )}

                {status === 'scanning' && (
                    <div className="max-w-xl mx-auto text-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 border-4 border-muted border-t-primary rounded-full mx-auto mb-8"
                        />
                        <h3 className="text-2xl font-bold mb-2">Analyzing Resume...</h3>
                        <p className="text-muted-foreground mb-8">Currently scanning: {file?.name}</p>

                        <div className="h-2 bg-muted rounded-full overflow-hidden max-w-md mx-auto relative px-1">
                            <motion.div
                                className="h-full bg-primary rounded-full absolute top-0 left-0"
                                style={{ width: `${scanProgress}%` }}
                            />
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground font-mono">
                            {scanProgress < 30 && "Extracting text layers..."}
                            {scanProgress >= 30 && scanProgress < 60 && "Checking industry keywords..."}
                            {scanProgress >= 60 && scanProgress < 90 && "Analyzing formatting & readability..."}
                            {scanProgress >= 90 && "Finalizing report..."}
                        </div>
                    </div>
                )}

                {status === 'results' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Score Header */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-1 bg-background border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
                                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/30" />
                                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={351.86} strokeDashoffset={351.86 - (351.86 * 78) / 100} className="text-yellow-500" />
                                    </svg>
                                    <span className="absolute text-4xl font-bold">78</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-1">ATS Score</h3>
                                <p className="text-sm text-yellow-600 font-medium bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">Good Application</p>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                <div className="bg-muted/30 p-6 rounded-xl border border-border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <h4 className="font-semibold">Top Strengths</h4>
                                    </div>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">✓ Standard formatting detected</li>
                                        <li className="flex items-center gap-2">✓ Contact info is clear</li>
                                        <li className="flex items-center gap-2">✓ Action verbs used frequently</li>
                                    </ul>
                                </div>
                                <div className="bg-muted/30 p-6 rounded-xl border border-border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <h4 className="font-semibold">Critical Fixes</h4>
                                    </div>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2 text-red-500">• Missing "Python" keyword</li>
                                        <li className="flex items-center gap-2 text-red-500">• 2 Typos detected</li>
                                        <li className="flex items-center gap-2 text-red-500">• Education section date format</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Analysis */}
                        <div className="bg-background border border-border rounded-xl overflow-hidden">
                            <div className="p-6 border-b border-border bg-muted/30">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Search className="w-5 h-5" />
                                    Detailed Analysis
                                </h3>
                            </div>
                            <div className="divide-y divide-border">
                                <div className="p-6 flex items-start gap-4">
                                    <div className="mt-1">
                                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium mb-1">Keywords Missing</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Your resume is missing common keywords found in similar roles. ATS scanners look for these exact matches.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {['System Design', 'CI/CD', 'TypeScript', 'Agile'].map(k => (
                                                <span key={k} className="px-3 py-1 bg-muted rounded text-sm text-muted-foreground border border-border line-through decoration-red-500 decoration-2">
                                                    {k}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex items-start gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium mb-1">Impact & Metrics</h4>
                                        <p className="text-sm text-muted-foreground">
                                            You've used numbers in 40% of your bullet points. This is good! Recruiters love quantified impact (e.g., "Increased efficiency by 20%").
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 flex items-start gap-4">
                                    <div className="mt-1">
                                        <Sparkles className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium mb-1">Formatting & Readability</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Good use of white space. Font size is readable. Ensure you use a single column layout for best ATS compatibility.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 pt-4">
                            <button
                                onClick={reset}
                                className="px-6 py-2 border border-input bg-background hover:bg-muted text-foreground rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Scan Another
                            </button>
                            <button className="px-6 py-2 bg-foreground text-background hover:opacity-90 rounded-lg transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download Report
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
