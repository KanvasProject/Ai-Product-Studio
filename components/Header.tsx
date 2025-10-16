
import React from 'react';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
    theme: Theme;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-900 dark:text-white">
                        <path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 5L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M17 17L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M17 7L19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M5 19L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                 </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">AI Product Studio</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Buat foto produk profesional.</p>
                </div>
            </div>
            <button onClick={toggleTheme} type="button" className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none rounded-lg text-sm p-2.5">
                <svg className={`${theme === 'light' ? 'hidden' : ''} w-5 h-5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                <svg className={`${theme === 'dark' ? 'hidden' : ''} w-5 h-5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-.707 10.607a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM17 17a1 1 0 01-1.414 0l-.707-.707a1 1 0 111.414-1.414l.707.707A1 1 0 0117 17zM3 11a1 1 0 100 2h1a1 1 0 100-2H3z" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </button>
        </div>
    );
};