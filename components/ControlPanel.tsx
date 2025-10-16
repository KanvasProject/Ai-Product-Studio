
import React, { useState } from 'react';
import { Product, Category, AspectRatio, AiSuggestions } from '../types';
import { allConcepts } from '../constants';
import { ProductUploader } from './ProductUploader';
import { RatioSelector } from './RatioSelector';
import { ConceptSelector } from './ConceptSelector';
import { LogoUploader } from './LogoUploader';
import { FashionOptions } from './FashionOptions';
import { GenerateButton } from './GenerateButton';
import { CategorySelector } from './CategorySelector';
import { AssistantModal } from './AssistantModal';

interface ControlPanelProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    backProductImage: string | null;
    setBackProductImage: React.Dispatch<React.SetStateAction<string | null>>;
    selectedCategory: Category;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
    selectedRatio: AspectRatio;
    setSelectedRatio: React.Dispatch<React.SetStateAction<AspectRatio>>;
    selectedConceptIds: string[];
    setSelectedConceptIds: React.Dispatch<React.SetStateAction<string[]>>;
    isCustomConcept: boolean;
    setIsCustomConcept: React.Dispatch<React.SetStateAction<boolean>>;
    customConceptPrompt: string;
    setCustomConceptPrompt: React.Dispatch<React.SetStateAction<string>>;
    setLogoImage: React.Dispatch<React.SetStateAction<string | null>>;
    logoPrompt: string;
    setLogoPrompt: React.Dispatch<React.SetStateAction<string>>;
    modelGender: 'man' | 'woman';
    setModelGender: React.Dispatch<React.SetStateAction<'man' | 'woman'>>;
    hijabOption: 'hijab' | 'non-hijab';
    setHijabOption: React.Dispatch<React.SetStateAction<'hijab' | 'non-hijab'>>;
    modelStyle: 'random' | 'reference';
    setModelStyle: React.Dispatch<React.SetStateAction<'random' | 'reference'>>;
    setFaceImage: React.Dispatch<React.SetStateAction<string | null>>;
    backgroundStyle: 'default' | 'custom';
    setBackgroundStyle: React.Dispatch<React.SetStateAction<'default' | 'custom'>>;
    customBackgroundType: 'text' | 'image';
    setCustomBackgroundType: React.Dispatch<React.SetStateAction<'text' | 'image'>>;
    backgroundPrompt: string;
    setBackgroundPrompt: React.Dispatch<React.SetStateAction<string>>;
    setBackgroundImage: React.Dispatch<React.SetStateAction<string | null>>;
    onGenerate: () => void;
    isGenerating: boolean;
    isGenerateDisabled: boolean;
    onGetSuggestions: () => void;
    isAssistantLoading: boolean;
    isAssistantModalOpen: boolean;
    closeAssistantModal: () => void;
    assistantSuggestions: AiSuggestions | null;
    onApplyDescription: (description: string) => void;
    onApplyConcept: (concept: string) => void;
}

const AccordionSection: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void; }> = ({ title, children, isOpen, onToggle }) => (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
        <h3>
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between p-4 font-bold text-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <svg className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
        </h3>
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <div className="p-4 pt-0">
                    {children}
                </div>
            </div>
        </div>
    </div>
);


export const ControlPanel: React.FC<ControlPanelProps> = (props) => {
    const [openSections, setOpenSections] = useState<string[]>(['product']);

    const handleToggleSection = (sectionId: string) => {
        setOpenSections(prev => 
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const showModelOptions = props.selectedConceptIds.some(id => {
        const conceptsForCategory = allConcepts[props.selectedCategory];
        const concept = conceptsForCategory.find(c => c.id === id);
        return concept?.requiresModelOptions;
    });
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow space-y-0 border border-slate-200 dark:border-slate-800 rounded-xl">
                 <AccordionSection 
                    title="1. Produk"
                    isOpen={openSections.includes('product')}
                    onToggle={() => handleToggleSection('product')}
                 >
                    <ProductUploader
                        products={props.products}
                        setProducts={props.setProducts}
                        selectedCategory={props.selectedCategory}
                        setBackProductImage={props.setBackProductImage}
                        onGetSuggestions={props.onGetSuggestions}
                        isAssistantLoading={props.isAssistantLoading}
                    />
                 </AccordionSection>

                 <AccordionSection 
                    title="2. Skenario"
                    isOpen={openSections.includes('scene')}
                    onToggle={() => handleToggleSection('scene')}
                 >
                    <div className="space-y-6">
                        <div className="space-y-3">
                             <h4 className="text-base font-medium text-slate-600 dark:text-slate-400">Pengaturan Dasar</h4>
                             <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg space-y-4 border border-slate-200 dark:border-slate-800">
                                <div className="space-y-2">
                                     <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Kategori</h5>
                                     <CategorySelector selectedCategory={props.selectedCategory} onSelectCategory={props.setSelectedCategory} />
                                </div>
                                <div className="space-y-2">
                                     <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Rasio</h5>
                                    <RatioSelector selectedRatio={props.selectedRatio} onSelectRatio={props.setSelectedRatio} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                             <h4 className="text-base font-medium text-slate-600 dark:text-slate-400">Pilih Konsep</h4>
                            <ConceptSelector
                                concepts={allConcepts[props.selectedCategory]}
                                selectedIds={props.selectedConceptIds}
                                setSelectedIds={props.setSelectedConceptIds}
                                isCustom={props.isCustomConcept}
                                setIsCustom={props.setIsCustomConcept}
                                customPrompt={props.customConceptPrompt}
                                setCustomPrompt={props.setCustomConceptPrompt}
                            />
                        </div>
                         {showModelOptions && (
                            <div className="space-y-3">
                                 <h4 className="text-base font-medium text-slate-600 dark:text-slate-400">Opsi Kustom Model</h4>
                                <FashionOptions
                                    modelGender={props.modelGender}
                                    setModelGender={props.setModelGender}
                                    hijabOption={props.hijabOption}
                                    setHijabOption={props.setHijabOption}
                                    modelStyle={props.modelStyle}
                                    setModelStyle={props.setModelStyle}
                                    onFaceUpload={props.setFaceImage}
                                    backgroundStyle={props.backgroundStyle}
                                    setBackgroundStyle={props.setBackgroundStyle}
                                    customBackgroundType={props.customBackgroundType}
                                    setCustomBackgroundType={props.setCustomBackgroundType}
                                    backgroundPrompt={props.backgroundPrompt}
                                    setBackgroundPrompt={props.setBackgroundPrompt}
                                    onBackgroundUpload={props.setBackgroundImage}
                                />
                            </div>
                        )}
                    </div>
                 </AccordionSection>

                 <AccordionSection 
                    title="3. Branding"
                    isOpen={openSections.includes('branding')}
                    onToggle={() => handleToggleSection('branding')}
                 >
                    <div className="space-y-2">
                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-50">Tambah Logo 3D (Opsional)</h4>
                        <LogoUploader
                            onLogoUpload={props.setLogoImage}
                            logoPrompt={props.logoPrompt}
                            onLogoPromptChange={props.setLogoPrompt}
                        />
                    </div>
                 </AccordionSection>
            </div>

            <div className="pt-6 sticky bottom-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
                 <GenerateButton onGenerate={props.onGenerate} isGenerating={props.isGenerating} isDisabled={props.isGenerateDisabled} />
                <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                    ©2025 | Dibuat Dengan ❤️ Oleh Rohmat Hadi Wijaya
                </div>
            </div>

            <AssistantModal 
                isOpen={props.isAssistantModalOpen}
                onClose={props.closeAssistantModal}
                isLoading={props.isAssistantLoading}
                suggestions={props.assistantSuggestions}
                onApplyDescription={props.onApplyDescription}
                onApplyConcept={props.onApplyConcept}
            />
        </div>
    );
};