import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionSection {
    id: string;
    title: string;
    icon: string;
    content: React.ReactNode;
    isDefault?: boolean;
}

interface ContentAccordionProps {
    sections: AccordionSection[];
}

export const ContentAccordion: React.FC<ContentAccordionProps> = ({ sections }) => {
    const [expandedId, setExpandedId] = useState<string | null>(
        sections.find(s => s.isDefault)?.id || sections[0]?.id || null
    );

    const toggleSection = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-4">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all divide-y divide-slate-100"
                >
                    <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group"
                    >
                        <div className="flex items-center space-x-4 text-slate-900 font-semibold text-lg">
                            <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                {section.icon}
                            </span>
                            <span>{section.title}</span>
                        </div>
                        <ChevronDown
                            className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${expandedId === section.id ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {expandedId === section.id && (
                        <div className="px-6 py-8">
                            <div className="prose prose-slate max-w-none">
                                {section.content}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ContentAccordion;
