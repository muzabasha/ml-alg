import React from 'react';

interface EnhancedSampleIOProps {
    content: any;
    icon: string;
    accent: string;
}

const EnhancedSampleIO: React.FC<EnhancedSampleIOProps> = ({ content, icon, accent }) => {
    // Wrap everything in try-catch to prevent crashes
    try {
        // Safety check - if no content, show simple message
        if (!content) {
            return (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <p className="text-gray-600">No sample data available for this algorithm.</p>
                </div>
            );
        }

        // Check if content has input/output structure
        const hasStructuredData = typeof content === 'object' && content !== null && (content.input || content.output);

        if (!hasStructuredData) {
            // Fallback: display as text
            return (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{icon}</span>
                        <h3 className={`text-xl font-bold ${accent}`}>Sample Input & Output</h3>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                            {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
                        </pre>
                    </div>
                </div>
            );
        }

        // Render structured data
        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <span className="text-4xl">{icon}</span>
                    <div>
                        <h3 className={`text-2xl font-bold ${accent}`}>
                            {content.title || 'Sample Input & Output'}
                        </h3>
                        {content.description && (
                            <p className="text-gray-600 mt-1">{content.description}</p>
                        )}
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    {content.input && (
                        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📥</span>
                                    <h4 className="text-xl font-bold text-white">Input Data</h4>
                                </div>
                                {content.input.format && (
                                    <p className="text-blue-100 text-sm mt-1">{String(content.input.format)}</p>
                                )}
                            </div>
                            <div className="p-6">
                                {content.input.table && Array.isArray(content.input.table) && content.input.table.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    {Object.keys(content.input.table[0] || {}).map((key: string, idx: number) => (
                                                        <th key={idx} className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                            {String(key)}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {content.input.table.map((row: any, idx: number) => (
                                                    <tr key={idx} className="hover:bg-blue-50 transition">
                                                        {Object.values(row).map((value: any, vidx: number) => (
                                                            <td key={vidx} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                                {typeof value === 'number' ? value.toLocaleString() : String(value || '')}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto text-sm font-mono text-gray-800">
                                        {JSON.stringify(content.input, null, 2)}
                                    </pre>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Output Section */}
                    {content.output && (
                        <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📤</span>
                                    <h4 className="text-xl font-bold text-white">Output/Predictions</h4>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Parameters */}
                                {content.output.parameters && typeof content.output.parameters === 'object' && (
                                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                        <h5 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                                            <span>⚙️</span>
                                            Learned Parameters
                                        </h5>
                                        <div className="space-y-2">
                                            {Object.entries(content.output.parameters).map(([key, value]: [string, any], idx: number) => (
                                                <div key={idx} className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-700">{String(key)}:</span>
                                                    <span className="text-sm font-mono bg-white px-3 py-1 rounded border border-purple-200">
                                                        {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Predictions Table */}
                                {content.output.predictions && Array.isArray(content.output.predictions) && content.output.predictions.length > 0 && (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    {Object.keys(content.output.predictions[0] || {}).map((key: string, idx: number) => (
                                                        <th key={idx} className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                                                            {String(key)}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {content.output.predictions.map((row: any, idx: number) => (
                                                    <tr key={idx} className="hover:bg-green-50 transition">
                                                        {Object.values(row).map((value: any, vidx: number) => (
                                                            <td key={vidx} className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                                {typeof value === 'number' ?
                                                                    (value < 1 && value > 0 ? value.toFixed(2) : value.toLocaleString())
                                                                    : String(value || '')}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Metrics */}
                                {content.output.metrics && typeof content.output.metrics === 'object' && (
                                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                                        <h5 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                                            <span>📊</span>
                                            Performance Metrics
                                        </h5>
                                        <div className="grid grid-cols-2 gap-3">
                                            {Object.entries(content.output.metrics).map(([key, value]: [string, any], idx: number) => (
                                                <div key={idx} className="bg-white rounded p-3 border border-amber-200">
                                                    <div className="text-xs text-gray-600 mb-1">{String(key)}</div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {typeof value === 'number' ?
                                                            (value < 1 && value > 0 ? value.toFixed(4) : value.toLocaleString())
                                                            : String(value)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Visualization Note */}
                {content.visualization && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">📈</span>
                            <div>
                                <h5 className="font-bold text-indigo-900 mb-2">Visualization</h5>
                                <p className="text-indigo-800">{String(content.visualization)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">💡</span>
                            <h5 className="font-bold text-blue-900">Tip</h5>
                        </div>
                        <p className="text-sm text-blue-800">
                            Study the input format carefully to understand the data structure
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🎯</span>
                            <h5 className="font-bold text-green-900">Practice</h5>
                        </div>
                        <p className="text-sm text-green-800">
                            Try modifying the input values to see how the output changes
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🔬</span>
                            <h5 className="font-bold text-purple-900">Experiment</h5>
                        </div>
                        <p className="text-sm text-purple-800">
                            Use the playground below to test with your own data
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        // If anything fails, return a safe fallback
        console.error('EnhancedSampleIO error:', error);
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{icon || '📊'}</span>
                    <h3 className={`text-xl font-bold ${accent || 'text-gray-900'}`}>Sample Input & Output</h3>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                    <p className="text-gray-600 mb-4">Sample data is available but could not be displayed in enhanced format.</p>
                    <details>
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
                            View raw data
                        </summary>
                        <pre className="mt-4 bg-gray-50 p-4 rounded text-xs overflow-auto max-h-96 border border-gray-200">
                            {JSON.stringify(content, null, 2)}
                        </pre>
                    </details>
                </div>
            </div>
        );
    }
};

export default EnhancedSampleIO;
