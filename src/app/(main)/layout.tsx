"use client";

import { HorizontalNav } from "@/components/layout/horizontal-nav";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Trigger fade out
        setIsTransitioning(true);

        // Wait for fade out, then swap content
        const timer = setTimeout(() => {
            setDisplayChildren(children);
            setIsTransitioning(false);
        }, 150); // Fast fade out

        return () => clearTimeout(timer);
    }, [pathname, children]);

    return (
        <div className="flex flex-col min-h-screen">
            <HorizontalNav />
            <main
                className={`flex-1 overflow-auto bg-white dark:bg-[#191919] transition-opacity duration-200 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {displayChildren}
            </main>
        </div>
    );
}
