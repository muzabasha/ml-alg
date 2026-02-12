import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Math component for inline formulas
const MathInline = ({ children }: { children: string }) => (
    <span className="font-mono bg-blue-50 px-2 py-1 rounded text-blue-900 border border-blue-200 text-sm">
        {children}
    </span>
);

// Code block component
const CodeBlock = ({ children }: { children: string }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm leading-relaxed">
        <code>{children}</code>
    </pre>
);

// Content renderer component
const ContentRenderer = ({ content }: { content: any }) => {
    if (typeof content === 'string') {
        const lines = content.split('\n');

        return (
            <div className="space-y-3">
                {lines.map((line, idx) => {
                    // Headers
                    if (line.startsWith('**') && line.endsWith('**')) {
                        const text = line.replace(/\*\*/g, '');
                        return <h4 key={idx} className="text-xl font-bold text-gray-900 mt-6 mb-3">{text}</h4>;
                    }

                    // Bullet points
                    if (line.startsWith('•') || line.startsWith('✓') || line.startsWith('✗') || line.startsWith('-')) {
                        const symbol = line.charAt(0);
                        const text = line.substring(1).trim();
                        return (
                            <li key={idx} className="flex items-start ml-4 my-2 text-gray-700">
                                <span className={`mr-2 ${symbol === '✓' ? 'text-green-500' : symbol === '✗' ? 'text-red-500' : 'text-blue-500'}`}>
                                    {symbol}
                                </span>
                                <span>{text}</span>
                            </li>
                        );
                    }

                    // Empty lines
                    if (line.trim() === '') {
                        return <div key={idx} className="h-2" />;
                    }

                    // Regular paragraphs
                    return <p key={idx} className="text-gray-700 leading-relaxed">{line}</p>;
                })}
            </div>
        );
    }

    // Handle object content
    if (typeof content === 'object' && content !== null) {
        return (
            <div className="space-y-4">
                {Object.entries(content).map(([key, value]: [string, any]) => (
                    <div key={key} className="mb-4">
                        <h4 className="font-bold text-gray-900 mb-2 capitalize">{key.replace(/_/g, ' ')}</h4>
                        <ContentRenderer content={value} />
                    </div>
                ))}
            </div>
        );
    }

    return <p className="text-gray-700">{String(content)}</p>;
};

const AlgorithmPage: React.FC = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('introduction');
    const [algorithmData, setAlgorithmData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && router.query.id) {
            const id = router.query.id as string;

            // Fetch algorithm data from public folder
            fetch(`/data/${id}.json`)
                .then(res => res.json())
                .then(data => {
                    setAlgorithmData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error loading algorithm data:', err);
                    setLoading(false);
                });
        }
    }, [mounted, router.query.id]);

    if (!mounted || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading algorithm content...</p>
                </div>
            </div>
        );
    }

    const { id } = router.query;

    if (!algorithmData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <header className="bg-white shadow-md">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-blue-600">ML Learning Platform</h1>
                            <nav className="space-x-6">
                                <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                                <Link href="/instructor" className="text-gray-700 hover:text-blue-600">Instructor</Link>
                            </nav>
                        </div>
                    </div>
                </header>
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Algorithm Not Found</h2>
                    <p className="text-gray-600 mb-8">The algorithm content could not be loaded.</p>
                    <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const sections = algorithmData.sections || {};
    const sectionKeys = Object.keys(sections);

    const getSectionContent = (section: any) => {
        if (!section) return 'Content not available';

        // Try different possible content fields
        return section.plainLanguage ||
            section.introduction ||
            section.content ||
            section.explanation ||
            JSON.stringify(section, null, 2);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-blue-600">ML Learning Platform</h1>
                        <nav className="space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                            <Link href="/instructor" className="text-gray-700 hover:text-blue-600">Instructor</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-6">
                    <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2 text-gray-500">/</span>
                    <span className="text-gray-700">{algorithmData.name}</span>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{algorithmData.name}</h1>
                    <div className="flex gap-3 mb-4">
                        <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            {algorithmData.category}
                        </span>
                        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${algorithmData.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {algorithmData.difficulty}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Sections</h3>
                            <nav className="space-y-2">
                                {sectionKeys.map((key, index) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveSection(key)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === key
                                                ? 'bg-blue-100 text-blue-800 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {index + 1}. {sections[key].title || key.replace(/_/g, ' ')}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                {sections[activeSection]?.title || activeSection.replace(/_/g, ' ')}
                            </h2>

                            <div className="prose prose-lg max-w-none">
                                <ContentRenderer content={getSectionContent(sections[activeSection])} />
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={() => {
                                        const currentIndex = sectionKeys.indexOf(activeSection);
                                        if (currentIndex > 0) setActiveSection(sectionKeys[currentIndex - 1]);
                                    }}
                                    disabled={sectionKeys.indexOf(activeSection) === 0}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => {
                                        const currentIndex = sectionKeys.indexOf(activeSection);
                                        if (currentIndex < sectionKeys.length - 1) setActiveSection(sectionKeys[currentIndex + 1]);
                                    }}
                                    disabled={sectionKeys.indexOf(activeSection) === sectionKeys.length - 1}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmPage;
