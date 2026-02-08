import React from 'react';
import Image from 'next/image';

const InstructorProfile: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">About the Instructor</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 p-8">
                {/* Left Column - Profile Image */}
                <div className="md:w-1/3 flex-shrink-0">
                    <div className="sticky top-8">
                        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src="/DP_profile.png"
                                alt="Dr. Syed Muzamil Basha"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Quick Contact Card */}
                        <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-600">📧</span>
                                    <a href="mailto:muzamilbasha.s@reva.edu.in" className="text-blue-600 hover:underline">
                                        muzamilbasha.s@reva.edu.in
                                    </a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-600">📱</span>
                                    <div>
                                        <div>+91 8331977568</div>
                                        <div>+91 7259421438</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-600">🏢</span>
                                    <div className="text-gray-600">
                                        REVA University<br />
                                        Bengaluru, Karnataka 560064
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Links */}
                        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h3 className="font-semibold text-gray-800 mb-3">Academic Profiles</h3>
                            <div className="space-y-2">
                                <a href="https://scholar.google.co.in/citations?user=weNQmW0AAAAJ&hl=en"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <span>🎓</span> Google Scholar
                                </a>
                                <a href="https://www.scopus.com/authid/detail.uri?authorId=57195586589"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <span>📚</span> Scopus Profile
                                </a>
                                <a href="http://orcid.org/0000-0002-1169-3151"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <span>🔬</span> ORCID
                                </a>
                                <a href="https://publons.com/researcher/3362117/syed-muzamil"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <span>📖</span> Publons
                                </a>
                                <a href="https://www.researchgate.net/profile/Muzamil_Basha"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <span>🔗</span> ResearchGate
                                </a>
                                <a href="https://www.linkedin.com/in/muzamil-basha-syed-19612a25/"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <span>💼</span> LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Profile Content */}
                <div className="md:w-2/3">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Dr. Syed Muzamil Basha
                        </h1>
                        <p className="text-xl text-blue-600 font-semibold mb-2">
                            Professor, School of Computer Science & Engineering
                        </p>
                        <p className="text-gray-600">
                            REVA University, Rukmini Knowledge Park, Kattigenahalli, Yelahanka, Bengaluru, Karnataka 560064
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                ACM Professional Member
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                ISTE Lifetime Member
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                VIDWAN Score: 9.5/10
                            </span>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="prose max-w-none mb-6">
                        <p className="text-gray-700 leading-relaxed">
                            Dr. Syed Muzamil Basha is a Professor in the School of Computer Science and Engineering at REVA University,
                            Bangalore, Karnataka, India. He earned his Full-time Ph.D. from VIT University, Vellore (Deemed to be University (IoE))
                            (2016–2019), and has 15 years of teaching and research experience, including 2 years of postdoctoral experience at
                            University of Hail, Kingdom of Saudi Arabia (2020–2022).
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            Dr. Basha is recognized as the <strong className="text-blue-600">3rd Best Scientist at REVA University</strong>
                            (AD Scientific Index 2024) with a VIDWAN Score of 9.5/10.
                        </p>
                    </div>

                    {/* Research Portfolio */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-2xl">📊</span> Research Portfolio
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="text-3xl font-bold text-blue-600">65</div>
                                <div className="text-sm text-gray-600">Scopus-indexed Publications</div>
                                <div className="text-xs text-gray-500 mt-1">40 journals • 15 conference proceedings</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="text-3xl font-bold text-green-600">25+</div>
                                <div className="text-sm text-gray-600">Textbooks Published</div>
                                <div className="text-xs text-gray-500 mt-1">Springer, IGI Global, + 2 edited</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="text-3xl font-bold text-purple-600">7</div>
                                <div className="text-sm text-gray-600">Q1 Journal Publications</div>
                                <div className="text-xs text-gray-500 mt-1">9 Q2 • 10 Q3 • 6 Q4</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="text-3xl font-bold text-orange-600">Multiple</div>
                                <div className="text-sm text-gray-600">Patents & Designs</div>
                                <div className="text-xs text-gray-500 mt-1">German, Australian, Indian patents</div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-blue-200">
                            <p className="text-sm text-gray-700 font-medium mb-2">High-Impact Publications in:</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">IEEE Trans. Consumer Electronics</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">IEEE IoT Journal</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">PLOS ONE</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">BMC Medical Imaging</span>
                            </div>
                        </div>
                    </div>

                    {/* Leadership Roles */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">👔</span> Leadership & Administrative Roles
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">▸</span>
                                <span className="text-gray-700">
                                    <strong>Research and Innovation Vertical Head</strong> at REVA University (June 2021 – Feb 2026)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">▸</span>
                                <span className="text-gray-700"><strong>NBA-NAAC Coordinator</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">▸</span>
                                <span className="text-gray-700"><strong>IEEE Computer Society Chair</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">▸</span>
                                <span className="text-gray-700">
                                    <strong>PhD Supervision:</strong> 3 scholars awarded, 2 submitted thesis, 3 currently under guidance
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Awards & Recognition */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">🏆</span> Awards & Recognition
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                                <p className="font-semibold text-gray-900">International Outstanding Teacher Award 2024-25</p>
                                <p className="text-sm text-gray-600">Green ThinkerZ Society and NGO Darpan, NITI Aayog (January 2025)</p>
                            </div>
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                                <p className="font-semibold text-gray-900">Best Professor for Computer Science Bengaluru North</p>
                                <p className="text-sm text-gray-600">Karnataka Educational Awards (September 2024)</p>
                            </div>
                            <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                                <p className="font-semibold text-gray-900">Best Researcher Award</p>
                                <p className="text-sm text-gray-600">Knowledge Research Academy, Coimbatore (August 2024)</p>
                            </div>
                            <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
                                <p className="font-semibold text-gray-900">IEEE R10 Ethics Champion</p>
                                <p className="text-sm text-gray-600">Recognition (2023–24)</p>
                            </div>

                            <details className="bg-gray-50 rounded-lg p-3 cursor-pointer">
                                <summary className="font-semibold text-gray-900">View More Awards (8 additional)</summary>
                                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                                    <li>• RAMFOO Outstanding Faculty Award (March 2023)</li>
                                    <li>• CHSN-2022 Young Researcher Award (December 2022)</li>
                                    <li>• Best Paper Award - IACIT, REVA University (2021–22)</li>
                                    <li>• Raman Research Award - VIT (2019–20)</li>
                                    <li>• Research Award - VIT (2018–19)</li>
                                    <li>• Best Researcher Award for PhD thesis supervision (December 2024)</li>
                                    <li>• Certificate of Merit - 3rd place in M.Tech at VIT University (2010–11)</li>
                                </ul>
                            </details>
                        </div>
                    </div>

                    {/* Research Expertise */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">🔬</span> Research Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Agentic AI
                            </span>
                            <span className="px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Natural Language Processing
                            </span>
                            <span className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Big Data Analytics
                            </span>
                            <span className="px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Blockchain Management
                            </span>
                            <span className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Internet of Things (IoT)
                            </span>
                            <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Machine Learning & Deep Learning
                            </span>
                            <span className="px-3 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Federated Learning
                            </span>
                            <span className="px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Healthcare Informatics
                            </span>
                            <span className="px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium shadow-sm">
                                Cybersecurity
                            </span>
                        </div>
                    </div>

                    {/* Editorial & Review Work */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">📝</span> Editorial & Review Work
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-gray-700 mb-3">
                                Dr. Basha serves as a reviewer and editorial board member for numerous international journals:
                            </p>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <strong className="text-gray-900">Editorial Member:</strong>
                                    <span className="text-gray-600"> American Journal of Health Research, Journal of Ubiquitous Computing and Communication Technologies, Discover Analytics, Journal of Innovative Technology Convergence, Milestone Transactions on Medical Technometrics</span>
                                </div>
                                <div>
                                    <strong className="text-gray-900">Senior Reviewer:</strong>
                                    <span className="text-gray-600"> IEEE Transactions on Consumer Electronics, IEEE Internet of Things Journal, PLOS ONE</span>
                                </div>
                                <div>
                                    <strong className="text-gray-900">Conference Roles:</strong>
                                    <span className="text-gray-600"> Session Chair and Technical Program Chair for IDCIoT, WSSE, and other international conferences</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Service */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">🎓</span> Academic Service
                        </h3>
                        <p className="text-gray-700">
                            Academic Council and Board of Studies member for institutions across Karnataka, Andhra Pradesh, and Tamil Nadu.
                            Organizer of numerous international conferences and active contributor to curriculum development and academic excellence initiatives.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorProfile;
