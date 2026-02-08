import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function Custom404() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full">
                <div className="mb-8 flex justify-center">
                    <div className="p-4 bg-red-50 rounded-full">
                        <AlertCircle className="h-16 w-16 text-red-500" />
                    </div>
                </div>
                <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">Page Not Found</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-200"
                >
                    <Home className="h-5 w-5" />
                    <span>Go back home</span>
                </Link>
            </div>
        </div>
    );
}
