
import React from 'react';

// FIX: Replaced JSX.Element with React.ReactElement to fix "Cannot find namespace 'JSX'" error.
const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactElement }> = ({ title, description, icon }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-900/50">
        <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    </div>
);

export const WelcomeScreen: React.FC = () => {
    const features = [
        {
            title: "Logo 3D di Latar",
            description: "Integrasikan logo brand Anda sebagai elemen 3D yang menyatu dengan latar belakang.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        },
        {
            title: "Buat Konsep Sendiri",
            description: "Deskripsikan konsep foto impian Anda secara bebas menggunakan teks.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.5 18.75l1.188-.648a2.25 2.25 0 011.423-1.423L17.25 15l.648 1.188a2.25 2.25 0 011.423 1.423L20.25 18.75l-1.188.648a2.25 2.25 0 01-1.423 1.423z" /></svg>
        },
        {
            title: "Model Kustom (Fashion)",
            description: "Gunakan model acak (Pria/Wanita/Hijab) atau unggah wajah referensi.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        },
        {
            title: "Latar Kustom",
            description: "Tentukan latar dengan deskripsi teks atau gambar referensi.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>
        },
        {
            title: "Prompt Gerakan Video",
            description: "Dapatkan prompt Image-to-Video untuk setiap gambar yang dihasilkan.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3.75v3.75m3.75-3.75v3.75m-7.5-3.75L3 16.5m18 0l-3.75 3.75M3 16.5V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v10.5m-18 0h18M12 12h.008v.008H12V12zm0-3.75h.008v.008H12V8.25zm0 7.5h.008v.008H12v-.008zm-3.75 0h.008v.008H8.25v-.008zm0-3.75h.008v.008H8.25v-.008zm0-3.75h.008v.008H8.25V8.25zm7.5 0h.008v.008h-.008V8.25zm0 3.75h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008z" /></svg>
        },
        {
            title: "Narasi & Audio Otomatis",
            description: "Buat deskripsi teks dan narasi suara (VO) yang siap diunduh.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
        }
    ];

    return (
        <div className="col-span-full text-center text-slate-500 dark:text-slate-400 p-8 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Selamat Datang di AI Product Studio</h2>
            <p className="mt-2 max-w-2xl mx-auto">Alat lengkap untuk mengubah foto produk Anda menjadi aset konten profesional siap pakai.</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
            </div>
        </div>
    );
};