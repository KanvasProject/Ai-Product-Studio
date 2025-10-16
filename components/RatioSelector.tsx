
import React from 'react';
import { AspectRatio } from '../types';

interface RatioSelectorProps {
    selectedRatio: AspectRatio;
    onSelectRatio: (ratio: AspectRatio) => void;
}

// FIX: Replaced JSX.Element with React.ReactElement to fix "Cannot find namespace 'JSX'" error.
const ratios: { ratio: AspectRatio; icon: React.ReactElement }[] = [
    { ratio: '1:1', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { ratio: '4:5', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { ratio: '16:9', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { ratio: '9:16', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

export const RatioSelector: React.FC<RatioSelectorProps> = ({ selectedRatio, onSelectRatio }) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            {ratios.map(({ ratio, icon }) => (
                <button
                    key={ratio}
                    onClick={() => onSelectRatio(ratio)}
                    className={`option-btn flex flex-col items-center justify-center p-2 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors text-slate-500 ${selectedRatio === ratio ? 'active' : ''}`}
                >
                    {icon}
                    <span className="text-xs mt-1.5">{ratio}</span>
                </button>
            ))}
        </div>
    );
};