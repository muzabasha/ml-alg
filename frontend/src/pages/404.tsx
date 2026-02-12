import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">
                    404
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Page Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                    The page you are looking for does not exist or has been moved.
                </p>
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Go to Homepage
                    </Link>
                    <Link
                        href="/instructor"
                        className="block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
                    >
                        View Instructor Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Custom404;
