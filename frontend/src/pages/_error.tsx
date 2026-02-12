import React from 'react';
import Link from 'next/link';
import { NextPageContext } from 'next';

interface ErrorProps {
    statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">
                    {statusCode || '???'}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {statusCode === 404
                        ? 'Page Not Found'
                        : statusCode === 500
                            ? 'Server Error'
                            : 'An Error Occurred'}
                </h1>
                <p className="text-gray-600 mb-6">
                    {statusCode === 404
                        ? 'The page you are looking for does not exist.'
                        : 'Something went wrong. Please try again later.'}
                </p>
                <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
