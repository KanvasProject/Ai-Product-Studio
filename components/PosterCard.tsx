
import React from 'react';
import { Concept, GeneratedImage } from '../types';
import { ImageCard } from './ImageCard';

interface PosterCardProps {
    concept: Concept;
    image: GeneratedImage;
    onRegenerate: (image: GeneratedImage) => void;
}

export const PosterCard: React.FC<PosterCardProps> = ({ concept, image, onRegenerate }) => {
    return (
        <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{concept.title}</h3>
            <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-6 rounded-lg space-y-4">
                <div className="relative aspect-[9/16] sm:aspect-video w-full max-w-lg mx-auto rounded-lg overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
                    <img src={image.url!} alt={concept.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="w-full h-full border-2 border-dashed border-white/50 rounded-md flex flex-col items-center justify-center text-center text-white">
                           <svg className="w-10 h-10 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                           <p className="font-semibold mt-2 opacity-80">Area untuk Teks Poster</p>
                           <p className="text-xs opacity-60 mt-1">Gunakan editor gambar favorit Anda untuk menambahkan teks di sini.</p>
                        </div>
                    </div>
                </div>
                 <div className="flex justify-center gap-4 mt-4">
                    <a href={image.url!} download={`${concept.title.replace(/\s+/g, '-')}-background.png`} className="w-full sm:w-auto text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                         <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                        Unduh Latar
                    </a>
                    <button onClick={() => onRegenerate(image)} className="w-full sm:w-auto border border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.695v-2.695A8.25 8.25 0 005.681 5.681L2.5 2.5m19 19l-3.181-3.183m0 0A8.25 8.25 0 005.681 5.681L2.5 2.5" /></svg>
                        Generate Ulang
                    </button>
                 </div>
            </div>
        </div>
    );
};