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
import Blog from './pages/Blog';
import Preloader from './components/Preloader';
import ScrollToTopButton from './components/ScrollToTopButton';

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

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
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
  }, []);

  return (
    <Router>
      <Preloader />
      <ScrollToTop />
      <ScrollToTopButton />

      {/* Global Noise Overlay - Fixed to screen, above everything except modals */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04] bg-noise mix-blend-overlay"></div>

      {/* 
        Curtain Reveal Layout Structure:
        1. Main Content Wrapper: Relative, z-10, background color, bottom margin matches footer height.
        2. Footer: Fixed, bottom-0, z-0.
      */}

      <div className="relative z-10 bg-stone-50 mb-[600px] md:mb-[500px] shadow-2xl rounded-b-[5rem] flex flex-col min-h-screen">
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
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>

        {/* Trust Strip acts as the visual bottom of the scrolling content */}
        <TrustStrip />
      </div>

      {/* Fixed Footer sitting behind the curtain */}
      <Footer />

    </Router>
  );
};

export default App;