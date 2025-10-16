
import React from 'react';

interface StepProps {
    badge: number | string;
    title: string;
    children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ badge, title, children }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="step-badge">{badge}</div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{title}</h2>
            </div>
            {children}
        </div>
    );
};