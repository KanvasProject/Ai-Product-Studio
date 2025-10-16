
import React from 'react';
import { Step } from './Step';

interface DescriptionCardProps {
    description: string;
}

export const DescriptionCard: React.FC<DescriptionCardProps> = ({ description }) => {
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(description).then(() => {
            alert('Teks disalin ke clipboard!');
        }).catch(err => {
            console.error('Gagal menyalin teks: ', err);
        });
    };
    
    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <div className="step-badge">A</div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Deskripsi TikTok</h2>
            </div>
            <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-6 rounded-lg space-y-4">
                <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap bg-slate-100 dark:bg-slate-900 p-4 rounded-lg max-h-48 overflow-y-auto">
                    {description}
                </div>
                <button onClick={copyToClipboard} disabled={!description || description.startsWith("Gagal")} className="w-full border border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all disabled:border-slate-300 disabled:text-slate-400 dark:disabled:border-slate-700 dark:disabled:text-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.042m0 0c0 .675-.447 1.226-1.008 1.352M11.25 6.75H6.75a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25H11.25z" /></svg>
                    <span>Salin Teks</span>
                </button>
            </div>
        </div>
    );
};