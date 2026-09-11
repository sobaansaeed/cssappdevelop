import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, Server, RefreshCw, Mail } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — CSS KRO',
  description: 'Learn how CSS KRO handles and protects your personal information and essay submissions.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 12, 2025';

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction & Overview',
      icon: <ShieldCheck className="w-5 h-5 text-accent-primary" />,
      content: (
        <>
          <p className="mb-3">
            Welcome to <strong>CSS KRO</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to safeguarding the privacy of civil service exam aspirants using our digital preparation portal, past papers archive, and AI essay evaluation tools.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, process, and protect your information when you access our website (<code>csskro.com</code>) and related services. By using CSS KRO, you consent to the data practices described in this document.
          </p>
        </>
      ),
    },
    {
      id: 'information-collected',
      title: '2. Information We Collect',
      icon: <FileText className="w-5 h-5 text-accent-gold" />,
      content: (
        <>
          <p className="mb-3">We collect information to provide and enhance your preparation experience:</p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong>Account Information:</strong> When you register via email or Google OAuth, we store your email address, name (if provided), encrypted authentication identifiers, and account creation timestamp.
            </li>
            <li>
              <strong>Essay Submissions:</strong> Text, prompts, and topic titles submitted through our Essay Checker tool.
            </li>
            <li>
              <strong>Credit &amp; Subscription Data:</strong> Records of your monthly evaluation credit quota, usage counts, subscription status (free or Pro), and transaction records.
            </li>
            <li>
              <strong>Usage Telemetry:</strong> Anonymized technical data such as browser type, operating system, and feature interaction metrics to ensure optimal platform performance.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'essay-confidentiality',
      title: '3. Real-Time Essay Processing & Confidentiality',
      icon: <Lock className="w-5 h-5 text-accent-primary" />,
      content: (
        <>
          <div className="p-4 rounded-xl bg-accent-primary/10 border border-accent-primary/20 mb-3">
            <p className="font-semibold text-text-primary text-sm mb-1">
              Your Essays Remain Your Sole Intellectual Property
            </p>
            <p className="text-xs text-text-muted">
              We never publish, sell, distribute, or use your submitted essays to train public artificial intelligence models.
            </p>
          </div>
          <p className="mb-3">
            When you submit an essay for evaluation, the text is securely transmitted over TLS 1.3 encryption to our AI evaluation inference API solely for the purpose of generating instant scoring rubrics, linguistic feedback, and structural analysis.
          </p>
          <p>
            Once analysis completes, the resulting feedback is transmitted directly back to your active browser session.
          </p>
        </>
      ),
    },
    {
      id: 'how-we-use-data',
      title: '4. How We Use Your Information',
      icon: <Eye className="w-5 h-5 text-accent-gold" />,
      content: (
        <>
          <p className="mb-3">Your data is utilized strictly for legitimate operational purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To authenticate your login and manage your 5 free monthly credits or Pro subscription limits.</li>
            <li>To generate detailed, FPSC-oriented diagnostic feedback on your submitted essays.</li>
            <li>To provide access to past examination papers, syllabus syllabi, and educational materials.</li>
            <li>To notify you about important syllabus revisions, FPSC announcements, or platform maintenance (only if you subscribe to alerts).</li>
            <li>To detect, prevent, and mitigate fraudulent usage or automated bot misuse of our evaluation APIs.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'third-party-providers',
      title: '5. Trusted Third-Party Infrastructure',
      icon: <Server className="w-5 h-5 text-accent-primary" />,
      content: (
        <>
          <p className="mb-3">
            To provide robust, high-availability services, we partner with industry-leading cloud and infrastructure providers:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong>Supabase:</strong> Enterprise PostgreSQL database, session management, and encrypted user authentication with strict Row-Level Security (RLS).
            </li>
            <li>
              <strong>Groq / LLaMA:</strong> High-speed AI inference engine executing structured grading rubrics under secure, isolated enterprise API endpoints.
            </li>
            <li>
              <strong>Vercel:</strong> Global CDN hosting and serverless computing infrastructure adhering to SOC 2 Type II compliance standards.
            </li>
          </ul>
          <p className="text-xs text-text-muted">
            We do not sell, rent, or lease customer email lists or user identities to third-party advertisers.
          </p>
        </>
      ),
    },
    {
      id: 'data-retention-rights',
      title: '6. Data Retention & User Rights',
      icon: <RefreshCw className="w-5 h-5 text-accent-gold" />,
      content: (
        <>
          <p className="mb-3">
            You maintain full sovereignty over your personal data:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong>Right to Access &amp; Portability:</strong> You can review your profile information, subscription tier, and remaining credits at any time from your account dashboard.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You may update your profile details or reset your authentication credentials whenever necessary.
            </li>
            <li>
              <strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> You may request complete account deletion and database record purging by contacting our support desk.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'contact-privacy',
      title: '7. Inquiries & Data Protection Contact',
      icon: <Mail className="w-5 h-5 text-accent-primary" />,
      content: (
        <>
          <p className="mb-3">
            If you have questions, concerns, or requests regarding this Privacy Policy or our data protection protocols, please reach out to:
          </p>
          <div className="p-4 rounded-xl bg-white border border-gray-200 text-sm">
            <p className="font-semibold text-text-primary">CSS KRO Privacy &amp; Data Compliance</p>
            <p className="text-text-muted mt-1">Email: <a href="mailto:privacy@csskro.com" className="text-accent-primary underline">privacy@csskro.com</a></p>
            <p className="text-text-muted">Islamabad, Islamic Republic of Pakistan</p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F5F0E8' }}>
      {/* ── HERO ── */}
      <section
        className="relative py-20 pt-32 text-center"
        style={{
          background: '#0B1E3D',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-body text-xs font-semibold tracking-[0.2em] text-accent-gold uppercase mb-4">
            LEGAL &amp; COMPLIANCE
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-text-on-dark/70">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10 p-6 rounded-2xl bg-white/70 border border-gray-200">
            <p className="font-body text-sm text-text-muted leading-relaxed">
              At CSS KRO, our core premise is trust. We understand that your academic writings, preparation schedule, and career ambitions deserve the highest standard of ethical handling. Below is our formal pledge and transparent policy regarding all user data.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="p-8 rounded-2xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(200,150,46,0.20)',
                  boxShadow: '0 4px 20px rgba(26,18,7,0.04)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100">
                    {sec.icon}
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-text-primary">
                    {sec.title}
                  </h2>
                </div>
                <div className="font-body text-sm text-text-muted leading-relaxed">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center pt-8 border-t border-gray-300">
            <p className="font-body text-xs text-text-muted mb-4">
              Need clarification on any of our data terms?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-xs font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #E8650A 0%, #C8962E 100%)' }}
            >
              Contact Support Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
