export interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  originalPrice: {
    monthly: number;
    yearly: number;
  };
  savings: string;
  features: string[];
  popular: boolean;
  icon: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
  ctaText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    description: 'Perfect for getting started with essay checking',
    price: {
      monthly: 250,
      yearly: 2500
    },
    originalPrice: {
      monthly: 500,
      yearly: 5000
    },
    savings: '50% OFF',
    features: [
      'Up to 50 essays per month',
      'Basic AI feedback',
      'Grammar & spelling check',
      'Basic structure analysis',
      'Email support',
      'Standard processing time'
    ],
    popular: false,
    icon: 'FileText',
    color: 'blue',
    ctaText: 'Get Started'
  },
  {
    name: 'Pro',
    description: 'Advanced features for serious CSS aspirants',
    price: {
      monthly: 499,
      yearly: 4990
    },
    originalPrice: {
      monthly: 998,
      yearly: 9980
    },
    savings: '50% OFF',
    features: [
      'Unlimited essays',
      'Advanced AI analysis',
      'Detailed feedback & suggestions',
      'Priority processing',
      'Essay history & analytics',
      'Progress tracking',
      '24/7 priority support',
      'Custom feedback templates'
    ],
    popular: true,
    icon: 'Crown',
    color: 'purple',
    ctaText: 'Subscribe Now'
  }
];

export const pricingConfig = {
  currency: '₨',
  currencyCode: 'PKR',
  billingCycles: {
    monthly: 'month',
    yearly: 'year'
  },
  yearlySavings: '50%',
  freeTrial: '7-day free trial',
  features: {
    basic: {
      essaysPerMonth: 50,
      aiAnalysis: 'Basic',
      processingTime: 'Standard',
      essayHistory: '30 days',
      support: 'Email',
      progressTracking: 'Basic'
    },
    pro: {
      essaysPerMonth: 'Unlimited',
      aiAnalysis: 'Advanced',
      processingTime: 'Priority',
      essayHistory: 'Unlimited',
      support: '24/7 Priority',
      progressTracking: 'Advanced'
    }
  },
  faq: [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'We offer a 7-day free trial for all Pro plan features. No credit card required.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and local payment methods like JazzCash and Easypaisa.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely! You can cancel your subscription at any time. No long-term commitments.'
    }
  ]
};
