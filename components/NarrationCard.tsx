
import React from 'react';
import { Step } from './Step';
import { OptionButton } from './OptionButton';
import { Spinner } from './Spinner';

interface NarrationCardProps {
    script: string;
    onScriptChange: (script: string) => void;
    onGenerateAudio: () => void;
    isGeneratingAudio: boolean;
    audioUrl: string | null;
    voice: 'Puck' | 'Leda';
    setVoice: (voice: 'Puck' | 'Leda') => void;
}

export const NarrationCard: React.FC<NarrationCardProps> = (props) => {
    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <div className="step-badge">B</div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Narasi Singkat (VO)</h2>
            </div>
            <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-6 rounded-lg space-y-4">
                <textarea 
                    value={props.script}
                    onChange={(e) => props.onScriptChange(e.target.value)}
                    className="w-full text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 p-4 rounded-lg h-36 resize-none" 
                    placeholder="Script narasi akan muncul di sini..."
                />
                <div className="grid grid-cols-2 gap-3">
                    <OptionButton label="Suara Pria" isActive={props.voice === 'Puck'} onClick={() => props.setVoice('Puck')} />
                    <OptionButton label="Suara Wanita" isActive={props.voice === 'Leda'} onClick={() => props.setVoice('Leda')} />
                </div>
                <button onClick={props.onGenerateAudio} disabled={props.isGeneratingAudio || !props.script || props.script.startsWith("Gagal")} className="w-full border border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all disabled:border-slate-300 disabled:text-slate-400 dark:disabled:border-slate-700 dark:disabled:text-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {props.isGeneratingAudio ? <Spinner /> : <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>}
                    <span>{props.isGeneratingAudio ? 'Generating...' : 'Generate Suara'}</span>
                </button>
                {props.audioUrl && (
                    <div className="space-y-3">
                        <audio src={props.audioUrl} controls className="w-full"></audio>
                        <a href={props.audioUrl} download="narasi-produk.wav" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                           <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                           <span>Unduh Suara</span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};