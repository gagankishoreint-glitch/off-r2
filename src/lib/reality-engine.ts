import { nanoid } from 'nanoid';
import { Offer, RealityInsight } from '@/types/off-radar';
import { Block } from '@/types/editor';
import { COMPANIES, Company } from '@/lib/company-data';

export function generateRealityPage(offerA: Offer, offerB: Offer): Block[] {
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
    const diff = Math.abs(ctcA - ctcB);
    const higherName = ctcA > ctcB ? offerA.company : offerB.company;
    const lowerName = ctcA > ctcB ? offerB.company : offerA.company;
    const percentDiff = Math.abs((ctcA - ctcB) / ((ctcA + ctcB) / 2) * 100).toFixed(0);

    // 1. Header
    add('heading-1', `Reality Check: ${offerA.company} vs ${offerB.company}`);
    add('paragraph', `Based on data from ${companyA?.roleTypes?.length || 50}+ verified roles and community signals.`);

    // 2. Compensation Reality
    add('heading-2', 'The Financial Truth');

    // Calculate Monthly In-Hand (Simple Est)
    const inHandA = (ctcA * (companyA?.salary.inHandPercent || 75) / 100 / 12).toFixed(1);
    const inHandB = (ctcB * (companyB?.salary.inHandPercent || 75) / 100 / 12).toFixed(1);

    const metrics = [
        { label: 'Total CTC', valueA: `${ctcA} LPA`, valueB: `${ctcB} LPA` },
        { label: 'Est. Monthly', valueA: `~₹${inHandA}k`, valueB: `~₹${inHandB}k`, highlight: true },
        { label: 'Work Life', valueA: companyA?.culture.wlb || '-', valueB: companyB?.culture.wlb || '-' },
        { label: 'Learning', valueA: companyA?.culture.learning || '-', valueB: companyB?.culture.learning || '-' }
    ];

    const comparisonData = JSON.stringify({
        companyA: offerA.company,
        companyB: offerB.company,
        metrics
    });
    add('comparison-card', comparisonData);

    // 3. Deep Dive Signals
    add('heading-2', 'Community Signals');

    const renderCompanySignals = (offer: Offer, data?: Company) => {
        add('heading-3', `${offer.company} Analysis`);

        if (!data) {
            add('paragraph', 'Limited data available for this company. Generally, verify team allocation and tech stack before joining.');
            return;
        }

        // Green Flags
        if (data.whyJoin && data.whyJoin.length > 0) {
            data.whyJoin.slice(0, 2).forEach(reason => {
                add('todo', `✅ ${reason}`, { checked: true });
            });
        } else {
            // Fallback Green Flags based on Tier/Type
            if (data.tier === 'Tier 1') add('todo', `✅ Elite peer group and high brand value`, { checked: true });
            if (data.companyType === 'Startup') add('todo', `✅ High ownership and rapid learning curve`, { checked: true });
            if (data.companyType === 'Product') add('todo', `✅ Focus on code quality and modern tech stack`, { checked: true });
        }

        // Red Flags / Cautions
        if (data.detailedAnalysis?.cons) {
            data.detailedAnalysis.cons.slice(0, 2).forEach(con => {
                add('todo', `⚠️ ${con}`, { checked: false });
            });
        } else {
            // Derived Cautions
            if (data.tier === 'Tier 3' || data.companyType === 'Service') {
                add('todo', `⚠️ Risk of legacy projects or support roles`, { checked: false });
                add('todo', `⚠️ Verify if role is distinct from mass-hiring profiles`, { checked: false });
            }
            if (data.companyType === 'Startup' && data.culture.wlb === 'Red') {
                add('todo', `⚠️ Expect 10-12 hour workdays (Hustle Culture)`, { checked: false });
            }
            if (data.culture.learning === 'Low') {
                add('todo', `⚠️ Growth might stagnate after 2 years.`, { checked: false });
            }
        }

        // Quote
        const quote = data.description || (data.tier === 'Tier 1' ? "A resume-defining role." : "A solid stepping stone.");
        add('quote', quote);
    };

    renderCompanySignals(offerA, companyA);
    renderCompanySignals(offerB, companyB);

    add('divider', '');

    // 4. Smart Verdict
    add('heading-2', 'The Verdict');

    // Salary Diff Analysis
    // Salary Diff Analysis
    if (ctcA === 0 && ctcB === 0) {
        add('paragraph', `📊 **Financials**: No offer details provided. Enter your CTC to see which company gives you more in-hand.`);
    } else if (ctcA === 0 || ctcB === 0) {
        add('paragraph', `⚠️ **Financials**: Please provide CTC for both offers to get a fair financial comparison.`);
    } else if (parseFloat(percentDiff) > 25) {
        add('paragraph', `💰 **Financials**: ${higherName} is the clear winner, offering ~${percentDiff}% higher pay. Unless the role at ${lowerName} is your dream domain, the money at ${higherName} is hard to ignore.`);
    } else {
        add('paragraph', `⚖️ **Financials**: The pay gap is small (~${percentDiff}%). Focus on the role and culture instead of the money.`);
    }

    // Culture/Growth Analysis
    const scoreA = (companyA?.culture.learning === 'High' ? 3 : 1) + (companyA?.tier === 'Tier 1' ? 2 : 0);
    const scoreB = (companyB?.culture.learning === 'High' ? 3 : 1) + (companyB?.tier === 'Tier 1' ? 2 : 0);

    if (scoreA > scoreB) {
        add('paragraph', `🚀 **Growth**: ${offerA.company} offers significantly better career trajectory and learning opportunities.`);
    } else if (scoreB > scoreA) {
        add('paragraph', `🚀 **Growth**: ${offerB.company} offers significantly better career trajectory and learning opportunities.`);
    } else {
        add('paragraph', `🤝 **Growth**: Both companies offer comparable career growth. Look at the specific team.`);
    }

    // Senior Advice
    const advice =
        (companyA?.companyType === 'Startup' || companyB?.companyType === 'Startup') ?
            "Senior Advice: Startups accelerate learning but risk burnout. If you have energy, take the risk. If you want stability, choose the MNC." :
            "Senior Advice: In big companies, your 'Team' matters more than the 'Brand'. Try to talk to a current employee about the specific team culture.";

    add('quote', advice);

    return blocks;
}
