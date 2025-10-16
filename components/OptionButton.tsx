
import React from 'react';

interface OptionButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`option-btn w-full text-center p-3 border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer transition-colors text-slate-700 dark:text-slate-300 ${isActive ? 'active' : ''}`}
        >
            {label}
        </button>
    );
};