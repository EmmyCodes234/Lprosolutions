import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div className="w-full bg-[#f5f5f4] min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter mb-8">Privacy Policy</h1>
                <div className="prose prose-stone prose-lg">
                    <p className="text-xl text-stone-600 mb-8 leading-relaxed">
                        Your privacy is of paramount importance to L-Pro Solutions. This policy outlines how we handle your data with transparency and respect.
                    </p>

                    <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">1. Information Collection</h2>
                    <p className="text-stone-600 mb-6">
                        We collect information you provide directly to us through our contact forms, newsletter signups, and direct communication. This may include your name, email address, and professional details relevant to your inquiry.
                    </p>

                    <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">2. Use of Information</h2>
                    <p className="text-stone-600 mb-6">
                        We use the information collected to respond to your requests, provide project updates, send newsletters if subscribed, and improve our service offerings. We do not sell or lease your personal information to third parties.
                    </p>

                    <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">3. Data Security</h2>
                    <p className="text-stone-600 mb-6">
                        L-Pro Solutions implements industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
                    </p>

                    <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">4. Contact Us</h2>
                    <p className="text-stone-600 mb-6">
                        If you have any questions regarding this Privacy Policy, please contact us at privacy@l-pro.com.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
