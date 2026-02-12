import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';

// Dynamic import for DataVisualization to avoid SSR issues with Chart.js
const DataVisualization = dynamic(() => import('../../components/DataVisualization'), {
    ssr: false,
    loading: () => (
        <div className="my-6 p-6 bg-white rounded-xl shadow-lg border-2 border-green-200">
            <div className="flex items-center justify-center h-64">
                <span className="text-green-600 animate-pulse">Loading visualization...</span>
            </div>
        </div>
    )
});

// Dynamic import for Neural Network Playground
const NeuralNetworkPlayground = dynamic(() => import('../../components/NeuralNetworkPlayground'), {
    ssr: false,
    loading: () => (
        <div className="my-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-2xl border-2 border-indigo-200">
            <div className="flex items-center justify-center h-96">
                <span className="text-indigo-600 animate-pulse text-lg">Loading Neural Network Playground...</span>
            </div>
        </div>
    )
});

// Type definition for KaTeX
interface KaTeXStatic {
    renderToString(tex: string, options?: any): string;
}

// LaTeX renderer component
const LaTeXRenderer = ({ latex }: { latex: string }) => {
    const [rendered, setRendered] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const renderLatex = async () => {
            try {
                setLoading(true);
                setError(null);

                // Dynamic import with proper typing
                const katexModule = await import('katex' as any);
                const katex: KaTeXStatic = katexModule.default || katexModule;

                const html = katex.renderToString(latex, {
                    throwOnError: false,
                    displayMode: true,
                    output: 'html',
                    strict: false
                });

                setRendered(html);
                setLoading(false);
            } catch (err) {
                console.error('LaTeX rendering error:', err);
                setError('Failed to render equation');
                setLoading(false);
                // Fallback: show formatted LaTeX code
                setRendered(`<code class="text-purple-900">${latex}</code>`);
            }
        };
        renderLatex();
    }, [latex]);

    if (loading) {
        return (
            <div className="my-6 p-6 bg-purple-50 rounded-xl border-2 border-purple-200 overflow-x-auto">
                <div className="flex items-center justify-center text-purple-600">
                    <span className="animate-pulse">Rendering equation...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-6 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200 overflow-x-auto">
                <div className="text-yellow-800">
                    <p className="font-semibold mb-2">⚠️ Equation Display</p>
                    <code className="text-sm">{latex}</code>
                </div>
            </div>
        );
    }

    return (
        <div
            className="my-6 p-6 bg-purple-50 rounded-xl border-2 border-purple-200 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: rendered }}
        />
    );
};

// Enhanced content renderer with section-specific styling and LaTeX support
const SectionRenderer = ({ sectionKey, content }: { sectionKey: string; content: any }) => {
    const sectionStyles: Record<string, { bg: string; border: string; icon: string; accent: string }> = {
        introduction: {
            bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
            border: 'border-l-4 border-blue-500',
            icon: '📚',
            accent: 'text-blue-600'
        },
        mathematical_model: {
            bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
            border: 'border-l-4 border-purple-500',
            icon: '🔢',
            accent: 'text-purple-600'
        },
        sample_input_output: {
            bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
            border: 'border-l-4 border-green-500',
            icon: '📊',
            accent: 'text-green-600'
        },
        sample_io: {
            bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
            border: 'border-l-4 border-green-500',
            icon: '📊',
            accent: 'text-green-600'
        },
        interpretation_of_output: {
            bg: 'bg-gradient-to-br from-yellow-50 to-orange-50',
            border: 'border-l-4 border-yellow-500',
            icon: '🔍',
            accent: 'text-yellow-600'
        },
        implementation_from_scratch: {
            bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
            border: 'border-l-4 border-gray-500',
            icon: '⚙️',
            accent: 'text-gray-600'
        },
        implementation_with_api: {
            bg: 'bg-gradient-to-br from-cyan-50 to-teal-50',
            border: 'border-l-4 border-cyan-500',
            icon: '🚀',
            accent: 'text-cyan-600'
        },
        model_evaluation: {
            bg: 'bg-gradient-to-br from-red-50 to-rose-50',
            border: 'border-l-4 border-red-500',
            icon: '📈',
            accent: 'text-red-600'
        },
        performance_interpretation: {
            bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
            border: 'border-l-4 border-amber-500',
            icon: '💡',
            accent: 'text-amber-600'
        },
        ways_to_improve: {
            bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
            border: 'border-l-4 border-emerald-500',
            icon: '🎯',
            accent: 'text-emerald-600'
        }
    };

    const style = sectionStyles[sectionKey] || sectionStyles.introduction;

    const renderContent = (data: any, depth: number = 0): JSX.Element => {
        if (typeof data === 'string') {
            // Check if it's code
            if (data.includes('import ') || data.includes('def ') || data.includes('class ') ||
                (data.split('\n').length > 3 && data.includes('    '))) {
                return (
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-6 shadow-lg border border-gray-700">
                        <code className="text-sm leading-relaxed font-mono">{data}</code>
                    </pre>
                );
            }

            // Regular text with formatting
            const lines = data.split('\n');
            return (
                <div className="space-y-3">
                    {lines.map((line, idx) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                            const text = line.replace(/\*\*/g, '');
                            return (
                                <h4 key={idx} className={`text-xl font-bold ${style.accent} mt-6 mb-3 flex items-center gap-2`}>
                                    <span className="text-2xl">{style.icon}</span>
                                    {text}
                                </h4>
                            );
                        }

                        if (line.startsWith('•') || line.startsWith('✓') || line.startsWith('✗') || line.startsWith('-')) {
                            const symbol = line.charAt(0);
                            const text = line.substring(1).trim();
                            const iconColor = symbol === '✓' ? 'text-green-500' :
                                symbol === '✗' ? 'text-red-500' :
                                    'text-blue-500';
                            return (
                                <li key={idx} className="flex items-start ml-4 my-3 text-gray-700 hover:bg-gray-50 p-2 rounded transition">
                                    <span className={`mr-3 text-lg ${iconColor} font-bold`}>{symbol}</span>
                                    <span className="flex-1">{text}</span>
                                </li>
                            );
                        }

                        if (line.trim() === '') {
                            return <div key={idx} className="h-3" />;
                        }

                        if (line.includes('`') && line.split('`').length === 3) {
                            const parts = line.split('`');
                            return (
                                <p key={idx} className="text-gray-700 leading-relaxed my-2">
                                    {parts[0]}
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800 border border-gray-300">
                                        {parts[1]}
                                    </code>
                                    {parts[2]}
                                </p>
                            );
                        }

                        return (
                            <p key={idx} className="text-gray-700 leading-relaxed my-2 text-justify">
                                {line}
                            </p>
                        );
                    })}
                </div>
            );
        }

        if (Array.isArray(data)) {
            return (
                <div className="space-y-4">
                    {data.map((item, idx) => (
                        <div key={idx} className={`${style.bg} p-6 rounded-lg ${style.border} shadow-sm`}>
                            {renderContent(item, depth + 1)}
                        </div>
                    ))}
                </div>
            );
        }

        if (typeof data === 'object' && data !== null) {
            return (
                <div className="space-y-6">
                    {Object.entries(data).map(([key, value]: [string, any]) => {
                        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                        // Special handling for LaTeX equations
                        if (key === 'latex') {
                            return (
                                <div key={key} className="my-4">
                                    <LaTeXRenderer latex={String(value)} />
                                </div>
                            );
                        }

                        // Special handling for equations array
                        if (key === 'equations' && Array.isArray(value)) {
                            return (
                                <div key={key} className="my-6">
                                    <h5 className={`font-bold ${style.accent} mb-4 text-lg flex items-center gap-2`}>
                                        <span>📐</span> {formattedKey}
                                    </h5>
                                    <div className="space-y-6">
                                        {value.map((eq: any, eqIdx: number) => (
                                            <div key={eqIdx} className="bg-white p-6 rounded-xl shadow-md border-2 border-purple-100">
                                                {eq.name && (
                                                    <h6 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
                                                        <span>📌</span> {eq.name}
                                                    </h6>
                                                )}
                                                {eq.latex && <LaTeXRenderer latex={eq.latex} />}
                                                {eq.formula && !eq.latex && (
                                                    <div className="font-mono bg-purple-50 px-4 py-3 rounded-lg text-purple-900 border border-purple-200 my-3">
                                                        {eq.formula}
                                                    </div>
                                                )}
                                                {eq.explanation && (
                                                    <p className="text-gray-700 mt-4 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-purple-400">
                                                        <span className="font-semibold text-purple-700">Explanation: </span>
                                                        {eq.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        if (key === 'code' || key === 'implementation') {
                            return (
                                <div key={key} className="my-6">
                                    <h5 className={`font-bold ${style.accent} mb-3 text-lg flex items-center gap-2`}>
                                        <span>💻</span> {formattedKey}
                                    </h5>
                                    {renderContent(value, depth + 1)}
                                </div>
                            );
                        }

                        if (key === 'metrics' && Array.isArray(value)) {
                            return (
                                <div key={key} className="my-6">
                                    <h5 className={`font-bold ${style.accent} mb-4 text-lg flex items-center gap-2`}>
                                        <span>📊</span> {formattedKey}
                                    </h5>
                                    <div className="grid gap-4">
                                        {value.map((metric: any, mIdx: number) => (
                                            <div key={mIdx} className="bg-white p-5 rounded-xl shadow-md border-2 border-red-100">
                                                {metric.name && (
                                                    <h6 className="text-lg font-bold text-red-700 mb-2">
                                                        {metric.name}
                                                    </h6>
                                                )}
                                                {metric.formula && (
                                                    <div className="font-mono bg-red-50 px-3 py-2 rounded text-red-900 border border-red-200 my-2 text-sm">
                                                        {metric.formula}
                                                    </div>
                                                )}
                                                {metric.interpretation && (
                                                    <p className="text-gray-700 mt-2 text-sm">
                                                        <span className="font-semibold">Interpretation: </span>
                                                        {metric.interpretation}
                                                    </p>
                                                )}
                                                {metric.example && (
                                                    <p className="text-gray-600 mt-2 text-sm italic">
                                                        <span className="font-semibold">Example: </span>
                                                        {metric.example}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        if (key === 'name' || key === 'formula') {
                            return (
                                <div key={key} className="mb-2">
                                    <span className="font-semibold text-gray-900">{formattedKey}: </span>
                                    <span className="font-mono bg-purple-50 px-3 py-1 rounded text-purple-900 border border-purple-200">
                                        {String(value)}
                                    </span>
                                </div>
                            );
                        }

                        return (
                            <div key={key} className="mb-6">
                                <h5 className={`font-bold ${style.accent} mb-3 text-lg capitalize`}>
                                    {formattedKey}
                                </h5>
                                <div className={`${style.bg} p-4 rounded-lg ${style.border} shadow-sm`}>
                                    {renderContent(value, depth + 1)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return <p className="text-gray-700">{String(data)}</p>;
    };

    return (
        <div className="space-y-6">
            {/* Add visualization for sample input/output sections */}
            {(sectionKey === 'sample_io' || sectionKey === 'sample_input_output') && content && (
                <DataVisualization data={content} algorithmType={sectionKey} />
            )}
            {renderContent(content)}
        </div>
    );
};

const AlgorithmPage: React.FC = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('introduction');
    const [algorithmData, setAlgorithmData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showPlayground, setShowPlayground] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && router.query.id) {
            const algorithmId = router.query.id as string;

            fetch(`/data/${algorithmId}.json`)
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
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading algorithm content...</p>
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
                                <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                                <Link href="/instructor" className="text-gray-700 hover:text-blue-600 transition">Instructor</Link>
                            </nav>
                        </div>
                    </div>
                </header>
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Algorithm Not Found</h2>
                    <p className="text-gray-600 mb-8">The algorithm content could not be loaded.</p>
                    <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const sections = algorithmData.sections || {};
    const sectionKeys = Object.keys(sections);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-blue-600">ML Learning Platform</h1>
                        <nav className="space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                            <Link href="/instructor" className="text-gray-700 hover:text-blue-600 transition">Instructor</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-6 flex items-center gap-2 text-sm">
                    <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-700">{algorithmData.name}</span>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-2xl p-8 mb-6 text-white">
                    <h1 className="text-4xl font-bold mb-3">{algorithmData.name}</h1>
                    <div className="flex gap-3 mb-4 flex-wrap">
                        <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-semibold">
                            {algorithmData.category}
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${algorithmData.difficulty === 'Beginner' ? 'bg-green-500' :
                            algorithmData.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                                'bg-red-500'
                            }`}>
                            {algorithmData.difficulty}
                        </span>
                        {algorithmData.estimatedTime && (
                            <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-semibold">
                                ⏱️ {algorithmData.estimatedTime}
                            </span>
                        )}
                        {/* Show playground button for neural network algorithms */}
                        {(algorithmData.id === 'ann' || algorithmData.id === 'cnn' || algorithmData.id === 'rnn') && (
                            <button
                                onClick={() => setShowPlayground(!showPlayground)}
                                className="px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-semibold hover:bg-opacity-90 transition flex items-center gap-2"
                            >
                                <span>🧠</span>
                                {showPlayground ? 'Hide' : 'Show'} Interactive Playground
                            </button>
                        )}
                    </div>
                </div>

                {/* Neural Network Playground */}
                {showPlayground && (algorithmData.id === 'ann' || algorithmData.id === 'cnn' || algorithmData.id === 'rnn') && (
                    <NeuralNetworkPlayground />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">📑 Sections</h3>
                            <nav className="space-y-2">
                                {sectionKeys.map((key, index) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveSection(key)}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${activeSection === key
                                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md transform scale-105'
                                            : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                                            }`}
                                    >
                                        <span className="font-semibold">{index + 1}.</span> {sections[key].title || key.replace(/_/g, ' ')}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-xl p-8 lg:p-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">
                                {sections[activeSection]?.title || activeSection.replace(/_/g, ' ')}
                            </h2>

                            <div className="prose prose-lg max-w-none">
                                <SectionRenderer
                                    sectionKey={activeSection}
                                    content={sections[activeSection]}
                                />
                            </div>

                            <div className="mt-10 pt-6 border-t-2 border-gray-200 flex justify-between items-center">
                                <button
                                    onClick={() => {
                                        const currentIndex = sectionKeys.indexOf(activeSection);
                                        if (currentIndex > 0) setActiveSection(sectionKeys[currentIndex - 1]);
                                    }}
                                    disabled={sectionKeys.indexOf(activeSection) === 0}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                                >
                                    ← Previous
                                </button>
                                <span className="text-gray-500 text-sm">
                                    {sectionKeys.indexOf(activeSection) + 1} / {sectionKeys.length}
                                </span>
                                <button
                                    onClick={() => {
                                        const currentIndex = sectionKeys.indexOf(activeSection);
                                        if (currentIndex < sectionKeys.length - 1) setActiveSection(sectionKeys[currentIndex + 1]);
                                    }}
                                    disabled={sectionKeys.indexOf(activeSection) === sectionKeys.length - 1}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
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
