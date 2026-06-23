import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SALONS, type SalonKey } from './data/salons';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { ValueStack } from './components/ValueStack';
import { Tiers } from './components/Tiers';
import { Objections } from './components/Objections';
import { ClosingCta } from './components/ClosingCta';
import { StickyJoin } from './components/StickyJoin';
import { Footer } from './components/Footer';

const VALID: SalonKey[] = ['deluxe', 'zen'];

function readSalonFromHash(): SalonKey {
  const raw = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
  return (VALID as string[]).includes(raw) ? (raw as SalonKey) : 'deluxe';
}

export default function App() {
  const [salonKey, setSalonKey] = useState<SalonKey>(readSalonFromHash);

  // Reflect the active salon on <html> so the whole token world swaps,
  // and keep the theme-color meta in sync for mobile browser chrome.
  useEffect(() => {
    document.documentElement.setAttribute('data-salon', salonKey);
    const bg = salonKey === 'deluxe' ? '#FAF9F8' : '#FFFBEB';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', bg);
  }, [salonKey]);

  // Keep state and the URL hash in lockstep (deep-linkable, back-button friendly).
  useEffect(() => {
    const onHash = () => setSalonKey(readSalonFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const select = (key: SalonKey) => {
    if (key === salonKey) return;
    window.location.hash = `/${key}`;
    setSalonKey(key);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const salon = SALONS[salonKey];

  return (
    <>
      <a className="skip-link" href="#hero">
        Skip to content
      </a>
      <TopBar active={salonKey} onChange={select} />

      <main id="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={salonKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hero salon={salon} />
            <ValueStack salon={salon} />
            <Tiers salon={salon} />
            <Objections salon={salon} />
            <ClosingCta salon={salon} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer active={salonKey} onChange={select} />
      <StickyJoin salon={salon} />
    </>
  );
}
