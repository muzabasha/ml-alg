import React from 'react';

interface EnhancedSampleIOProps {
    content: any;
    icon: string;
    accent: string;
}

const EnhancedSampleIO: React.FC<EnhancedSampleIOProps> = ({ content, icon, accent }) => {
    // Safety check
    if (!content) {
        return (
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <p className="text-yellow-800">No sample data available.</p>
            </div>
        );
    }

    try {
        // Check if content is structured JSON with input/output
        const hasStructuredData = content && typeof content === 'object' && (content.input || content.output);

        if (hasStructuredData) {
            const inputData = content.input || {};
            const outputData = content.output || {};
            const inputTable = inputData.table || [];
            const outputPredictions = outputData.predictions || [];
            const outputParameters = outputData.parameters || {};
            const outputMetrics = outputData.metrics || {};

            return (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
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

                    {/* Two-column layout for input/output */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Input Section */}
                        {content.input && (
                            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">📥</span>
                                        <h4 className="text-xl font-bold text-white">Input Data</h4>
                                    </div>
                                    {inputData.format && (
                                        <p className="text-blue-100 text-sm mt-1">{inputData.format}</p>
                                    )}
                                </div>
                                <div className="p-6">
                                    {inputTable.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        {Object.keys(inputTable[0]).map((key, idx) => (
                                                            <th key={idx} className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                                {key}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {inputTable.map((row: any, idx: number) => (
                                                        <tr key={idx} className="hover:bg-blue-50 transition">
                                                            {Object.values(row).map((value: any, vidx: number) => (
                                                                <td key={vidx} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                                    {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto text-sm font-mono text-gray-800">
                                            {JSON.stringify(inputData, null, 2)}
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
                                    {Object.keys(outputParameters).length > 0 && (
                                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                            <h5 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                                                <span>⚙️</span>
                                                Learned Parameters
                                            </h5>
                                            <div className="space-y-2">
                                                {Object.entries(outputParameters).map(([key, value]: [string, any], idx) => (
                                                    <div key={idx} className="flex justify-between items-center">
                                                        <span className="text-sm font-medium text-gray-700">{key}:</span>
                                                        <span className="text-sm font-mono bg-white px-3 py-1 rounded border border-purple-200">
                                                            {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Predictions Table */}
                                    {outputPredictions.length > 0 && (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        {Object.keys(outputPredictions[0]).map((key, idx) => (
                                                            <th key={idx} className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                                                                {key}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {outputPredictions.map((row: any, idx: number) => (
                                                        <tr key={idx} className="hover:bg-green-50 transition">
                                                            {Object.values(row).map((value: any, vidx: number) => (
                                                                <td key={vidx} className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                                                    {typeof value === 'number' ?
                                                                        (value < 1 && value > 0 ? value.toFixed(2) : value.toLocaleString())
                                                                        : String(value)}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {/* Metrics */}
                                    {Object.keys(outputMetrics).length > 0 && (
                                        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                                            <h5 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                                                <span>📊</span>
                                                Performance Metrics
                                            </h5>
                                            <div className="grid grid-cols-2 gap-3">
                                                {Object.entries(outputMetrics).map(([key, value]: [string, any], idx) => (
                                                    <div key={idx} className="bg-white rounded p-3 border border-amber-200">
                                                        <div className="text-xs text-gray-600 mb-1">{key}</div>
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
                                    <p className="text-indigo-800">{content.visualization}</p>
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
        }

        // Fallback for string content
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{icon}</span>
                    <h3 className={`text-2xl font-bold ${accent}`}>
                        Sample Input & Output
                    </h3>
                </div>
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
                    <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {String(content)}
                    </pre>
                </div>
            </div>
        );
    } catch (error) {
        // Error fallback
        console.error('EnhancedSampleIO Error:', error);
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{icon}</span>
                    <h3 className={`text-2xl font-bold ${accent}`}>
                        Sample Input & Output
                    </h3>
                </div>
                <div className="bg-red-50 rounded-xl shadow-lg border-2 border-red-200 p-6">
                    <p className="text-red-800 mb-4">
                        Unable to display sample data in enhanced format.
                    </p>
                    <details className="mt-4">
                        <summary className="cursor-pointer text-red-900 font-semibold">Show raw data</summary>
                        <pre className="mt-4 bg-white p-4 rounded text-sm overflow-auto max-h-96">
                            {JSON.stringify(content, null, 2)}
                        </pre>
                    </details>
                </div>
            </div>
        );
    }
};

export default EnhancedSampleIO;
