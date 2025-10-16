
import React, { useCallback } from 'react';
import { Product, Category } from '../types';
import { fileToBase64 } from '../services/utils';
import { ImageUploaderSlot } from './ImageUploaderSlot';
import { Spinner } from './Spinner';

interface ProductUploaderProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    selectedCategory: Category;
    setBackProductImage: React.Dispatch<React.SetStateAction<string | null>>;
    onGetSuggestions: () => void;
    isAssistantLoading: boolean;
}

export const ProductUploader: React.FC<ProductUploaderProps> = ({ products, setProducts, selectedCategory, setBackProductImage, onGetSuggestions, isAssistantLoading }) => {

    const addProductSlot = useCallback(() => {
        setProducts(prev => [...prev, { id: `product-${Date.now()}`, image: null, description: '' }]);
    }, [setProducts]);

    const removeProductSlot = useCallback((id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    }, [setProducts]);

    const handleFileChange = useCallback(async (id: string, file: File) => {
        const base64 = await fileToBase64(file);
        setProducts(prev => prev.map(p => p.id === id ? { ...p, image: base64 } : p));
    }, [setProducts]);
    
    const handleBackFileChange = useCallback(async (file: File) => {
        const base64 = await fileToBase64(file);
        setBackProductImage(base64);
    }, [setBackProductImage]);

    const handleDescriptionChange = useCallback((id: string, description: string) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, description } : p));
    }, [setProducts]);
    
    const primaryProduct = products[0] || { image: null, description: ''};
    const isSuggestionDisabled = !primaryProduct.image || !primaryProduct.description.trim() || isAssistantLoading;

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {products.map((product, index) => (
                    <div key={product.id} className="relative bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                        <div className="space-y-3">
                            <ImageUploaderSlot 
                                onFileChange={(file) => handleFileChange(product.id, file)}
                                placeholderText={index === 0 ? 'Unggah Produk Utama (Depan)' : `Unggah Produk Tambahan ${index + 1}`}
                                subPlaceholderText="PNG, JPG, WEBP"
                            />
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis Produk</label>
                                <textarea 
                                    rows={2}
                                    value={product.description}
                                    onChange={(e) => handleDescriptionChange(product.id, e.target.value)}
                                    className="w-full text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Contoh: Kemeja flanel lengan panjang"
                                />
                            </div>
                             {index === 0 && (
                                <button
                                    onClick={onGetSuggestions}
                                    disabled={isSuggestionDisabled}
                                    className="w-full text-sm text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isAssistantLoading ? <Spinner /> : '✨'}
                                    <span>{isAssistantLoading ? 'Mencari ide...' : 'Dapatkan Saran AI'}</span>
                                </button>
                            )}
                        </div>
                        {index > 0 && (
                            <button 
                                onClick={() => removeProductSlot(product.id)}
                                className="absolute top-2 right-2 bg-white/50 dark:bg-slate-800/50 text-slate-500 hover:text-red-500 dark:hover:text-red-500 rounded-full w-7 h-7 flex items-center justify-center transition-colors z-10 border border-slate-200 dark:border-slate-700 hover:border-red-500"
                                aria-label="Remove product"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>
            
            {selectedCategory === 'fashion' && (
                <div className="space-y-4 pt-2">
                     <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                        <ImageUploaderSlot
                            onFileChange={handleBackFileChange}
                            placeholderText="Unggah Bagian Belakang (Opsional)"
                            subPlaceholderText="PNG, JPG, WEBP"
                        />
                     </div>
                </div>
            )}
            
            <button onClick={addProductSlot} className="w-full mt-2 text-blue-600 dark:text-blue-500 font-semibold py-2 px-4 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                <span>Tambah Produk Lain</span>
            </button>
        </div>
    );
};