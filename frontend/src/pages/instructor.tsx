import React from 'react';
import InstructorProfile from '../components/InstructorProfile';

const InstructorPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <InstructorProfile />
            </div>
        </div>
    );
};

export default InstructorPage;
