import React from 'react';
import Link from 'next/link';

const Custom500: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl font-bold text-red-600 mb-4">
                    500
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Server Error
                </h1>
                <p className="text-gray-600 mb-6">
                    Something went wrong on our end. Please try again later.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Custom500;
