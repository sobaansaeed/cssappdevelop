'use client';

import React, { useState } from 'react';
import { Check, Star, Zap, Crown, FileText, Users, Clock, Shield, ChevronUp, ChevronDown, ArrowRight, Play } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { pricingPlans, pricingConfig } from '@/config/pricing';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      FileText,
      Crown,
      Star,
      Zap,
      Users,
      Clock,
      Shield
    };
    return icons[iconName] || FileText;
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-blue-500 to-blue-600';
      case 'purple':
        return 'from-purple-500 to-purple-600';
      case 'green':
        return 'from-green-500 to-green-600';
      case 'orange':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200';
      case 'purple':
        return 'border-purple-200';
      case 'green':
        return 'border-green-200';
      case 'orange':
        return 'border-orange-200';
      default:
        return 'border-gray-200';
    }
  };

  const getShadowColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'shadow-blue-500/25';
      case 'purple':
        return 'shadow-purple-500/25';
      case 'green':
        return 'shadow-green-500/25';
      case 'orange':
        return 'shadow-orange-500/25';
      default:
        return 'shadow-gray-500/25';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-12 w-12 mr-3" />
              <h1 className="text-4xl lg:text-5xl font-bold">Choose Your Plan</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Unlock the full potential of AI-powered essay checking. Choose the plan that fits your CSS preparation needs.
            </p>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200">
            <div className="flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save {pricingConfig.yearlySavings}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => {
            const Icon = getIconComponent(plan.icon);
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  plan.popular ? 'border-purple-300 scale-105' : getBorderColor(plan.color)
                } overflow-hidden transition-all duration-300 hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      <Star className="inline-block w-4 w-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getColorClasses(plan.color)} text-white mb-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {pricingConfig.currency}{plan.price[billingCycle].toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        /{pricingConfig.billingCycles[billingCycle]}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg text-gray-500 line-through">
                        {pricingConfig.currency}{plan.originalPrice[billingCycle].toLocaleString()}
                      </span>
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold">
                        {plan.savings}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25'
                        : `bg-gradient-to-r ${getColorClasses(plan.color)} hover:shadow-lg ${getShadowColor(plan.color)}`
                    }`}
                  >
                    {isAuthenticated ? plan.ctaText : 'Get Started'}
                  </button>

                  {/* Additional Info */}
                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-500">
                      {billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Basic</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-700">Essays per month</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.basic.essaysPerMonth}</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.pro.essaysPerMonth}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">AI Analysis</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.basic.aiAnalysis}</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.pro.aiAnalysis}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Processing Time</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.basic.processingTime}</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.pro.processingTime}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Essay History</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.basic.essayHistory}</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.pro.essayHistory}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Support</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.basic.support}</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.pro.support}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Progress Tracking</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.basic.progressTracking}</td>
                  <td className="py-4 px-6 text-center text-gray-600">{pricingConfig.features.pro.progressTracking}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced FAQ Section with Dropdowns */}
        <div className="mt-16 sm:mt-20 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {pricingConfig.faq.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4">{item.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white border-t border-gray-200">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your CSS Essays?</h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                Join thousands of CSS aspirants who are already improving their writing skills with AI-powered feedback and analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                <Link
                  href="/"
                  className="group bg-white text-blue-600 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 justify-center"
                >
                  <span>Try Essay Checker Free</span>
                  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1">
                  <Play className="h-5 w-5 sm:h-6 sm:w-6 inline mr-3" />
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
