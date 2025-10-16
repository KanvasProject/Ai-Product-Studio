
import React, { useEffect } from 'react';

interface ImageModalProps {
    src: string;
    title: string;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, title, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
    return (
        <div 
            id="imageModal" 
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 opacity-100"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-4xl max-h-[90vh] w-full h-auto overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                    <button onClick={onClose} className="text-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">&times;</button>
                </div>
                <div className="p-4 flex-grow flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                    <img src={src} alt={title} className="max-w-full max-h-[75vh] object-contain" />
                </div>
            </div>
        </div>
    );
};