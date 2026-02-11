import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrustStrip from './components/TrustStrip';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import FAQ from './pages/FAQ';

import Founder from './pages/Founder';
import Preloader from './components/Preloader';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieConsent from './components/CookieConsent';
import NewsletterPopup from './components/NewsletterPopup';

// Declare Lenis type for TS since we are using global script
declare const Lenis: any;

// ScrollToTop component to handle scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {

  const [footerHeight, setFooterHeight] = React.useState(0);
  const footerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    // Dynamic Footer Height Calculation for Parallax Effect
    if (footerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setFooterHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(footerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <Router>
      <Preloader />
      <ScrollToTop />
      <ScrollToTopButton />

      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04] bg-noise mix-blend-overlay"></div>

      {/* Main Content Wrapper - Acts as the 'curtain' */}
      <div
        className="relative z-10 bg-stone-50 rounded-b-[3rem] md:rounded-b-[5rem] flex flex-col min-h-screen shadow-2xl transition-all duration-300 ease-out"
        style={{ marginBottom: `${footerHeight}px` }}
      >
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/faq" element={<FAQ />} />

            <Route path="/founder" element={<Founder />} />
          </Routes>
        </main>

        <TrustStrip />
      </div>

      {/* Fixed Footer - Revealed on Scroll */}
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full -z-10"
      >
        <Footer />
      </div>

      <CookieConsent />
      <NewsletterPopup />

    </Router>
  );
};

export default App;