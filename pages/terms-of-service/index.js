// app/terms/page.js
import { Metadata } from 'next'

export const metadata = {
    title: 'Terms of Service | StrawberryFresh.com',
    description: 'Our terms of service outlining the rules and regulations for using our content aggregation platform.',
}

export default function TermsOfService() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
                <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8">Terms of Service</h1>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-4 mb-8">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Effective Date:</strong>07.07.2025<br />
                        <strong>Last Updated:</strong> 07.07.2025
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-4">By accessing or using www.strawberryfresh.com ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Service.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">2. Description of Service</h2>
                    <p className="mb-4">www.strawberryfresh.com is a content aggregation platform that collects and displays publicly available content from various social media platforms including Reddit, Facebook, YouTube, Twitter, and others. We curate and present this content for user convenience and discovery.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">3. User Eligibility</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">3.1 Age Requirements</h3>
                    <p className="mb-4">You must be at least 13 years old to use our Service. Users under 18 must have parental consent.</p>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">3.2 Account Registration</h3>
                    <p className="mb-4">To access certain features, you may need to create an account. You are responsible for:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Providing accurate information</li>
                        <li>Maintaining account security</li>
                        <li>All activities under your account</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">4. Content and Intellectual Property</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">4.1 Third-Party Content</h3>
                    <p className="mb-4">Our Service displays content from third-party platforms. We do not claim ownership of this content. All content remains the property of its original creators and platforms.</p>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">4.2 Content Use</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Content is displayed for informational and entertainment purposes</li>
                        <li>We aggregate publicly available content under fair use principles</li>
                        <li>Users should respect original creators' rights</li>
                        <li>Content may be subject to original platforms' terms of service</li>
                    </ul>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">4.3 DMCA Compliance</h3>
                    <p className="mb-4">We respect intellectual property rights and comply with the Digital Millennium Copyright Act (DMCA). If you believe your content has been used improperly:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Contact us at <a href="mailto:itstrawberryfresh@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">itstrawberryfresh@gmail.com</a></li>
                        <li>Provide detailed information about the alleged infringement</li>
                        <li>We will respond promptly to valid takedown requests</li>
                    </ul>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">4.4 User-Generated Content</h3>
                    <p className="mb-4">If you post content on our Service:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>You retain ownership of your content</li>
                        <li>You grant us a license to display and distribute your content</li>
                        <li>You represent that you have the right to post such content</li>
                        <li>You are responsible for your content's legality and accuracy</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">5. Acceptable Use Policy</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">5.1 Prohibited Activities</h3>
                    <p className="mb-4">You may not:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on others' intellectual property rights</li>
                        <li>Post harmful, offensive, or illegal content</li>
                        <li>Engage in spam, harassment, or abusive behavior</li>
                        <li>Attempt to hack, disrupt, or compromise our Service</li>
                        <li>Use automated tools to scrape or access our Service</li>
                        <li>Impersonate others or provide false information</li>
                    </ul>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">5.2 Content Standards</h3>
                    <p className="mb-4">All user contributions must:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Be lawful and not infringe on others' rights</li>
                        <li>Be accurate and not misleading</li>
                        <li>Respect community guidelines</li>
                        <li>Comply with applicable platform policies</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">6. Privacy and Data Protection</h2>
                    <p className="mb-4">Your privacy is important to us. Please review our <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>, which explains how we collect, use, and protect your information.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">7. Service Availability</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">7.1 Service Modifications</h3>
                    <p className="mb-4">We reserve the right to:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Modify, suspend, or discontinue the Service</li>
                        <li>Change features or functionality</li>
                        <li>Update content aggregation methods</li>
                        <li>Implement new policies or procedures</li>
                    </ul>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">7.2 No Warranty</h3>
                    <p className="mb-4">Our Service is provided "as is" without warranties of any kind. We do not guarantee:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Uninterrupted or error-free operation</li>
                        <li>Accuracy or completeness of content</li>
                        <li>Availability of third-party content</li>
                        <li>Compatibility with all devices or browsers</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">8. Limitation of Liability</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">8.1 Disclaimer</h3>
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 mb-4">
                        <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-red-700 dark:text-red-300">
                            <li>INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES</li>
                            <li>LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES</li>
                            <li>DAMAGES ARISING FROM USE OF THIRD-PARTY CONTENT</li>
                            <li>INTERRUPTION OF SERVICE OR TECHNICAL ISSUES</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">8.2 Liability Cap</h3>
                    <p className="mb-4">Our total liability to you for all claims shall not exceed $100 or the amount you paid us in the past 12 months, whichever is greater.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">9. Indemnification</h2>
                    <p className="mb-4">You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Your use of our Service</li>
                        <li>Your violation of these Terms</li>
                        <li>Your violation of any third-party rights</li>
                        <li>Content you post or share</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">10. Third-Party Platforms</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">10.1 Platform Relationships</h3>
                    <p className="mb-4">We aggregate content from various platforms but are not affiliated with or endorsed by these platforms. Each platform has its own terms of service.</p>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">10.2 Platform Changes</h3>
                    <p className="mb-4">Content availability may change based on:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Third-party platform policies</li>
                        <li>API access changes</li>
                        <li>Content removal by original platforms</li>
                        <li>Technical limitations</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">11. Termination</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">11.1 Termination by You</h3>
                    <p className="mb-4">You may terminate your account at any time by contacting us or using account deletion features.</p>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">11.2 Termination by Us</h3>
                    <p className="mb-4">We may terminate or suspend your access immediately for:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Violation of these Terms</li>
                        <li>Illegal or harmful activity</li>
                        <li>Repeated policy violations</li>
                        <li>Technical or security reasons</li>
                    </ul>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">11.3 Effect of Termination</h3>
                    <p className="mb-4">Upon termination:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Your right to use the Service ends immediately</li>
                        <li>We may delete your account and associated data</li>
                        <li>Certain provisions of these Terms survive termination</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">12. Dispute Resolution</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">12.1 Governing Law</h3>
                    <p className="mb-4">These Terms are governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.</p>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">12.2 Arbitration</h3>
                    <p className="mb-4">Any disputes arising from these Terms shall be resolved through binding arbitration in [Your Jurisdiction], except for:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Claims for injunctive relief</li>
                        <li>Small claims court matters</li>
                        <li>Intellectual property disputes</li>
                    </ul>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">12.3 Class Action Waiver</h3>
                    <p className="mb-4">You agree not to participate in class actions or collective proceedings against us.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">13. Miscellaneous</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">13.1 Severability</h3>
                    <p className="mb-4">If any provision of these Terms is deemed invalid, the remaining provisions remain in full force.</p>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">13.2 Entire Agreement</h3>
                    <p className="mb-4">These Terms, along with our Privacy Policy, constitute the entire agreement between you and us.</p>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">13.3 Assignment</h3>
                    <p className="mb-4">We may assign these Terms without notice. You may not assign your rights under these Terms.</p>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">13.4 Updates</h3>
                    <p className="mb-4">We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of new Terms.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">14. Contact Information</h2>
                    <p className="mb-4">For questions about these Terms, please contact us at:</p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <ul className="space-y-1">
                            <li><strong>Email:</strong> <a href="mailto:itstawberryfresh@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">itstrawberryfresh@gmail.com</a></li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">15. Special Provisions for Content Aggregation</h2>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">15.1 Content Sources</h3>
                    <p className="mb-4">We aggregate content from publicly available sources and APIs. Content availability depends on:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Platform API access</li>
                        <li>Content creator permissions</li>
                        <li>Platform policy changes</li>
                        <li>Technical limitations</li>
                    </ul>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">15.2 Fair Use</h3>
                    <p className="mb-4">We believe our use of third-party content constitutes fair use under copyright law as:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Content is used for informational purposes</li>
                        <li>We provide attribution to original sources</li>
                        <li>We link back to original content</li>
                        <li>Our use is transformative and educational</li>
                    </ul>

                    <h3 className="text-xl font-medium text-zinc-700 dark:text-gray-300 mb-3">15.3 Content Removal</h3>
                    <p className="mb-4">We will promptly remove content upon:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Valid DMCA takedown requests</li>
                        <li>Platform API restrictions</li>
                        <li>Content creator requests</li>
                        <li>Legal requirements</li>
                    </ul>
                </section>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mt-8">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        <strong>IMPORTANT LEGAL NOTICE:</strong> By accessing or using this application, you acknowledge that you have read, understood, and agreed to be bound by the terms of this Privacy Policy. If you do not agree with any part of this policy, you must refrain from using the application.
                    </p>
                </div>
            </div>
        </div>
    )
}