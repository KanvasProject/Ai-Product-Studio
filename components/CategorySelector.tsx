
import React from 'react';
import { Category } from '../types';

interface CategorySelectorProps {
    selectedCategory: Category;
    onSelectCategory: (category: Category) => void;
}

const categories: { id: Category; name: string; }[] = [
    { id: 'fashion', name: 'Fashion' },
    { id: 'beauty', name: 'Kecantikan' },
    { id: 'furniture', name: 'Perabotan' },
    { id: 'accessories', name: 'Aksesoris' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'food', name: 'Makanan' },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map(({ id, name }) => (
                <button
                    key={id}
                    onClick={() => onSelectCategory(id)}
                    className={`option-btn w-full text-center p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer transition-colors text-sm font-medium text-slate-700 dark:text-slate-300 ${selectedCategory === id ? 'active' : ''}`}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};