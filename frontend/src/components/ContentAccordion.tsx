/**
 * ContentAccordion Component
 * Displays algorithm content in expandable accordion sections
 * Each section corresponds to a learning module (Introduction, Math, Implementation, etc.)
 */

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
        <div className=\"space-y-3\">
    {
        sections.map((section) => (
            <div
                n key={section.id}
                className=\"border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow\"
                >
                {/* Accordion Header */ }
        < button
            onClick = {() => toggleSection(section.id)}
className =\"w-full px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-150 flex items-center justify-between transition-colors\"
    >
    <div className=\"flex items-center gap-3 text-left\">
        < span className =\"text-2xl\">{section.icon}</span>
            < h3 className =\"font-semibold text-slate-900\">{section.title}</h3>\n            </div>
                < ChevronDown
size = { 20}
className = {`text-slate-600 transition-transform ${\n                expandedId === section.id ? 'rotate-180' : ''\n              }`}
            />
          </button>

          {/* Accordion Content */}
          {expandedId === section.id && (
            <div className=\"px-6 py-4 bg-white border-t border-slate-200 animate-in fade-in duration-200\">
              {section.content}
            </div>\n          )}
        </div>
      ))}
    </div>
  );
};

export default ContentAccordion;
