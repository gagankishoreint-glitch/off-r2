export type WorkMode = 'remote' | 'hybrid' | 'onsite';
export type EmploymentType = 'internship' | 'fte';

export interface Offer {
    id: string;
    company: string;
    role: string;
    ctc: number; // e.g. 2000000 for 20LPA
    location: string;
    type: EmploymentType;
    workMode: WorkMode;
    experienceLevel: string; // 0-2, 2-5, 5+
    hasBonus: boolean; // Yes/No for variable component

    // Optional detailed breakdown (Restored)
    base?: number;
    stocks?: number;
    joiningBonus?: number;
}

export interface OfferPriorities {
    money: number; // 0-100
    learning: number;
    wlb: number;
    brand: number;
    stability: number;
}

export type InsightType = 'red-flag' | 'green-flag' | 'neutral' | 'hidden-truth';

export interface RealityInsight {
    type: InsightType;
    title: string;
    content: string;
    source?: string; // e.g. "r/developersIndia", "Glassdoor"
}
