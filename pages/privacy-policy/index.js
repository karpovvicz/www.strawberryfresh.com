// app/privacy/page.js
import { Metadata } from 'next'

export const metadata = {
    title: 'Privacy Policy | StrawberryFresh.com',
    description: 'Our privacy policy explaining how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
                <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8">Privacy Policy</h1>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-4 mb-8">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Effective Date:</strong> 07.08.2025<br />
                        <strong>Last Updated:</strong> 07.08.2025
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">1. Information We Collect</h2>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">1.1 Personal Information</h3>
                    <p className="mb-4">We may collect the following personal information when you use our service:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Name and email address (when you create an account)</li>
                        <li>Username and profile information</li>
                        <li>Communication preferences</li>
                        <li>Device information and IP address</li>
                        <li>Browser type and version</li>
                        <li>Usage data and analytics</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">1.2 Automatically Collected Information</h3>
                    <p className="mb-4">We automatically collect certain information when you visit our website:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Log data (IP address, browser type, pages visited)</li>
                        <li>Cookies and similar tracking technologies</li>
                        <li>Device identifiers</li>
                        <li>Usage patterns and preferences</li>
                        <li>Referral sources</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">1.3 Third-Party Content</h3>
                    <p className="mb-4">Our service aggregates publicly available content from various social media platforms. We do not collect personal information from these third-party sources beyond what is publicly available.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">We use collected information for:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Providing and maintaining our service</li>
                        <li>Personalizing your experience</li>
                        <li>Communicating with you about our service</li>
                        <li>Improving our website and user experience</li>
                        <li>Complying with legal obligations</li>
                        <li>Protecting against fraud and abuse</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">3. Information Sharing and Disclosure</h2>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">3.1 We Do Not Sell Personal Information</h3>
                    <p className="mb-4">We do not sell, trade, or rent your personal information to third parties.</p>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">3.2 Service Providers</h3>
                    <p className="mb-4">We may share information with trusted service providers who assist us in:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Website hosting and maintenance</li>
                        <li>Analytics and performance monitoring</li>
                        <li>Customer support</li>
                        <li>Email communications</li>
                        <li>Payment processing (if applicable)</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">3.3 Legal Requirements</h3>
                    <p className="mb-4">We may disclose information when required by law or to:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Comply with legal processes</li>
                        <li>Protect our rights and property</li>
                        <li>Ensure user safety</li>
                        <li>Prevent fraud or abuse</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">4. Data Security</h2>
                    <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal information, including:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Regular security assessments</li>
                        <li>Access controls and authentication</li>
                        <li>Secure hosting environments</li>
                    </ul>
                    <p className="mb-4">However, no method of transmission or storage is 100% secure.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">5. Your Rights and Choices</h2>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">5.1 Access and Control</h3>
                    <p className="mb-4">You have the right to:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your account and associated data</li>
                        <li>Opt out of marketing communications</li>
                        <li>Request data portability</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">5.2 Cookies and Tracking</h3>
                    <p className="mb-4">You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">6. Data Retention</h2>
                    <p className="mb-4">We retain personal information for as long as necessary to provide our services or as required by law. When you delete your account, we will remove your personal information within 30 days.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">7. International Data Transfers</h2>
                    <p className="mb-4">If you are located outside [Your Country], your information may be transferred to and processed in [Your Country]. We ensure appropriate safeguards are in place for such transfers.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">8. Children's Privacy</h2>
                    <p className="mb-4">Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">9. Changes to This Policy</h2>
                    <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of significant changes by:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Posting the updated policy on our website</li>
                        <li>Sending email notifications to registered users</li>
                        <li>Displaying prominent notices on our service</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">10. Contact Information</h2>
                    <p className="mb-4">If you have questions about this Privacy Policy, please contact us at:</p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <ul className="space-y-1">
                            <li><strong>Email:</strong> <a href="mailto:itstrawberryfresh@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">itstrawberryfresh@gmail.com</a></li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">11. Regional Compliance</h2>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">11.1 GDPR (European Union)</h3>
                    <p className="mb-4">For EU residents, we comply with the General Data Protection Regulation (GDPR), including:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Lawful basis for processing</li>
                        <li>Right to be forgotten</li>
                        <li>Data portability rights</li>
                        <li>Consent management</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">11.2 CCPA (California)</h3>
                    <p className="mb-4">For California residents, we comply with the California Consumer Privacy Act (CCPA), including:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Right to know about personal information collected</li>
                        <li>Right to delete personal information</li>
                        <li>Right to opt-out of sale of personal information</li>
                        <li>Non-discrimination for exercising privacy rights</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-3">11.3 Other Jurisdictions</h3>
                    <p className="mb-4">We strive to comply with applicable privacy laws in all jurisdictions where we operate.</p>
                </section>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mt-8">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        <strong>Note:</strong> By accessing or using this application, you acknowledge that you have read, understood, and agreed to be bound by the terms of this Privacy Policy. If you do not agree with any part of this policy, you must refrain from using the application.
                    </p>
                </div>
            </div>
        </div>
    )
}
