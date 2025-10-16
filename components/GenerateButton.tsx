
import React from 'react';
import { Spinner } from './Spinner';

interface GenerateButtonProps {
    onGenerate: () => void;
    isGenerating: boolean;
    isDisabled: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onGenerate, isGenerating, isDisabled }) => {
    return (
        <button
            onClick={onGenerate}
            disabled={isDisabled || isGenerating}
            className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-lg"
        >
            {isGenerating && <Spinner />}
            <span>{isGenerating ? 'Generating...' : 'Generate Gambar'}</span>
        </button>
    );
};