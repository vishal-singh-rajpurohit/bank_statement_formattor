
const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `Bank2XML ("we", "us", or "our") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you use our platform at www.bank2xml.com ("Service").

This policy applies to all users of Bank2XML — including Chartered Accountants, accounting professionals, and business owners — operating primarily within India.

By using Bank2XML, you consent to the practices described in this Privacy Policy. If you do not agree, please discontinue use of the Service immediately.

This Privacy Policy is governed by the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian laws.`,
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: `We collect the following categories of information:

2.1 Account Information
When you register, we collect your name, email address, phone number, and password (stored in encrypted form).

2.2 Payment Information
When you purchase a subscription or credits, payment is processed by Razorpay. We do not store your card number, CVV, or full banking credentials. We only receive a transaction confirmation and masked payment details from Razorpay. Razorpay's own privacy policy governs how your payment data is handled.

2.3 Uploaded Documents
When you upload a bank statement PDF, that document is temporarily processed by our AI systems to extract transaction data. We treat all uploaded documents as strictly confidential.

2.4 Processed Output Data
Transaction data extracted from your uploaded documents (dates, amounts, descriptions, account details) may be stored in your account to enable download history and re-access features.

2.5 Usage Data
We automatically collect technical information including your IP address, browser type, operating system, pages visited, time spent on the platform, and other diagnostic data to improve the Service.

2.6 Communications
If you contact us via email or our support channels, we retain those communications to respond to you and improve our support quality.`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use the information we collect for the following purposes:

• To provide, operate, and improve the Bank2XML Service.
• To process your uploaded bank statements and generate Tally-compatible output files (XML, CSV, Excel).
• To manage your account, subscription, and credit balance.
• To process payments and send billing confirmations via Razorpay.
• To send important service notices, security alerts, and account-related updates.
• To send promotional emails or product updates (you may opt out at any time).
• To detect, investigate, and prevent fraudulent or unauthorized activity.
• To comply with legal obligations under applicable Indian laws.
• To analyze platform usage and improve our AI accuracy and product features.

We will never use your uploaded bank statement data for any purpose beyond delivering the Service to you.`,
  },
  {
    id: "document-data-handling",
    title: "4. Document & Financial Data Handling",
    content: `We understand that bank statements contain highly sensitive financial information. We take the following measures to protect them:

4.1 Encryption
All documents uploaded to Bank2XML are encrypted in transit using TLS 1.2/1.3 and at rest using AES-256 encryption — the same standard used by leading banks.

4.2 Access Controls
Uploaded documents and extracted data are accessible only to you through your authenticated account. Our internal team accesses documents only when required to resolve a reported technical issue, and only with appropriate authorization.

4.3 Retention
We are in the process of formalizing our data retention schedule. Currently, uploaded PDFs and processed data may be retained in our systems to support your account history. We will update this section with specific retention periods once finalized. You may contact us at support@bank2xml.com to request deletion of your documents at any time.

4.4 No Third-Party Selling
We do not sell, rent, or trade your financial documents or extracted transaction data to any third party under any circumstances.`,
  },
  {
    id: "sharing",
    title: "5. Sharing of Information",
    content: `We do not sell your personal information. We may share your information only in the following limited circumstances:

5.1 Service Providers
We work with trusted third-party vendors who assist us in operating the Service, including:
• Razorpay — for payment processing
• Cloud infrastructure providers — for hosting and storage
• Analytics tools — for understanding platform usage

All service providers are bound by contractual obligations to keep your data confidential and use it only for the purpose of delivering services to us.

5.2 Legal Requirements
We may disclose your information if required to do so by law, court order, or government authority under applicable Indian law, or to protect the rights, property, or safety of Bank2XML, its users, or others.

5.3 Business Transfers
In the event of a merger, acquisition, or sale of assets, your information may be transferred to the successor entity. We will notify you via email before your data is transferred and becomes subject to a different privacy policy.

5.4 With Your Consent
We may share your information with third parties when you have explicitly consented to such sharing.`,
  },
  {
    id: "cookies",
    title: "6. Cookies & Tracking Technologies",
    content: `Bank2XML uses cookies and similar tracking technologies to enhance your experience on the platform.

6.1 What We Use Cookies For
• Keeping you logged in across sessions (authentication cookies).
• Remembering your preferences and settings.
• Analyzing how users navigate and use the platform (analytics cookies).
• Detecting and preventing security threats (security cookies).

6.2 Your Choices
You can control or delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of the Service, including the ability to stay logged in.

We do not use cookies to serve third-party advertising.`,
  },
  {
    id: "user-rights",
    title: "7. Your Rights & Choices",
    content: `As a user of Bank2XML, you have the following rights regarding your personal data:

7.1 Access
You may request a copy of the personal information we hold about you.

7.2 Correction
You may update or correct your account information at any time from your account settings, or by contacting us.

7.3 Deletion
You may request deletion of your account and associated personal data. We will process such requests within 30 days, subject to any legal obligations that require us to retain certain records.

7.4 Opt-Out of Marketing
You may unsubscribe from promotional emails at any time using the unsubscribe link in any email we send, or by emailing us at support@bank2xml.com.

7.5 Data Portability
You may request an export of your processed transaction data in a machine-readable format.

To exercise any of these rights, contact us at support@bank2xml.com. We will respond within 10 business days.`,
  },
  {
    id: "security",
    title: "8. Data Security",
    content: `We implement industry-standard security measures to protect your information, including:

• Bank-grade AES-256 encryption for data at rest.
• TLS encryption for all data transmitted to and from our servers.
• Role-based access controls limiting internal access to sensitive data.
• Regular security audits and vulnerability assessments.
• Secure authentication with hashed and salted password storage.

Despite these measures, no internet-based service can guarantee absolute security. In the event of a data breach that affects your personal information, we will notify you as required by applicable law.`,
  },
  {
    id: "third-party",
    title: "9. Third-Party Links & Services",
    content: `The Bank2XML platform may contain links to third-party websites or services (such as Tally ERP documentation or Razorpay). We are not responsible for the privacy practices of these third parties.

We encourage you to review the privacy policies of any third-party services you access through or in connection with Bank2XML.`,
  },
  {
    id: "children",
    title: "10. Children's Privacy",
    content: `Bank2XML is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us at support@bank2xml.com and we will promptly delete such information.`,
  },
  {
    id: "changes",
    title: "11. Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons.

When we make material changes, we will notify you by:
• Sending an email to the address associated with your account, and/or
• Displaying a prominent notice within the Bank2XML platform.

The updated policy will take effect on the date stated at the top of the page. We encourage you to review this page periodically. Your continued use of the Service after the effective date constitutes your acceptance of the updated Privacy Policy.`,
  },
  {
    id: "grievance",
    title: "12. Grievance Officer",
    content: `In accordance with the Information Technology Act, 2000 and the rules made thereunder, the name and contact details of the Grievance Officer are provided below:

Name: [Grievance Officer Name]
Designation: Grievance Officer
Organization: Bank2XML / [Your Company Name]
Email: grievance@bank2xml.com
Address: [Your Registered Office Address], India

The Grievance Officer will acknowledge your complaint within 24 hours and resolve it within 30 days of receipt.`,
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your data, please reach out to us:

Bank2XML
Email: support@bank2xml.com
Website: www.bank2xml.com

We aim to respond to all privacy-related inquiries within 5 business days.`,
  },
];

export default function PrivacyPolicy() {
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
              d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm0 0V7m0 4v4m6 4H6a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
            />
          </svg>
          Legal Document
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          We take your financial data seriously. Here's exactly how we handle it.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Last updated: June 16, 2026
        </p>
      </section>

      {/* Trust Badges */}
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              ),
              label: "Bank-grade Encryption",
              sub: "AES-256 + TLS",
            },
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ),
              label: "No Data Selling",
              sub: "We never sell your data",
            },
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              ),
              label: "IT Act Compliant",
              sub: "Governed by Indian law",
            },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-[#F5F6FF] border border-indigo-100 rounded-xl px-4 py-4"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {badge.icon}
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {badge.label}
                </p>
                <p className="text-xs text-gray-500">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
          <h3 className="text-xl font-bold mb-2">Questions about your data?</h3>
          <p className="text-indigo-200 text-sm mb-6">
            Reach out to our team — we'll respond within 5 business days.
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
