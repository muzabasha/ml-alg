import React from 'react';
import Link from 'next/link';

const InstructorPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-blue-600">
                            ML Learning Platform
                        </h1>
                        <nav className="space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-blue-600">
                                Home
                            </Link>
                            <Link href="/datasets" className="text-gray-700 hover:text-blue-600">
                                Datasets
                            </Link>
                            <Link href="/preprocessing" className="text-gray-700 hover:text-blue-600 transition">
                                Data Preprocessing
                            </Link>
                            <Link href="/feature-selection" className="text-gray-700 hover:text-blue-600 transition">
                                Feature Selection
                            </Link>
                            <Link href="/eda" className="text-gray-700 hover:text-blue-600">
                                EDA
                            </Link>
                            <Link href="/instructor" className="text-gray-700 hover:text-blue-600">
                                Instructor
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
                        <h2 className="text-3xl font-bold text-white">About the Instructor</h2>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Profile Section with Image */}
                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                            {/* Profile Image */}
                            <div className="flex-shrink-0">
                                <div className="w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-xl border-4 border-blue-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/DP_profile.png"
                                        alt="Dr. Syed Muzamil Basha"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Profile Header */}
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    Dr. Syed Muzamil Basha
                                </h1>
                                <p className="text-xl text-blue-600 font-semibold mb-2">
                                    Professor, School of Computer Science &amp; Engineering
                                </p>
                                <p className="text-gray-600 mb-4">
                                    REVA University, Rukmini Knowledge Park, Kattigenahalli, Yelahanka, Bengaluru, Karnataka 560064
                                </p>
                                <div className="flex flex-wrap gap-2">
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
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Email</p>
                                    <a href="mailto:muzamilbasha.s@reva.edu.in" className="text-blue-600 hover:underline">
                                        muzamilbasha.s@reva.edu.in
                                    </a>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                                    <p className="text-gray-900">+91 8331977568, +91 7259421438</p>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">About</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Dr. Syed Muzamil Basha is a Professor in the School of Computer Science and Engineering at REVA University,
                                Bangalore, Karnataka, India. He earned his Full-time Ph.D. from VIT University, Vellore (Deemed to be University (IoE))
                                (2016–2019), and has 15 years of teaching and research experience, including 2 years of postdoctoral experience at
                                University of Hail, Kingdom of Saudi Arabia (2020–2022).
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Dr. Basha is recognized as the <strong className="text-blue-600">3rd Best Scientist at REVA University</strong>
                                {' '}(AD Scientific Index 2024) with a VIDWAN Score of 9.5/10.
                            </p>
                        </div>

                        {/* Research Portfolio */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Research Portfolio</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-600">65</div>
                                    <div className="text-sm text-gray-600">Scopus Publications</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-green-600">25+</div>
                                    <div className="text-sm text-gray-600">Textbooks</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-purple-600">7</div>
                                    <div className="text-sm text-gray-600">Q1 Journals</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-orange-600">Multiple</div>
                                    <div className="text-sm text-gray-600">Patents</div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Links */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Academic Profiles</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <a href="https://scholar.google.co.in/citations?user=weNQmW0AAAAJ&hl=en"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <span>🎓</span> Google Scholar
                                </a>
                                <a href="https://www.scopus.com/authid/detail.uri?authorId=57195586589"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <span>📚</span> Scopus Profile
                                </a>
                                <a href="http://orcid.org/0000-0002-1169-3151"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <span>🔬</span> ORCID
                                </a>
                                <a href="https://publons.com/researcher/3362117/syed-muzamil"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <span>📖</span> Publons
                                </a>
                                <a href="https://www.researchgate.net/profile/Muzamil_Basha"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <span>🔗</span> ResearchGate
                                </a>
                                <a href="https://www.linkedin.com/in/muzamil-basha-syed-19612a25/"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <span>💼</span> LinkedIn
                                </a>
                            </div>
                        </div>

                        {/* Research Expertise */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">🔬 Research Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium">
                                    Agentic AI
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium">
                                    Natural Language Processing
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium">
                                    Big Data Analytics
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg text-sm font-medium">
                                    Blockchain Management
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium">
                                    Internet of Things (IoT)
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg text-sm font-medium">
                                    Machine Learning &amp; Deep Learning
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg text-sm font-medium">
                                    Federated Learning
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-sm font-medium">
                                    Healthcare Informatics
                                </span>
                                <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium">
                                    Cybersecurity
                                </span>
                            </div>
                        </div>

                        {/* Awards */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">🏆 Recent Awards</h3>
                            <div className="space-y-3">
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    <p className="font-semibold text-gray-900">International Outstanding Teacher Award 2024-25</p>
                                    <p className="text-sm text-gray-600">Green ThinkerZ Society and NGO Darpan, NITI Aayog (January 2025)</p>
                                </div>
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                    <p className="font-semibold text-gray-900">Best Professor for Computer Science Bengaluru North</p>
                                    <p className="text-sm text-gray-600">Karnataka Educational Awards (September 2024)</p>
                                </div>
                                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                                    <p className="font-semibold text-gray-900">Best Researcher Award</p>
                                    <p className="text-sm text-gray-600">Knowledge Research Academy, Coimbatore (August 2024)</p>
                                </div>
                                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                                    <p className="font-semibold text-gray-900">IEEE R10 Ethics Champion</p>
                                    <p className="text-sm text-gray-600">Recognition (2023–24)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorPage;
