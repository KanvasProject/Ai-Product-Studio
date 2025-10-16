
import React, { useState, useRef } from 'react';

interface ImageUploaderSlotProps {
    onFileChange: (file: File) => void;
    placeholderText: string;
    subPlaceholderText: string;
}

export const ImageUploaderSlot: React.FC<ImageUploaderSlotProps> = ({ onFileChange, placeholderText, subPlaceholderText }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onFileChange(file);
        }
    };
    
    return (
        <div className="image-uploader relative w-full h-48 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex items-center justify-center">
            <div className={`upload-placeholder text-center text-slate-500 dark:text-slate-400 p-4 cursor-pointer ${preview ? 'hidden' : ''}`} onClick={() => fileInputRef.current?.click()}>
                <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14.5L12 5.5M12 5.5L8.5 9M12 5.5L15.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M20 16.5C20 18.7091 18.2091 20.5 16 20.5H8C5.79086 20.5 4 18.7091 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>

                <span className="mt-2 block text-sm font-medium">{placeholderText}</span>
                <p className="text-xs">{subPlaceholderText}</p>
            </div>
            {preview && <img src={preview} alt="Pratinjau" className="image-preview w-full h-full object-cover rounded-lg" />}
            <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer" 
            />
        </div>
    );
};