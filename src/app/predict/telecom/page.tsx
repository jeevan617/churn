import DomainPredictor, { DomainConfig } from '@/components/DomainPredictor';
import { Smartphone, Signal, Shield, Star, Users } from 'lucide-react';

const config: DomainConfig = {
    domain: 'telecom',
    title: 'Telecom Churn Predictor',
    subtitle: 'Analyze mobile & broadband subscribers using contract, usage and service data across 13 features.',
    primaryColor: '#00f0ff',
    secondaryColor: '#b026ff',
    sections: [
        {
            title: 'Usage Metrics',
            icon: <Signal size={11} className="text-[#00f0ff]" />,
            fields: [
                { type: 'slider', key: 'tenure', label: 'TENURE', min: 0, max: 72, unit: ' mo', default: 12 },
                { type: 'slider', key: 'monthlyCharges', label: 'MONTHLY CHARGES', min: 18, max: 120, unit: '$', default: 65 },
                { type: 'slider', key: 'numServices', label: 'SERVICES BUNDLED', min: 0, max: 8, unit: '', default: 3 },
                { type: 'slider', key: 'monthlyGbUsage', label: 'DATA USAGE', min: 0, max: 100, unit: ' GB', default: 20 },
                { type: 'number', key: 'totalCharges', label: 'TOTAL CHARGES ($)', default: 780 },
            ],
        },
        {
            title: 'Contract & Billing',
            icon: <Smartphone size={11} className="text-[#00f0ff]" />,
            fields: [
                {
                    type: 'select', key: 'contractType', label: 'CONTRACT TYPE', default: 'month-to-month',
                    options: [{ value: 'month-to-month', label: 'Month-to-Month' }, { value: 'one-year', label: '1 Year' }, { value: 'two-year', label: '2 Year' }]
                },
                { type: 'toggle', key: 'paperlessBilling', label: 'PAPERLESS BILLING', default: true },
            ],
        },
        {
            title: 'Services & Demographics',
            icon: <Shield size={11} className="text-[#00f0ff]" />,
            fields: [
                { type: 'toggle', key: 'techSupport', label: 'TECH SUPPORT', default: false },
                { type: 'toggle', key: 'onlineSecurity', label: 'ONLINE SECURITY', default: false },
                { type: 'toggle', key: 'seniorCitizen', label: 'SENIOR CITIZEN', default: false },
                { type: 'toggle', key: 'partner', label: 'HAS PARTNER', default: false },
                { type: 'toggle', key: 'dependents', label: 'HAS DEPENDENTS', default: false },
            ],
        },
    ],
};

export default function TelecomPage() {
    return <DomainPredictor config={config} />;
}
