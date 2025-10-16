
import React from 'react';

export const Spinner: React.FC = () => {
    return <div className="spinner"></div>;
};

export const PageSpinner: React.FC = () => {
    return <div className="page-spinner"><div className="spinner"></div></div>
}