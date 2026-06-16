const sections = [
    {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        content: `By accessing or using Bank2XML ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the Service.

These Terms constitute a legally binding agreement between you ("User") and Bank2XML, operated by [Your Company Name] ("Company", "we", "us", or "our"), a company incorporated under the laws of India.

By creating an account or using any part of the Service, you represent that you are at least 18 years of age and have the legal authority to enter into these Terms on behalf of yourself or the organization you represent.`,
    },
    {
        id: "description",
        title: "2. Description of Service",
        content: `Bank2XML provides an AI-powered platform that allows users to:

• Upload bank statement PDFs and convert them into Tally-compatible formats including XML, CSV, and Excel files.
• Automate transaction data extraction for accounting and bookkeeping purposes.
• Access processed files for import into Tally ERP and other accounting software.

The Service is intended for use by Chartered Accountants, accounting professionals, and business owners operating within India.`,
    },
    {
        id: "accounts",
        title: "3. User Accounts",
        content: `To access certain features of Bank2XML, you must create an account. You agree to:

• Provide accurate, current, and complete information during registration.
• Maintain the security and confidentiality of your login credentials.
• Notify us immediately at support@bank2xml.com of any unauthorized use of your account.
• Be solely responsible for all activity that occurs under your account.

We reserve the right to suspend or terminate accounts that violate these Terms, contain inaccurate information, or are inactive for an extended period.`,
    },
    {
        id: "subscriptions",
        title: "4. Subscriptions, Credits & Billing",
        content: `Bank2XML offers access through subscription plans and credit-based usage. By subscribing or purchasing credits, you agree to the following:

4.1 Billing
All payments are processed securely through Razorpay. By providing payment details, you authorize us to charge the applicable fees to your selected payment method.

4.2 Subscriptions
Subscription plans renew automatically at the end of each billing cycle (monthly or annually) unless cancelled before the renewal date. You may cancel your subscription at any time from your account dashboard.

4.3 Credits
Credits are non-refundable, non-transferable, and have no cash value. Unused credits may expire as defined in your plan. Credits are consumed per conversion or as specified in your active plan.

4.4 Price Changes
We reserve the right to modify pricing with 30 days' prior notice via email or in-app notification. Continued use after the notice period constitutes acceptance of the revised pricing.

4.5 Refunds
Subscription fees and credit purchases are generally non-refundable. Refund requests may be considered at our sole discretion in cases of technical failure attributable to Bank2XML. To request a refund, contact support@bank2xml.com within 7 days of the charge.`,
    },
    {
        id: "acceptable-use",
        title: "5. Acceptable Use",
        content: `You agree to use Bank2XML only for lawful purposes. You must not:

• Upload documents that you do not have the legal right to process.
• Use the Service to process documents on behalf of others without proper authorization.
• Attempt to reverse-engineer, decompile, or extract the underlying AI models or algorithms.
• Use automated bots, scrapers, or scripts to access the Service without prior written consent.
• Upload malicious files or attempt to disrupt the platform's infrastructure.
• Resell or sublicense access to the Service without our express written permission.

Violation of this section may result in immediate account suspension and legal action where applicable.`,
    },
    {
        id: "data",
        title: "6. Data & Document Handling",
        content: `6.1 Uploaded Documents
When you upload a bank statement PDF, it is processed by our AI systems to extract transaction data. We treat all uploaded documents as confidential.

6.2 Data Retention
Processed transaction data may be retained in your account to enable history and re-download features. We are continuously improving our data retention policies, which will be updated in our Privacy Policy.

6.3 Security
We use bank-grade encryption (AES-256) for data in transit and at rest. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.

6.4 Your Responsibility
You are responsible for ensuring that any documents you upload comply with applicable laws, including data protection laws in India (Information Technology Act, 2000 and related rules).`,
    },
    {
        id: "ip",
        title: "7. Intellectual Property",
        content: `All content, software, technology, and branding on Bank2XML — including but not limited to the name, logo, AI models, and user interface — are the exclusive property of the Company and are protected under applicable Indian and international intellectual property laws.

You retain ownership of the documents you upload and the data generated from them. By using the Service, you grant us a limited, non-exclusive license to process your documents solely to provide the Service to you.

You may not copy, reproduce, distribute, or create derivative works from our platform without prior written consent.`,
    },
    {
        id: "liability",
        title: "8. Limitation of Liability",
        content: `To the maximum extent permitted by applicable law:

• Bank2XML is provided on an "as is" and "as available" basis without warranties of any kind.
• We do not warrant that the conversion output will be error-free or suitable for filing with any regulatory authority.
• Users are responsible for verifying the accuracy of all converted data before importing it into Tally or any accounting system.
• We shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Service.
• Our total liability in connection with the Service shall not exceed the amount paid by you in the 3 months preceding the claim.`,
    },
    {
        id: "termination",
        title: "9. Termination",
        content: `We reserve the right to suspend or terminate your access to Bank2XML at any time, with or without notice, for:

• Violation of these Terms.
• Non-payment of applicable fees.
• Fraudulent or abusive behavior.

You may terminate your account at any time by contacting us at support@bank2xml.com. Upon termination, your right to access the Service ceases immediately.`,
    },
    {
        id: "governing-law",
        title: "10. Governing Law & Dispute Resolution",
        content: `These Terms are governed by the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in [Your City], India.

We encourage users to contact us at support@bank2xml.com to resolve any issues informally before pursuing legal remedies.`,
    },
    {
        id: "changes",
        title: "11. Changes to These Terms",
        content: `We may update these Terms from time to time. When we make material changes, we will notify you via email or a prominent notice on the platform. The updated Terms will take effect on the date specified in the notice.

Your continued use of Bank2XML after the effective date constitutes your acceptance of the revised Terms.`,
    },
    {
        id: "contact",
        title: "12. Contact Us",
        content: `For questions, concerns, or legal notices related to these Terms, please contact us at:

Bank2XML
Email: support@bank2xml.com
Website: www.bank2xml.com

We aim to respond to all queries within 2 business days.`,
    },
];

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#EEF0FF] to-white border-b border-gray-100 px-6 py-16 md:py-24 text-center">
                <span className="inline-flex items-center gap-2 bg-white border border-indigo-200 text-indigo-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6 shadow-sm">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Legal Document
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                    Terms &amp; Conditions
                </h1>
                <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
                    Please read these terms carefully before using Bank2XML.
                </p>
                <p className="text-sm text-gray-400 mt-4">
                    Last updated: June 16, 2026
                </p>
            </section>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-14 md:py-20">
                {/* Quick Nav */}
                <div className="bg-[#F5F6FF] border border-indigo-100 rounded-2xl p-6 mb-14">
                    <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
                        Table of Contents
                    </p>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                        {sections.map((s) => (
                            <li key={s.id}>
                                <a
                                    href={`#${s.id}`}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                                >
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {sections.map((s, i) => (
                        <section
                            key={s.id}
                            id={s.id}
                            className="scroll-mt-24 border-b border-gray-100 pb-12 last:border-0"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                                    {i + 1}
                                </span>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                    {s.title.replace(/^\d+\.\s/, "")}
                                </h2>
                            </div>
                            <div className="ml-12">
                                {s.content.split("\n\n").map((para, idx) => (
                                    <p
                                        key={idx}
                                        className="text-gray-600 leading-relaxed text-[15px] mb-4 last:mb-0 whitespace-pre-line"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA Footer */}
                <div className="mt-16 bg-indigo-600 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                    <p className="text-indigo-200 text-sm mb-6">
                        Our team is happy to clarify any part of these Terms.
                    </p>
                    <a
                        href="mailto:support@bank2xml.com"
                        className="inline-block bg-white text-indigo-600 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </main>
    );
}
