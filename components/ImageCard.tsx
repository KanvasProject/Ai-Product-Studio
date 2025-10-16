
import React from 'react';
import { GeneratedImage } from '../types';
import { PageSpinner, Spinner } from './Spinner';

interface ImageCardProps {
    image: GeneratedImage;
    aspectRatioClass: string;
    onViewClick: () => void;
    onGenerateVideo: () => void;
    onRegenerate: () => void;
    isVideoGenerating: boolean;
}

const ActionButton: React.FC<{ onClick?: () => void; href?: string; download?: boolean; children: React.ReactNode; isDisabled?: boolean; }> = ({ onClick, href, download, children, isDisabled = false }) => {
    const commonClasses = "action-btn bg-white/80 text-slate-900 dark:bg-black/80 dark:text-white p-2 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    if (href) {
        return <a href={href} download={download} className={commonClasses}>{children}</a>;
    }
    return <button onClick={onClick} className={commonClasses} disabled={isDisabled}>{children}</button>;
};

export const ImageCard: React.FC<ImageCardProps> = ({ image, aspectRatioClass, onViewClick, onGenerateVideo, onRegenerate, isVideoGenerating }) => {
    return (
        <div className={`card-container relative rounded-lg overflow-hidden ${aspectRatioClass} bg-slate-200 dark:bg-slate-800`}>
            {image.isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center"><PageSpinner /></div>
            ) : image.url ? (
                <>
                    <img src={image.url} className="w-full h-full object-cover" alt={`Generated image for ${image.angleName}`} />
                     {isVideoGenerating && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs font-semibold z-10">
                           <Spinner/>
                           <span className="mt-2">Membuat Video...</span>
                        </div>
                    )}
                    <div className="card-overlay absolute inset-0 flex items-end justify-between p-3">
                        <h4 className="text-xs text-white bg-black/50 px-2 py-1 rounded-full">{image.angleName}</h4>
                        <div className="flex items-center gap-2">
                            <ActionButton onClick={onViewClick}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                            </ActionButton>
                            <ActionButton href={image.url} download>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            </ActionButton>
                            <ActionButton onClick={onRegenerate}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.695v-2.695A8.25 8.25 0 005.681 5.681L2.5 2.5m19 19l-3.181-3.183m0 0A8.25 8.25 0 005.681 5.681L2.5 2.5" /></svg>
                            </ActionButton>
                            <ActionButton onClick={onGenerateVideo} isDisabled={isVideoGenerating}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.357-.466.557-.327l5.603 3.112z" /></svg>
                            </ActionButton>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-2 absolute inset-0 flex items-center justify-center"><p className="text-xs text-red-600 p-1">Gagal memuat</p></div>
            )}
        </div>
    );
};