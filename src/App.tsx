import React, { useEffect, useState } from 'react';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeSection } from './components/MarqueeSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { LegalModal, type LegalTab } from './components/LegalModal';

export const App: React.FC = () => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');

  // Handle URL hash and direct pathname on load (#privacy, /privacy, #terms, /terms, #kbbi)
  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');

      if (hash === '#privacy' || path === '/privacy' || path.endsWith('/privacy')) {
        setLegalTab('privacy');
        setLegalModalOpen(true);
      } else if (hash === '#terms' || path === '/terms' || path.endsWith('/terms')) {
        setLegalTab('terms');
        setLegalModalOpen(true);
      } else if (hash === '#kbbi' || hash === '#legal' || path === '/kbbi' || path.endsWith('/kbbi')) {
        setLegalTab('kbbi');
        setLegalModalOpen(true);
      }
    };

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col relative selection:bg-brand-500/15 selection:text-brand-900 bg-gradient-to-b from-white via-surface-100 to-surface-200">
        {/* Floating Apple Liquid Glass Navbar */}
        <Navbar />

        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Marquee Ticker */}
        <MarqueeSection />

        {/* 3. Feature Bento Grid */}
        <FeatureShowcase />

        {/* 4. FAQ Section */}
        <FAQSection />

        {/* 5. CTA Section */}
        <CTASection />

        {/* 6. Footer Section with Legal Triggers */}
        <Footer onOpenLegal={handleOpenLegal} />

        {/* 7. Apple App Store Compliant Legal Modal */}
        <LegalModal
          isOpen={legalModalOpen}
          initialTab={legalTab}
          onClose={() => setLegalModalOpen(false)}
        />
      </div>
    </ToastProvider>
  );
};

export default App;
