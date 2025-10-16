
// Fix: Create content for ResultsPanel.tsx to resolve import error in App.tsx.
import React, { useState } from 'react';
import { GeneratedResult, AspectRatio, GeneratedImage } from '../types';
import { WelcomeScreen } from './WelcomeScreen';
import { ImageCard } from './ImageCard';
import { PageSpinner } from './Spinner';
import { DescriptionCard } from './DescriptionCard';
import { NarrationCard } from './NarrationCard';
import { ImageModal } from './ImageModal';
import { PosterCard } from './PosterCard';
import { VideoModal } from './VideoModal';


interface ResultsPanelProps {
    results: GeneratedResult[];
    selectedRatio: AspectRatio;
    isLoading: boolean;
    tiktokDescription: string;
    narrationScript: string;
    onNarrationScriptChange: (script: string) => void;
    onGenerateAudio: () => void;
    isGeneratingAudio: boolean;
    audioUrl: string | null;
    narrationVoice: 'Puck' | 'Leda';
    setNarrationVoice: (voice: 'Puck' | 'Leda') => void;
    onRegenerate: (image: GeneratedImage) => void;
    onGenerateVideo: (image: GeneratedImage) => void;
    generatingVideoId: string | null;
    isVideoModalOpen: boolean;
    videoModalUrl: string | null;
    closeVideoModal: () => void;
}

const SkeletonCard: React.FC<{ aspectRatioClass: string }> = ({ aspectRatioClass }) => (
    <div className={`skeleton w-full ${aspectRatioClass}`}></div>
);

const ResultsSkeleton: React.FC<{ selectedRatio: AspectRatio, gridColsClass: string, aspectRatioClass: string }> = ({ selectedRatio, gridColsClass, aspectRatioClass }) => (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
        <div>
            <div className="h-8 w-1/2 mb-4 skeleton"></div>
            <div className={`grid ${gridColsClass} gap-4`}>
                {[...Array(4)].map((_, i) => <SkeletonCard key={i} aspectRatioClass={aspectRatioClass} />)}
            </div>
        </div>
         <div>
            <div className="h-8 w-1/3 mb-4 skeleton"></div>
            <div className={`grid ${gridColsClass} gap-4`}>
                {[...Array(4)].map((_, i) => <SkeletonCard key={i+4} aspectRatioClass={aspectRatioClass} />)}
            </div>
        </div>
    </div>
);


export const ResultsPanel: React.FC<ResultsPanelProps> = (props) => {
    const [modalImage, setModalImage] = useState<GeneratedImage | null>(null);

    const handleViewClick = (image: GeneratedImage) => {
        setModalImage(image);
    };
    
    const closeModal = () => {
        setModalImage(null);
    };

    const aspectRatioClasses: Record<AspectRatio, string> = {
        '1:1': 'aspect-square',
        '4:5': 'aspect-[4/5]',
        '16:9': 'aspect-video',
        '9:16': 'aspect-[9/16]',
    };
    const gridColsClass = props.selectedRatio === '9:16' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

    if (props.isLoading) {
        return (
            <ResultsSkeleton 
                selectedRatio={props.selectedRatio} 
                gridColsClass={gridColsClass}
                aspectRatioClass={aspectRatioClasses[props.selectedRatio]}
            />
        );
    }
    
    if (props.results.length === 0) {
        return (
             <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 gap-6">
                <WelcomeScreen />
            </div>
        );
    }
    
    // Poster editor logic
    const isPosterResult = props.results.length === 1 && props.results[0].concept.isPoster;
    const posterImage = isPosterResult ? props.results[0].images.find(img => img.url) : null;


    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
            {isPosterResult ? (
                posterImage ? (
                    <PosterCard 
                        concept={props.results[0].concept}
                        image={posterImage}
                        onRegenerate={() => props.onRegenerate(posterImage)}
                    />
                ) : (
                    <div className="h-96 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-lg">
                        {props.results[0].images.some(i => i.isLoading) ? <PageSpinner /> : <p className="text-red-500">Gagal membuat latar poster.</p>}
                    </div>
                )
            ) : (
                props.results.map(result => (
                    <div key={result.concept.id}>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{result.concept.title}</h3>
                        <div className={`grid ${gridColsClass} gap-4`}>
                            {result.images.map(image => (
                                <ImageCard
                                    key={image.id}
                                    image={image}
                                    aspectRatioClass={aspectRatioClasses[props.selectedRatio]}
                                    onViewClick={() => handleViewClick(image)}
                                    onGenerateVideo={() => props.onGenerateVideo(image)}
                                    onRegenerate={() => props.onRegenerate(image)}
                                    isVideoGenerating={props.generatingVideoId === image.id}
                                />
                            ))}
                        </div>
                    </div>
                ))
            )}
            
            {(props.tiktokDescription || props.narrationScript) && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {props.tiktokDescription && <DescriptionCard description={props.tiktokDescription} />}
                    {props.narrationScript && <NarrationCard 
                        script={props.narrationScript}
                        onScriptChange={props.onNarrationScriptChange}
                        onGenerateAudio={props.onGenerateAudio}
                        isGeneratingAudio={props.isGeneratingAudio}
                        audioUrl={props.audioUrl}
                        voice={props.narrationVoice}
                        setVoice={props.setNarrationVoice}
                    />}
                </div>
            )}

            {modalImage && modalImage.url && (
                <ImageModal 
                    src={modalImage.url}
                    title={modalImage.angleName}
                    onClose={closeModal}
                />
            )}

            <VideoModal 
                isOpen={props.isVideoModalOpen}
                onClose={props.closeVideoModal}
                videoUrl={props.videoModalUrl}
            />
        </div>
    );
};