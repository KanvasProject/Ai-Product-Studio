
import React from 'react';
import { Concept } from '../types';

interface ConceptSelectorProps {
    concepts: Concept[];
    selectedIds: string[];
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
    isCustom: boolean;
    setIsCustom: React.Dispatch<React.SetStateAction<boolean>>;
    customPrompt: string;
    setCustomPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, checked, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only concept-checkbox" />
            <div className={`w-full text-left p-3 border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer transition-colors text-slate-700 dark:text-slate-300 flex items-center gap-3`}>
                <div className={`flex-shrink-0 w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500' : ''}`}>
                    <svg className={`w-3 h-3 text-white ${checked ? '' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>
                </div>
                <span>{label}</span>
            </div>
        </label>
    );
}

export const ConceptSelector: React.FC<ConceptSelectorProps> = ({ concepts, selectedIds, setSelectedIds, isCustom, setIsCustom, customPrompt, setCustomPrompt }) => {

    const handleConceptChange = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-2">
            {concepts.map(concept => (
                <Checkbox
                    key={concept.id}
                    label={concept.title}
                    checked={selectedIds.includes(concept.id)}
                    onChange={() => handleConceptChange(concept.id)}
                />
            ))}
            <div className="space-y-2">
                <Checkbox
                    label="Buat Konsep Sendiri"
                    checked={isCustom}
                    onChange={(e) => setIsCustom(e.target.checked)}
                />
                {isCustom && (
                    <div className="pl-4 pt-2">
                        <textarea
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tulis deskripsi konsep Anda di sini..."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};