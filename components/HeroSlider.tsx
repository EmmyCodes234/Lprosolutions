import React, { useState, useEffect } from 'react';
import { ArrowRight, Bolt } from 'lucide-react'; // Using Bolt as a proxy for the 'flash' icon, or generic arrow
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const slides = [
  {
    id: 1,
    // Image: Steel structure construction with cranes (Industrial/Large Scale)
    image: '/web images/hero1.jpg',
    title: <>Industrial<br />Velocity.</>,
    subtitle: "Executing large-scale industrial projects with global safety standards and precision.",
    ctaPrimary: "View Our Work",
    ctaSecondary: "Explore Services"
  },
  {
    id: 2,
    // Image: Deep excavation/foundation work (Civil/Technical)
    image: '/web images/hero2.jpg',
    title: <>Civil<br />Precision.</>,
    subtitle: "Expert management of complex foundations and critical infrastructure systems.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Our Expertise"
  },
  {
    id: 3,
    // Image: Modern steel canopy structure (Structural/Sustainable)
    image: '/web images/hero3.jpg',
    title: <>Modern<br />Frameworks.</>,
    subtitle: "Delivering versatile, resilient structures designed for the future of West Africa.",
    ctaPrimary: "See Portfolio",
    ctaSecondary: "Contact Us"
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900 text-white">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Optimized Hero Image */}
          <img
            src={slide.image}
            alt=""
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[20000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content Wrapper */}
          <div className="relative z-20 h-full w-full max-w-[1440px] mx-auto flex items-center px-6 md:px-16">
            {/* We conditionally render the text block so the animation replays on slide change */}
            {index === currentSlide && (
              <div className="max-w-3xl pt-24 md:pt-20">
                <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-bold leading-[1.1] mb-6 tracking-tighter drop-shadow-lg">
                  <div className="reveal-container">
                    <span className="block animate-reveal-up" style={{ animationDelay: '0.2s' }}>
                      {slide.title}
                    </span>
                  </div>
                </h1>

                <div className="reveal-container mb-8 md:mb-10">
                  <p className="text-base sm:text-lg md:text-2xl text-white/90 font-light max-w-xl animate-reveal-up leading-relaxed" style={{ animationDelay: '0.4s' }}>
                    {slide.subtitle}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 animate-reveal-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                  <MagneticButton strength={40}>
                    <Link
                      to="/projects"
                      className="w-full sm:w-auto bg-stone-900/80 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      <ArrowRight size={18} />
                      <span>{slide.ctaPrimary}</span>
                    </Link>
                  </MagneticButton>

                  <MagneticButton strength={20}>
                    <Link
                      to="/services"
                      className="w-full sm:w-auto bg-white text-stone-900 px-8 py-4 rounded-full font-bold text-sm transition-transform hover:-translate-y-1 inline-flex items-center justify-center"
                    >
                      {slide.ctaSecondary}
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Bottom Right Controls */}
      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-16 z-30 flex items-center gap-4 md:gap-6">
        {/* Progress Bar */}
        <div className="w-24 md:w-32 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Slide Counter */}
        <div className="text-xs md:text-sm font-bold tracking-widest text-white">
          0{currentSlide + 1} / 0{slides.length}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;