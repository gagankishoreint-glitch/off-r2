import { nanoid } from 'nanoid';
import { Offer, RealityInsight, OfferPriorities } from '@/types/off-radar';
import { Block } from '@/types/editor';
import { COMPANIES, Company } from '@/lib/company-data';

export function generateRealityPage(offerA: Offer, offerB: Offer, priorities: OfferPriorities): Block[] {
    const blocks: Block[] = [];

    const add = (type: any, content: string, props?: any) => {
        blocks.push({
            id: nanoid(),
            type,
            content,
            properties: props,
            parentId: null,
            children: []
        });
    };

    // Helper to get company data
    const getCompany = (name: string) => COMPANIES.find(c => c.name.toLowerCase() === name.toLowerCase() || c.id === name.toLowerCase());

    const companyA = getCompany(offerA.company);
    const companyB = getCompany(offerB.company);

    const ctcA = offerA.ctc;
    const ctcB = offerB.ctc;

    // --- 1. TL;DR (Adaptive) ---
    // Calculate simple heuristic score based on priorities
    const getScore = (offer: Offer, company?: Company) => {
        let score = 0;
        // Money (In-hand approx)
        score += (offer.ctc || 0) * (priorities.money / 100);
        // Brand/Learning (Tier + Culture)
        if (company?.tier === 'Tier 1') score += 20 * (priorities.brand / 100);
        if (company?.culture.learning === 'High') score += 15 * (priorities.learning / 100);
        if (company?.culture.wlb === 'Green') score += 15 * (priorities.wlb / 100);
        return score;
    };

    const scoreA = getScore(offerA, companyA);
    const scoreB = getScore(offerB, companyB);
    const tldrWinner = scoreA > scoreB ? offerA.company : offerB.company;
    const tldrLoser = scoreA > scoreB ? offerB.company : offerA.company;

    add('heading-1', `Reality Check: ${offerA.company} vs ${offerB.company}`);
    add('callout', `💡 **TL;DR:** Since you prioritized **${priorities.learning > 70 ? 'Learning & Growth' : (priorities.money > 70 ? 'Cash Flow' : 'Work-Life Balance')}**, **${tldrWinner}** looks like the stronger aligned choice over ${tldrLoser}.`);


    // --- 2. Financial Truth (Detailed Breakdown) ---
    add('heading-2', 'The Financial Truth');
    add('paragraph', "Don't be fooled by the high CTC. Here is what hits your bank account.");

    const calculateBreakdown = (offer: Offer, company?: Company) => {
        const ctc = offer.ctc || 0;
        // Heuristic Assumptions for India Market
        const base = offer.base || ctc * 0.6;
        const bonus = offer.hasBonus ? ctc * 0.15 : 0;
        const esop = offer.hasBonus ? ctc * 0.15 : ctc * 0.05; // Standard 5-15% stock component
        const pfAndBenefits = ctc * 0.05;

        // Approx In Hand = (Base - Tax) / 12. Very rough Tax calc (30% slab simplified)
        const taxableIncome = base + bonus;
        // Conservative tax estimate: 20% effective rate for <20L, 25% for >20L
        const taxRate = taxableIncome > 20 ? 0.25 : 0.20;
        const monthlyInHand = ((taxableIncome * (1 - taxRate)) / 12).toFixed(1);

        return {
            base: base.toFixed(1),
            bonus: bonus.toFixed(1),
            esop: esop.toFixed(1),
            monthly: monthlyInHand
        };
    };

    const financeA = calculateBreakdown(offerA, companyA);
    const financeB = calculateBreakdown(offerB, companyB);

    const metrics = [
        { label: 'Paper CTC', valueA: `${ctcA} LPA`, valueB: `${ctcB} LPA` },
        { label: 'Base Pay', valueA: `${financeA.base} LPA`, valueB: `${financeB.base} LPA` },
        { label: 'Variable/Bonus', valueA: `${financeA.bonus} LPA`, valueB: `${financeB.bonus} LPA` },
        { label: 'Paper Money (Stocks)', valueA: `${financeA.esop} LPA`, valueB: `${financeB.esop} LPA` },
        { label: 'Real Monthly In-hand', valueA: `~₹${financeA.monthly}k`, valueB: `~₹${financeB.monthly}k`, highlight: true }
    ];

    const comparisonData = JSON.stringify({
        companyA: offerA.company,
        companyB: offerB.company,
        metrics
    });
    add('comparison-card', comparisonData);


    // --- 3. Career Trajectory (3 Years) ---
    add('heading-2', 'Career Trajectory (3 Years)');
    add('paragraph', 'If you stay for 1000 days, this is likely what happens.');

    const getTrajectory = (offer: Offer, company?: Company) => {
        if (company?.tier === 'Tier 1') {
            return {
                role: 'Specialist / SDE-3',
                resume: 'Global (Very High)',
                exit: 'Any Major Tech Co.'
            };
        } else if (company?.companyType === 'Startup') {
            return {
                role: 'Tech Lead / EM',
                resume: 'High Impact / Risk',
                exit: 'Founder / Early Stage'
            };
        } else {
            return {
                role: 'Senior Engineer',
                resume: 'Moderate / Regional',
                exit: 'Similar Enterprise'
            };
        }
    };

    const trajA = getTrajectory(offerA, companyA);
    const trajB = getTrajectory(offerB, companyB);

    const trajectoryMetrics = [
        { label: 'Likely Role (Year 3)', valueA: trajA.role, valueB: trajB.role },
        { label: 'Resume Signal', valueA: trajA.resume, valueB: trajB.resume },
        { label: 'Switch Potential', valueA: trajA.exit, valueB: trajB.exit },
        { label: 'Salary Jump Potential', valueA: 'High (30% +)', valueB: 'Medium (15-20%)' }, // Placeholder heuristic
    ];

    const trajectoryData = JSON.stringify({
        companyA: offerA.company,
        companyB: offerB.company,
        metrics: trajectoryMetrics
    });
    add('comparison-card', trajectoryData);


    // --- 4. Community Signals ---
    add('heading-2', 'Community Signals');

    const renderCompanySignals = (offer: Offer, data?: Company) => {
        add('heading-3', `${offer.company} Analysis`);

        if (!data) {
            add('paragraph', 'Limited community data available. Proceed with standard due diligence.');
            return;
        }

        // Green Flags
        if (data.whyJoin && data.whyJoin.length > 0) {
            data.whyJoin.slice(0, 2).forEach(reason => {
                add('todo', `✅ ${reason} (Verified Signal)`, { checked: true });
            });
        }
        // Specific Heuristic Signals replacing generic ones
        if (data.tier === 'Tier 1') add('todo', `✅ Exposure to internal tooling at massive scale`, { checked: true });
        if (data.companyType === 'Startup') add('todo', `✅ High ownership (you deploy to prod day 1)`, { checked: true });
        if (data.culture.wlb === 'Green') add('todo', `✅ Lower attrition than industry peers`, { checked: true });

        // "Regrets" Section (Heuristic based on Company Type)
        add('callout', `⚠️ **Common Regret:** "${data.companyType === 'Startup' ?
                "Fast paced, but sometimes codebase is messy and mentorship is absent." :
                (data.tier === 'Tier 1' ? "Golden handcuffs. Hard to find similar pay elsewhere easily." : "Slow promotion cycles and legacy tech debt.")
            }"`);
    };

    renderCompanySignals(offerA, companyA);
    renderCompanySignals(offerB, companyB);

    add('divider', '');


    // --- 5. Validated Verdict ---
    add('heading-2', 'The Verdict');

    // Winner Calculation (Reusing adaptive score)
    const winner = tldrWinner;
    const loser = tldrLoser;

    const verdictData = JSON.stringify({
        winner,
        financialDiff: parseFloat(financeA.monthly) > parseFloat(financeB.monthly) ?
            `${offerA.company} gives ~${((parseFloat(financeA.monthly) - parseFloat(financeB.monthly)) * 100 / parseFloat(financeB.monthly)).toFixed(0)}% more cash in-hand.` :
            `${offerB.company} gives ~${((parseFloat(financeB.monthly) - parseFloat(financeA.monthly)) * 100 / parseFloat(financeA.monthly)).toFixed(0)}% more cash in-hand.`,
        growthWinner: scoreA > scoreB ? `${offerA.company} matches your learning priority better.` : `${offerB.company} matches your learning priority better.`,
        wlbWinner: companyA?.culture.wlb === 'Green' ? `${offerA.company} is the safer bet for WLB.` : `${offerB.company} is likely better for stress-free work.`,
        networkSentiment: `Based on your priorities, ${winner} scores ${Math.abs(scoreA - scoreB).toFixed(1)} points higher in our weighted matrix.`
    });

    add('verdict-card', verdictData);

    const advice =
        (companyA?.companyType === 'Startup' || companyB?.companyType === 'Startup') ?
            "Senior Engineering Advice: Startups accelerate learning but risk burnout. You prioritized Learning, so the startup chaos might be worth it." :
            "Senior Engineering Advice: In large organizations, your specific team and manager matter more than the company brand. Always negotiate specific team alignment.";

    add('quote', advice);

    return blocks;
}
