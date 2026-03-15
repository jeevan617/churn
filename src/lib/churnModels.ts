export type Domain = 'telecom' | 'ecommerce' | 'banking' | 'saas' | 'gaming';
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface Factor { name: string; impact: number; direction: 'positive' | 'negative'; }
export interface ChurnResult { probability: number; score: number; riskLevel: RiskLevel; factors: Factor[]; }

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
const getRisk = (s: number): RiskLevel => s >= 75 ? 'CRITICAL' : s >= 50 ? 'HIGH' : s >= 25 ? 'MODERATE' : 'LOW';
const n = (v: unknown, d = 0) => isNaN(Number(v)) ? d : Number(v);
const b = (v: unknown) => Boolean(v);
const s = (v: unknown) => String(v);

export function predict(domain: Domain, input: Record<string, unknown>): ChurnResult {
    switch (domain) {
        case 'telecom': return telecom(input);
        case 'ecommerce': return ecommerce(input);
        case 'banking': return banking(input);
        case 'saas': return saas(input);
        case 'gaming': return gaming(input);
    }
}

function telecom(i: Record<string, unknown>): ChurnResult {
    const tenure = n(i.tenure), mc = n(i.monthlyCharges), tc = n(i.totalCharges);
    const svc = n(i.numServices), ct = s(i.contractType), gb = n(i.monthlyGbUsage);
    const pb = b(i.paperlessBilling), ts = b(i.techSupport), os = b(i.onlineSecurity);
    const sc = b(i.seniorCitizen), pt = b(i.partner), dep = b(i.dependents);
    let z = 1.85 - 0.042 * tenure + 0.028 * mc - 0.0004 * tc - 0.18 * svc
        + 1.65 * (ct === 'month-to-month' ? 1 : 0) - 0.45 * (ct === 'one-year' ? 1 : 0)
        + 0.22 * (pb ? 1 : 0) + 0.48 * (!ts ? 1 : 0) + 0.39 * (!os ? 1 : 0)
        + 0.35 * (sc ? 1 : 0) + 0.21 * (!pt ? 1 : 0) + 0.18 * (!dep ? 1 : 0) - 0.008 * gb;
    const probability = sigmoid(z), score = Math.round(probability * 100);
    const factors: Factor[] = [
        { name: 'Contract Type', impact: ct === 'month-to-month' ? 1.65 : ct === 'one-year' ? 0.45 : 0.1, direction: ct === 'two-year' ? 'positive' : 'negative' },
        { name: 'Tenure', impact: Math.min(tenure / 12, 3) * 0.5, direction: tenure > 24 ? 'positive' : 'negative' },
        { name: 'Monthly Charges', impact: mc * 0.01, direction: mc > 65 ? 'negative' : 'positive' },
        { name: 'Services Bundle', impact: svc * 0.18, direction: svc >= 4 ? 'positive' : 'negative' },
        { name: 'Tech Support', impact: 0.48, direction: ts ? 'positive' : 'negative' },
        { name: 'Online Security', impact: 0.39, direction: os ? 'positive' : 'negative' },
        { name: 'Data Usage', impact: gb * 0.005, direction: gb > 20 ? 'positive' : 'negative' },
    ].sort((a, b) => b.impact - a.impact);
    return { probability, score, riskLevel: getRisk(score), factors };
}

function ecommerce(i: Record<string, unknown>): ChurnResult {
    const recency = n(i.recencyDays), opm = n(i.ordersPerMonth), aov = n(i.avgOrderValue);
    const ltv = n(i.lifetimeValue), car = n(i.cartAbandonmentRate), rr = n(i.returnRate);
    const eor = n(i.emailOpenRate), cat = n(i.categoriesExplored), st = n(i.supportTickets);
    const rev = n(i.reviewsPosted), loy = b(i.loyaltyMember), app = b(i.hasMobileApp);
    let z = 0.5 + 0.02 * recency - 0.25 * opm - 0.005 * aov - 0.00005 * ltv
        + 0.03 * car + 0.04 * rr - 0.02 * eor - 0.06 * cat
        - 0.8 * (loy ? 1 : 0) - 0.5 * (app ? 1 : 0) - 0.05 * rev + 0.18 * st;
    const probability = sigmoid(z), score = Math.round(probability * 100);
    const factors: Factor[] = [
        { name: 'Loyalty Program', impact: 0.8, direction: loy ? 'positive' : 'negative' },
        { name: 'Purchase Recency', impact: Math.min(recency * 0.012, 2.0), direction: recency > 60 ? 'negative' : 'positive' },
        { name: 'Order Frequency', impact: Math.min(opm * 0.2, 1.5), direction: opm >= 2 ? 'positive' : 'negative' },
        { name: 'Mobile App', impact: 0.5, direction: app ? 'positive' : 'negative' },
        { name: 'Cart Abandonment', impact: car * 0.02, direction: car > 40 ? 'negative' : 'positive' },
        { name: 'Support Tickets', impact: st * 0.12, direction: st > 3 ? 'negative' : 'positive' },
        { name: 'Category Engagement', impact: cat * 0.04, direction: cat >= 5 ? 'positive' : 'negative' },
    ].sort((a, b) => b.impact - a.impact);
    return { probability, score, riskLevel: getRisk(score), factors };
}

function banking(i: Record<string, unknown>): ChurnResult {
    const age = n(i.accountAge), txn = n(i.monthlyTransactions), bal = n(i.avgBalance);
    const cs = n(i.creditScore, 650), prod = n(i.productsCount, 1), dl = n(i.digitalLogins);
    const app = b(i.hasMobileApp), loan = b(i.hasLoan), cc = b(i.hasCreditCard);
    const od = n(i.overdraftIncidents), calls = n(i.serviceCallsCount), mkt = b(i.marketingOptIn);
    let z = 2.5 - 0.025 * age - 0.04 * txn - 0.00002 * bal - 0.004 * (cs - 300)
        - 0.55 * prod - 0.04 * dl - 0.6 * (app ? 1 : 0) - 0.4 * (loan ? 1 : 0)
        - 0.35 * (cc ? 1 : 0) + 0.35 * od + 0.28 * calls - 0.3 * (mkt ? 1 : 0);
    const probability = sigmoid(z), score = Math.round(probability * 100);
    const factors: Factor[] = [
        { name: 'Products Held', impact: prod * 0.35, direction: prod >= 3 ? 'positive' : 'negative' },
        { name: 'Mobile Banking', impact: 0.6, direction: app ? 'positive' : 'negative' },
        { name: 'Credit Score', impact: Math.max(0, (cs - 550) * 0.004), direction: cs >= 700 ? 'positive' : 'negative' },
        { name: 'Digital Activity', impact: Math.min(dl * 0.03, 0.9), direction: dl >= 15 ? 'positive' : 'negative' },
        { name: 'Overdraft Events', impact: od * 0.25, direction: od === 0 ? 'positive' : 'negative' },
        { name: 'Service Calls', impact: calls * 0.2, direction: calls > 2 ? 'negative' : 'positive' },
        { name: 'Account Age', impact: Math.min(age * 0.015, 0.9), direction: age > 36 ? 'positive' : 'negative' },
    ].sort((a, b) => b.impact - a.impact);
    return { probability, score, riskLevel: getRisk(score), factors };
}

function saas(i: Record<string, unknown>): ChurnResult {
    const subAge = n(i.subscriptionAge, 1), plan = s(i.planTier);
    const mad = n(i.monthlyActiveDays), feat = n(i.featuresUsedPct), team = n(i.teamSize, 1);
    const lastLogin = n(i.lastLoginDaysAgo), tix = n(i.supportTickets), nps = n(i.npsScore, 5);
    const integ = b(i.hasIntegrations), sso = b(i.hasSso), csm = b(i.hasDedicatedCsm);
    const api = n(i.apiCallsMonthly);
    let z = 1.2 - 0.025 * subAge
        - 0.8 * (plan === 'enterprise' ? 1 : 0) - 0.4 * (plan === 'pro' ? 1 : 0) + 0.3 * (plan === 'free' ? 1 : 0)
        - 0.06 * mad - 0.018 * feat - 0.002 * team + 0.06 * lastLogin + 0.15 * tix
        - 0.18 * nps - 0.65 * (integ ? 1 : 0) - 0.4 * (sso ? 1 : 0) - 0.9 * (csm ? 1 : 0) - 0.000005 * api;
    const probability = sigmoid(z), score = Math.round(probability * 100);
    const factors: Factor[] = [
        { name: 'Dedicated CSM', impact: 0.9, direction: csm ? 'positive' : 'negative' },
        { name: 'NPS Score', impact: Math.abs((nps - 5) * 0.15), direction: nps >= 7 ? 'positive' : 'negative' },
        { name: 'Integrations', impact: 0.65, direction: integ ? 'positive' : 'negative' },
        { name: 'Active Usage', impact: Math.min(mad * 0.05, 1.5), direction: mad >= 15 ? 'positive' : 'negative' },
        { name: 'Feature Adoption', impact: feat * 0.012, direction: feat >= 40 ? 'positive' : 'negative' },
        { name: 'Login Recency', impact: Math.min(lastLogin * 0.04, 1.5), direction: lastLogin < 7 ? 'positive' : 'negative' },
        { name: 'Plan Tier', impact: plan === 'enterprise' ? 0.8 : plan === 'pro' ? 0.4 : 0.1, direction: plan === 'free' ? 'negative' : 'positive' },
    ].sort((a, b) => b.impact - a.impact);
    return { probability, score, riskLevel: getRisk(score), factors };
}

function gaming(i: Record<string, unknown>): ChurnResult {
    const accAge = n(i.accountAgeDays), lastLogin = n(i.daysSinceLastLogin);
    const sessions = n(i.sessionsPerWeek), dur = n(i.avgSessionMinutes);
    const spend = n(i.totalSpend), friends = n(i.friendsCount), ach = n(i.achievementsCompletedPct);
    const guild = b(i.isGuildMember), iap = b(i.hasMadeIap), voice = b(i.usesVoiceChat);
    const prem = b(i.isPremium), comp = b(i.competitiveMode);
    let z = 0.8 - 0.003 * accAge + 0.05 * lastLogin - 0.15 * sessions - 0.012 * dur
        - 0.004 * spend - 0.012 * friends - 0.015 * ach
        - 0.8 * (guild ? 1 : 0) - 0.6 * (iap ? 1 : 0) - 0.3 * (voice ? 1 : 0) - 0.5 * (prem ? 1 : 0) - 0.35 * (comp ? 1 : 0);
    const probability = sigmoid(z), score = Math.round(probability * 100);
    const factors: Factor[] = [
        { name: 'Guild Membership', impact: 0.8, direction: guild ? 'positive' : 'negative' },
        { name: 'In-App Purchases', impact: 0.6, direction: iap ? 'positive' : 'negative' },
        { name: 'Login Recency', impact: Math.min(lastLogin * 0.03, 1.5), direction: lastLogin < 7 ? 'positive' : 'negative' },
        { name: 'Session Frequency', impact: Math.min(sessions * 0.1, 1.2), direction: sessions >= 5 ? 'positive' : 'negative' },
        { name: 'Social Connections', impact: Math.min(friends * 0.01, 0.8), direction: friends >= 10 ? 'positive' : 'negative' },
        { name: 'Premium Tier', impact: 0.5, direction: prem ? 'positive' : 'negative' },
        { name: 'Achievements', impact: ach * 0.01, direction: ach >= 50 ? 'positive' : 'negative' },
    ].sort((a, b) => b.impact - a.impact);
    return { probability, score, riskLevel: getRisk(score), factors };
}
