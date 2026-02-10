import React from 'react';

const About: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <div className="bg-[#f5f5f4] pt-24 pb-20 md:pt-32 md:pb-32 px-6 rounded-b-[2.5rem] md:rounded-b-[3rem]">
        <div className="max-w-[1440px] mx-auto text-center">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-stone-900 mb-6 md:mb-8">
            Built on Integrity.<br /> Driven by Impact.
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-8 md:mb-12">
            The premier partner for development and corporate excellence in West Africa.
          </p>
          <div className="aspect-video w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative">
            <img
              src="https://picsum.photos/id/48/1920/1080"
              alt="Team Meeting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="md:w-1/3">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Our Mission</h3>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-8 md:mb-12">
              To accelerate Liberia’s development by delivering infrastructure solutions that are sustainable, transparent, and world-class.
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Our Story</h3>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-8 md:mb-12">
              Founded in Monrovia, L-Pro Solutions emerged from a need for stricter governance in the construction sector. We saw that many projects failed not due to lack of funding, but due to a lack of rigorous management. We exist to fix that broken link.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="col-span-full mb-2 md:mb-4">
              <h4 className="text-xl md:text-2xl font-bold">Our Values</h4>
            </div>
            <div className="bg-[#f5f5f4] p-6 md:p-8 rounded-[2rem]">
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Precision</h4>
              <p className="text-stone-500 text-sm md:text-base">We measure twice, cut once. Attention to detail is at the core of our engineering and governance philosophy.</p>
            </div>
            <div className="bg-[#f5f5f4] p-6 md:p-8 rounded-[2rem]">
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Transparency</h4>
              <p className="text-stone-500 text-sm md:text-base">No hidden costs, no ambiguity. We believe in clear communication and accountability at every step.</p>
            </div>
            <div className="bg-[#f5f5f4] p-6 md:p-8 rounded-[2rem]">
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Community</h4>
              <p className="text-stone-500 text-sm md:text-base">We build for the people, employing local talent wherever possible and ensuring our projects benefit the community.</p>
            </div>
            <div className="bg-[#f5f5f4] p-6 md:p-8 rounded-[2rem]">
              <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Global Standards</h4>
              <p className="text-stone-500 text-sm md:text-base">We apply international best practices (PMI, ISO) to ensure your projects meet global quality benchmarks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;