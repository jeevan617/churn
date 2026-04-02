export const PARAM_DICTIONARY: Record<string, { desc: string; improve: string; leverage: string }> = {
    // Telecom
    tenure: {
        desc: "Measures the total duration the customer has been with the provider. Longer tenure implies higher loyalty.",
        improve: "Offer a loyalty milestone reward (e.g., free speed upgrade or streaming service for 3 months) to secure renewal.",
        leverage: "Highlight their long-standing relationship in communications. Send a 'Thanks for being with us' appreciation gift."
    },
    monthlyCharges: {
        desc: "The recurring monthly fee billed to the customer. High charges relative to usage often lead to price-shopping.",
        improve: "Proactively propose a right-sized plan. If they use less data than they pay for, stepping them down saves the account from full churn.",
        leverage: "Show value and cost-savings compared to competitors. Send a 'Your Monthly Value Report' detailing what they get."
    },
    contractType: {
        desc: "Identifies whether the user is on a month-to-month or long-term contract. Month-to-month is highly volatile.",
        improve: "Incentivize a shift to an annual contract. Offer a 10% discount to lock in the 1-year or 2-year term.",
        leverage: "Maintain frictionless auto-pay and ensure they see no surprise fees to let the contract run smoothly."
    },
    numServices: {
        desc: "The count of different services bundled (e.g. mobile, internet, TV). Bundled users are significantly less likely to churn.",
        improve: "Offer a heavy discount on adding a 2nd or 3rd service to their account, integrating them deeper into the ecosystem.",
        leverage: "Provide exclusive 'bundle perks' such as priority customer service or partner discounts."
    },
    dataUsage: {
        desc: "Monthly data consumed. Users consistently hitting caps or drastically underusing are at flight risk.",
        improve: "If overusing, offer a proactive upgrade to unlimited data before they incur overage fees. If underusing, suggest a cheaper tier to build trust.",
        leverage: "Highlight their seamless internet experience. Offer bolt-on products like security packages or cloud storage."
    },

    // Banking
    accountAge: {
        desc: "Total months since the primary account was opened. New accounts are statistically more prone to churn.",
        improve: "Enroll new users in a structured 90-day onboarding sequence. Waive early account fees temporarily.",
        leverage: "Offer premium services (like premium credit cards or lower loan rates) based on their established account history."
    },
    creditScore: {
        desc: "Customer's creditworthiness. Lower scores might indicate financial stress, impacting account balances and fee generation.",
        improve: "Offer overdraft protection tools or financial literacy resources to build trust rather than penalizing with fees.",
        leverage: "Pre-approve them for a high-tier credit product. Highly qualified customers are sticky when offered credit."
    },
    monthlyTransactions: {
        desc: "Velocity of money moving in and out of the account. Low transactions indicate the account is not an active primary checking.",
        improve: "Incentivize direct deposit setup with a cash bonus, or give cashback on their first 10 debit transactions.",
        leverage: "Waive standard account maintenance fees automatically based on their high organic transaction volume."
    },

    // E-Commerce
    cartAbandonmentRate: {
        desc: "The percentage of shopping sessions where items are added to the cart but not purchased. Indicates price sensitivity or checkout friction.",
        improve: "Trigger a fast-follow email with a 15% discount code applied strictly to items currently left in their cart.",
        leverage: "They are completing purchases efficiently. Streamline their checkout further with 1-click buy options."
    },
    recencyDays: {
        desc: "Days elapsed since the customer's last purchase. The longer the gap, the colder the relationship.",
        improve: "Deploy a 'We Miss You' campaign featuring personalized product recommendations based on their past category views.",
        leverage: "Capitalize on their recent momentum by offering a time-sensitive post-purchase upsell."
    },
    lifetimeValue: {
        desc: "Total historic revenue generated from the user. High LTV churn represents massive revenue leakage.",
        improve: "Assign a VIP concierge or dedicated SDR to high-LTV users who decrease activity. Prevent loss at all costs.",
        leverage: "Onboard them into an exclusive VIP loyalty tier giving them early access to sale events."
    },

    // Default fallback
    DEFAULT: {
        desc: "Evaluates behavioral signals associated with this metric. Fluctuations heavily influence the machine learning model's risk scoring.",
        improve: "Review the value exchange for this parameter. If the user is under-utilizing, educate them. If it's a cost metric, optimize pricing.",
        leverage: "This parameter is currently a strong anchor. Emphasize it in regular account reviews or product dashboards."
    }
};

export function getParamContent(key: string) {
    const defaultDesc = `Evaluates real-time signals associated with the user's ${key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}. Variations in this metric carry substantial weight in predicting lifetime value shifts.`;
    
    return PARAM_DICTIONARY[key] || {
        ...PARAM_DICTIONARY.DEFAULT,
        desc: defaultDesc
    };
}
