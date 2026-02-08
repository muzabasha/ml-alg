import React from 'react';
import Link from 'next/link';
import { BookOpen, User, ArrowRight, Brain, Calculator, LineChart, Cpu } from 'lucide-react';

const algorithms = [
  { id: 'linear_regression', name: 'Linear Regression', category: 'Regression', icon: LineChart },
  { id: 'logistic_regression', name: 'Logistic Regression', category: 'Classification', icon: Brain },
  { id: 'knn', name: 'K-Nearest Neighbors', category: 'Classification', icon: Cpu },
  { id: 'decision_tree', name: 'Decision Trees', category: 'Classification', icon: Calculator },
  { id: 'svm', name: 'Support Vector Machines', category: 'Classification', icon: Brain },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ML Learning Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/instructor" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>Instructor Profile</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Master Machine Learning Algorithms
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Interactive, step-by-step guides to the most important algorithms in data science.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {algorithms.map((algo) => (
            <Link 
              key={algo.id} 
              href={`/algorithm/${algo.id}`}
              className="group bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <algo.icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                  {algo.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{algo.name}</h3>
              <p className="text-gray-500 text-sm mb-6">
                Learn the theory, math, and implementation of {algo.name} with interactive examples.
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Start Learning</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 bg-blue-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Meet Your Instructor</h2>
              <p className="text-blue-100 text-lg max-w-lg">
                Dr. Syed Muzamil Basha provides expert guidance through complex ML concepts with real-world analogies.
              </p>
            </div>
            <Link 
              href="/instructor"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              View Profile
            </Link>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-48 h-48 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
        </div>
      </main>

      <footer className="bg-white border-t mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 ML Learning Platform. Created for Engineering Education.</p>
        </div>
      </footer>
    </div>
  );
}
