import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrustStrip from './components/TrustStrip';

import Preloader from './components/Preloader';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieConsent from './components/CookieConsent';
import NewsletterPopup from './components/NewsletterPopup';

// Lazy Load Components for Code Splitting
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Sitemap = React.lazy(() => import('./pages/Sitemap'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Founder = React.lazy(() => import('./pages/Founder'));

// Academy Components (Lazy)
const AcademyLayout = React.lazy(() => import('./components/layouts/AcademyLayout'));
const AcademyHome = React.lazy(() => import('./pages/Academy/AcademyHome'));
const AcademyCourses = React.lazy(() => import('./pages/Academy/AcademyCourses'));
const AcademyCertificates = React.lazy(() => import('./pages/Academy/AcademyCertificates'));
const AcademySettings = React.lazy(() => import('./pages/Academy/AcademySettings'));
const CoursePlayer = React.lazy(() => import('./pages/Academy/CoursePlayer'));
const PMAcademy = React.lazy(() => import('./pages/Academy/PMAcademy'));
const AcademyAdmin = React.lazy(() => import('./pages/Academy/AcademyAdmin'));

// Fallback for Suspense
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center bg-stone-50">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-accent" />
  </div>
);

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
  const contentRef = React.useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const isAcademy = pathname.startsWith('/academy');

  useEffect(() => {
    // Developer Console Signature
    console.log(
      "%c L-PRO SOLUTIONS %c \n Engineered for Excellence. \n\n 🚀 Built with Passion for Liberia \n https://lprosolutions.org",
      "background: #DC2626; color: #fff; padding: 10px; font-weight: bold; font-size: 20px; border-radius: 5px;",
      "background: #1c1917; color: #fff; padding: 10px; font-size: 14px; border-radius: 5px;"
    );

    // Initialize Lenis Smooth Scroll only if NOT in Academy
    if (typeof Lenis !== 'undefined' && !isAcademy) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
      });

      let currentSkew = 0;

      // Handle Scroll Events for Velocity Skew
      lenis.on('scroll', (e: any) => {
        if (!contentRef.current) return;

        // Calculate Skew based on velocity (capped at 7 degrees)
        const targetSkew = Math.max(-7, Math.min(7, e.velocity * 0.1));

        // Smooth interpolation for the skew
        currentSkew += (targetSkew - currentSkew) * 0.1;

        // Apply transform to the main content holder
        contentRef.current.style.transform = `skewY(${currentSkew}deg)`;
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
  }, [isAcademy]);

  return (
    <>
      <ScrollToTop />
      <Preloader />
      <ScrollToTopButton />

      {/* Academy Routes (All Wrapped in Premium Layout) */}
      {isAcademy ? (
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<AcademyLayout />}>
              <Route path="/academy" element={<PMAcademy />} />
              <Route path="/academy/infrastructure-governance" element={<PMAcademy />} />
              <Route path="/academy/dashboard" element={<AcademyHome />} />
              <Route path="/academy/courses" element={<AcademyCourses />} />
              <Route path="/academy/courses/:courseId" element={<CoursePlayer />} />
              <Route path="/academy/certificates" element={<AcademyCertificates />} />
              <Route path="/academy/profile" element={<AcademySettings />} />
              <Route path="/academy/admin" element={<AcademyAdmin />} />
            </Route>
          </Routes>
        </React.Suspense>
      ) : (
        /* Main Site Structure (Hidden if in Academy) */
        <>
          {/* Global Noise Overlay (Final Polish) */}
          <div className="noise-overlay"></div>

          {/* Refined Navigation - Outside of skew to ensure stability */}
          <Navbar />

          {/* Main Content Wrapper - Acts as the 'curtain' */}
          <div
            ref={contentRef}
            className="relative z-10 bg-stone-50 rounded-b-[3rem] md:rounded-b-[5rem] flex flex-col min-h-screen shadow-2xl transition-all duration-300 ease-out will-change-transform"
            style={{ marginBottom: `${footerHeight}px` }}
          >

            <main className="flex-grow">
              <React.Suspense fallback={<Loading />}>
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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Suspense>
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
        </>
      )}
    </>
  );
};

export default App;