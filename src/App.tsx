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

  // Handle URL hash on load and hash change (#privacy, #terms, #kbbi)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#privacy') {
        setLegalTab('privacy');
        setLegalModalOpen(true);
      } else if (hash === '#terms') {
        setLegalTab('terms');
        setLegalModalOpen(true);
      } else if (hash === '#kbbi' || hash === '#legal') {
        setLegalTab('kbbi');
        setLegalModalOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
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
