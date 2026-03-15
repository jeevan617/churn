import DomainPredictor, { DomainConfig } from '@/components/DomainPredictor';
import { Layers, BarChart2, Users, Zap } from 'lucide-react';

const config: DomainConfig = {
    domain: 'saas',
    title: 'SaaS Churn Predictor',
    subtitle: 'Detect churning software subscribers using product engagement depth, NPS score, integrations and plan tier.',
    primaryColor: '#b026ff',
    secondaryColor: '#7c3aed',
    sections: [
        {
            title: 'Subscription Details',
            icon: <Layers size={11} className="text-[#b026ff]" />,
            fields: [
                { type: 'slider', key: 'subscriptionAge', label: 'SUBSCRIPTION AGE', min: 1, max: 60, unit: ' mo', default: 8 },
                {
                    type: 'select', key: 'planTier', label: 'PLAN TIER', default: 'basic',
                    options: [{ value: 'free', label: 'Free' }, { value: 'basic', label: 'Basic' }, { value: 'pro', label: 'Pro' }, { value: 'enterprise', label: 'Enterprise' }]
                },
                { type: 'slider', key: 'teamSize', label: 'TEAM SIZE', min: 1, max: 500, unit: '', default: 5 },
            ],
        },
        {
            title: 'Product Engagement',
            icon: <BarChart2 size={11} className="text-[#b026ff]" />,
            fields: [
                { type: 'slider', key: 'monthlyActiveDays', label: 'ACTIVE DAYS / MONTH', min: 0, max: 31, unit: ' d', default: 12 },
                { type: 'slider', key: 'featuresUsedPct', label: 'FEATURES ADOPTED', min: 0, max: 100, unit: '%', default: 30 },
                { type: 'slider', key: 'lastLoginDaysAgo', label: 'LAST LOGIN', min: 0, max: 90, unit: ' d ago', default: 5 },
                { type: 'slider', key: 'apiCallsMonthly', label: 'API CALLS / MONTH', min: 0, max: 100000, unit: '', default: 5000 },
                { type: 'slider', key: 'supportTickets', label: 'SUPPORT TICKETS', min: 0, max: 20, unit: '', default: 2 },
                { type: 'slider', key: 'npsScore', label: 'NPS SCORE', min: 0, max: 10, unit: '', default: 7 },
            ],
        },
        {
            title: 'Account Features',
            icon: <Zap size={11} className="text-[#b026ff]" />,
            fields: [
                { type: 'toggle', key: 'hasIntegrations', label: '3RD-PARTY INTEGRATIONS', default: false },
                { type: 'toggle', key: 'hasSso', label: 'SSO ENABLED', default: false },
                { type: 'toggle', key: 'hasDedicatedCsm', label: 'DEDICATED CSM', default: false },
            ],
        },
    ],
};

export default function SaasPage() {
    return <DomainPredictor config={config} />;
}
