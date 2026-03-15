import DomainPredictor, { DomainConfig } from '@/components/DomainPredictor';
import { Gamepad2, Clock, Users, Trophy } from 'lucide-react';

const config: DomainConfig = {
    domain: 'gaming',
    title: 'Gaming Churn Predictor',
    subtitle: 'Identify lapsing players using session cadence, social graph, spending history and competitive engagement metrics.',
    primaryColor: '#22c55e',
    secondaryColor: '#16a34a',
    sections: [
        {
            title: 'Session Activity',
            icon: <Clock size={11} className="text-[#22c55e]" />,
            fields: [
                { type: 'slider', key: 'accountAgeDays', label: 'ACCOUNT AGE', min: 0, max: 1000, unit: ' d', default: 180 },
                { type: 'slider', key: 'daysSinceLastLogin', label: 'DAYS SINCE LAST LOGIN', min: 0, max: 180, unit: ' d', default: 5 },
                { type: 'slider', key: 'sessionsPerWeek', label: 'SESSIONS / WEEK', min: 0, max: 28, unit: '', default: 7 },
                { type: 'slider', key: 'avgSessionMinutes', label: 'AVG SESSION LENGTH', min: 0, max: 180, unit: ' min', default: 45 },
            ],
        },
        {
            title: 'Social & Progress',
            icon: <Users size={11} className="text-[#22c55e]" />,
            fields: [
                { type: 'slider', key: 'friendsCount', label: 'FRIENDS COUNT', min: 0, max: 200, unit: '', default: 12 },
                { type: 'slider', key: 'achievementsCompletedPct', label: 'ACHIEVEMENTS EARNED', min: 0, max: 100, unit: '%', default: 35 },
                { type: 'toggle', key: 'isGuildMember', label: 'GUILD / CLAN MEMBER', default: false },
                { type: 'toggle', key: 'competitiveMode', label: 'PLAYS COMPETITIVE MODE', default: false },
                { type: 'toggle', key: 'usesVoiceChat', label: 'USES VOICE CHAT', default: false },
            ],
        },
        {
            title: 'Spending & Tier',
            icon: <Trophy size={11} className="text-[#22c55e]" />,
            fields: [
                { type: 'slider', key: 'totalSpend', label: 'TOTAL LIFETIME SPEND', min: 0, max: 500, unit: '$', default: 25 },
                { type: 'toggle', key: 'hasMadeIap', label: 'HAS MADE IN-APP PURCHASE', default: false },
                { type: 'toggle', key: 'isPremium', label: 'PREMIUM / BATTLEPASS', default: false },
            ],
        },
    ],
};

export default function GamingPage() {
    return <DomainPredictor config={config} />;
}
