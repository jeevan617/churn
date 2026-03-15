import DomainPredictor, { DomainConfig } from '@/components/DomainPredictor';
import { ShoppingCart, TrendingUp, MessageCircle, Star } from 'lucide-react';

const config: DomainConfig = {
    domain: 'ecommerce',
    title: 'E-Commerce Churn Predictor',
    subtitle: 'Identify at-risk shoppers using RFM signals, cart behavior, loyalty data and engagement patterns across 12 features.',
    primaryColor: '#ff007f',
    secondaryColor: '#ff6b35',
    sections: [
        {
            title: 'RFM Metrics',
            icon: <TrendingUp size={11} className="text-[#ff007f]" />,
            fields: [
                { type: 'slider', key: 'recencyDays', label: 'DAYS SINCE LAST ORDER', min: 0, max: 365, unit: ' d', default: 30 },
                { type: 'slider', key: 'ordersPerMonth', label: 'ORDERS / MONTH', min: 0, max: 20, unit: '', default: 2 },
                { type: 'slider', key: 'avgOrderValue', label: 'AVG ORDER VALUE', min: 10, max: 500, unit: '$', default: 85 },
                { type: 'number', key: 'lifetimeValue', label: 'LIFETIME VALUE ($)', default: 1200 },
                { type: 'slider', key: 'categoriesExplored', label: 'CATEGORIES EXPLORED', min: 1, max: 20, unit: '', default: 4 },
            ],
        },
        {
            title: 'Behavioral Signals',
            icon: <ShoppingCart size={11} className="text-[#ff007f]" />,
            fields: [
                { type: 'slider', key: 'cartAbandonmentRate', label: 'CART ABANDONMENT', min: 0, max: 100, unit: '%', default: 45 },
                { type: 'slider', key: 'returnRate', label: 'RETURN RATE', min: 0, max: 50, unit: '%', default: 10 },
                { type: 'slider', key: 'emailOpenRate', label: 'EMAIL OPEN RATE', min: 0, max: 100, unit: '%', default: 25 },
                { type: 'slider', key: 'reviewsPosted', label: 'REVIEWS POSTED', min: 0, max: 50, unit: '', default: 3 },
                { type: 'slider', key: 'supportTickets', label: 'SUPPORT TICKETS', min: 0, max: 20, unit: '', default: 1 },
            ],
        },
        {
            title: 'Loyalty & Engagement',
            icon: <Star size={11} className="text-[#ff007f]" />,
            fields: [
                { type: 'toggle', key: 'loyaltyMember', label: 'LOYALTY PROGRAM MEMBER', default: false },
                { type: 'toggle', key: 'hasMobileApp', label: 'USES MOBILE APP', default: false },
            ],
        },
    ],
};

export default function EcommercePage() {
    return <DomainPredictor config={config} />;
}
