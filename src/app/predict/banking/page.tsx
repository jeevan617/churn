import DomainPredictor, { DomainConfig } from '@/components/DomainPredictor';
import { Landmark, CreditCard, Activity, PhoneCall } from 'lucide-react';

const config: DomainConfig = {
    domain: 'banking',
    title: 'Banking Churn Predictor',
    subtitle: 'Identify at-risk bank customers from account age, product portfolio, digital engagement and incident history.',
    primaryColor: '#f59e0b',
    secondaryColor: '#ef4444',
    sections: [
        {
            title: 'Account & Usage',
            icon: <Landmark size={11} className="text-[#f59e0b]" />,
            fields: [
                { type: 'slider', key: 'accountAge', label: 'ACCOUNT AGE', min: 0, max: 120, unit: ' mo', default: 24 },
                { type: 'slider', key: 'monthlyTransactions', label: 'MONTHLY TRANSACTIONS', min: 0, max: 100, unit: '', default: 15 },
                { type: 'slider', key: 'avgBalance', label: 'AVG BALANCE', min: 0, max: 50000, unit: '$', default: 5000 },
                { type: 'slider', key: 'digitalLogins', label: 'DIGITAL LOGINS / MONTH', min: 0, max: 60, unit: '', default: 10 },
                { type: 'slider', key: 'creditScore', label: 'CREDIT SCORE', min: 300, max: 850, unit: '', default: 680 },
            ],
        },
        {
            title: 'Product Portfolio',
            icon: <CreditCard size={11} className="text-[#f59e0b]" />,
            fields: [
                { type: 'slider', key: 'productsCount', label: 'PRODUCTS HELD', min: 1, max: 8, unit: '', default: 2 },
                { type: 'toggle', key: 'hasMobileApp', label: 'MOBILE BANKING APP', default: false },
                { type: 'toggle', key: 'hasLoan', label: 'HAS ACTIVE LOAN', default: false },
                { type: 'toggle', key: 'hasCreditCard', label: 'HAS CREDIT CARD', default: false },
                { type: 'toggle', key: 'marketingOptIn', label: 'MARKETING OPT-IN', default: true },
            ],
        },
        {
            title: 'Risk & Friction Events',
            icon: <PhoneCall size={11} className="text-[#f59e0b]" />,
            fields: [
                { type: 'slider', key: 'overdraftIncidents', label: 'OVERDRAFT INCIDENTS (YR)', min: 0, max: 12, unit: '', default: 0 },
                { type: 'slider', key: 'serviceCallsCount', label: 'SERVICE CALLS (6 MO)', min: 0, max: 10, unit: '', default: 1 },
            ],
        },
    ],
};

export default function BankingPage() {
    return <DomainPredictor config={config} />;
}
