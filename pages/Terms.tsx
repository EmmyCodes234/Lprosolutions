import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="w-full bg-[#f5f5f4] min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter mb-8">Terms of Service</h1>
                <div className="prose prose-stone prose-lg">
                    <p className="text-xl text-stone-600 mb-8 leading-relaxed">
                        By accessing the L-Pro Solutions website, you agree to abide by the following terms and conditions.
                    </p>

                    <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-stone-600 mb-6">
                        The services and content provided by L-Pro Solutions are subject to these Terms of Service. We reserve the right to update these terms at any time without prior notice.
                    </p>

                    <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">2. Intellectual Property</h2>
                    <p className="text-stone-600 mb-6">
                        All content, logos, and materials on this website are the intellectual property of L-Pro Solutions unless otherwise stated. Unauthorized use is strictly prohibited.
                    </p>

                    <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">3. Limitation of Liability</h2>
                    <p className="text-stone-600 mb-6">
                        L-Pro Solutions shall not be held liable for any damages arising out of the use or inability to use the materials on this website.
                    </p>

                    <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">4. Governing Law</h2>
                    <p className="text-stone-600 mb-6">
                        These terms are governed by and construed in accordance with the laws of the Republic of Liberia.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
