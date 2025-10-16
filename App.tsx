
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { Theme, useTheme } from './hooks/useTheme';
import { Product, Category, AspectRatio, GeneratedResult, Concept, GeneratedImage, AiSuggestions } from './types';
import { allConcepts, ratioPrompts, qualityPrompt, femaleNonHijabProfiles, femaleHijabProfiles, maleCharacterProfiles } from './constants';
import { generateImage, generateText, generateAudio, getAiSuggestions, generateVideo, pollVideoStatus } from './services/geminiService';
import { pcmToWav, base64ToArrayBuffer } from './services/utils';

const App: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    // State for all user inputs
    const [products, setProducts] = useState<Product[]>([]);
    const [backProductImage, setBackProductImage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category>('fashion');
    const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1');
    const [selectedConceptIds, setSelectedConceptIds] = useState<string[]>(['concept-1']);
    const [isCustomConcept, setIsCustomConcept] = useState(false);
    const [customConceptPrompt, setCustomConceptPrompt] = useState('');
    const [logoImage, setLogoImage] = useState<string | null>(null);
    const [logoPrompt, setLogoPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    
    // State for fashion-specific options
    const [modelGender, setModelGender] = useState<'man' | 'woman'>('woman');
    const [hijabOption, setHijabOption] = useState<'hijab' | 'non-hijab'>('non-hijab');
    const [modelStyle, setModelStyle] = useState<'random' | 'reference'>('random');
    const [faceImage, setFaceImage] = useState<string | null>(null);
    const [backgroundStyle, setBackgroundStyle] = useState<'default' | 'custom'>('default');
    const [customBackgroundType, setCustomBackgroundType] = useState<'text' | 'image'>('text');
    const [backgroundPrompt, setBackgroundPrompt] = useState('');
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    
    // State for generated results
    const [results, setResults] = useState<GeneratedResult[]>([]);
    const [tiktokDescription, setTiktokDescription] = useState('');
    const [narrationScript, setNarrationScript] = useState('');
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [narrationVoice, setNarrationVoice] = useState<'Puck'|'Leda'>('Leda');

    // State for AI Assistant
    const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
    const [isAssistantLoading, setIsAssistantLoading] = useState(false);
    const [assistantSuggestions, setAssistantSuggestions] = useState<AiSuggestions | null>(null);

    // State for Video Generation
    const [generatingVideoId, setGeneratingVideoId] = useState<string | null>(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);


    useEffect(() => {
        setProducts([{ id: `product-${Date.now()}`, image: null, description: '' }]);
    }, []);
    
    useEffect(() => {
        const defaultConcepts = {
            fashion: ['concept-1'],
            beauty: ['beauty-1'],
            furniture: ['furniture-1'],
            accessories: ['acc-1'],
            gaming: ['gaming-1'],
            food: ['food-1'],
        };
        setSelectedConceptIds(defaultConcepts[selectedCategory]);
    }, [selectedCategory]);

    const handleGenerate = async () => {
        const primaryProduct = products[0];
        if (!primaryProduct || !primaryProduct.image) {
            alert('Silakan unggah gambar produk utama terlebih dahulu.');
            return;
        }
        if (!primaryProduct.description.trim()) {
            alert('Silakan isi jenis produk utama terlebih dahulu.');
            return;
        }

        setIsGenerating(true);
        setTiktokDescription('');
        setNarrationScript('');
        setAudioUrl(null);

        const conceptsToRender: Concept[] = allConcepts[selectedCategory].filter(c => selectedConceptIds.includes(c.id));
        if (isCustomConcept) {
            if (!customConceptPrompt.trim()) {
                alert('Silakan tulis deskripsi untuk konsep kustom Anda.');
                setIsGenerating(false);
                return;
            }
            conceptsToRender.push({
                title: "Konsep Kustom",
                id: "custom-concept",
                basePrompt: `${qualityPrompt} image of [product_description], based on this description: "${customConceptPrompt}"`,
                angles: [
                    { name: "Tampilan Penuh", modifier: "Capture a full shot based on the prompt." },
                    { name: "Tampilan Sudut", modifier: "Capture the scene from a 45-degree angle for depth." },
                    { name: "Tampilan Detail", modifier: "Focus on a key detail within the described scene." },
                    { name: "Tampilan Alternatif", modifier: "Capture an alternative composition or a different moment." }
                ]
            });
        }
        
        if (conceptsToRender.length === 0) {
            alert('Silakan pilih minimal satu konsep untuk digenerate.');
            setIsGenerating(false);
            return;
        }
        
        const isModelConceptSelected = conceptsToRender.some(c => c.requiresModelOptions);
        let finalFaceData: string | null = null;
        let characterProfile = '';
        let finalBackgroundData: string | null = null;
        let customBgPrompt = '';

        if (isModelConceptSelected) {
            if (modelStyle === 'reference') {
                if (!faceImage) { alert('Silakan unggah foto wajah referensi.'); setIsGenerating(false); return; }
                finalFaceData = faceImage;
            } else {
                if (modelGender === 'woman') {
                    characterProfile = (hijabOption === 'hijab') 
                        ? femaleHijabProfiles[Math.floor(Math.random() * femaleHijabProfiles.length)] 
                        : femaleNonHijabProfiles[Math.floor(Math.random() * femaleNonHijabProfiles.length)];
                } else {
                    characterProfile = maleCharacterProfiles[Math.floor(Math.random() * maleCharacterProfiles.length)];
                }
            }

            if (backgroundStyle === 'custom') {
                if (customBackgroundType === 'text') {
                    if (!backgroundPrompt) { alert('Silakan isi deskripsi latar.'); setIsGenerating(false); return; }
                    customBgPrompt = backgroundPrompt;
                } else { // image
                    if (!backgroundImage) { alert('Silakan unggah gambar referensi latar.'); setIsGenerating(false); return; }
                    finalBackgroundData = backgroundImage;
                    customBgPrompt = `a setting that is visually inspired by the third uploaded image (the background reference). Prioritize matching the style, lighting, and elements from the reference image.`;
                }
            }
        }
        
        const logoPromptAddition = logoImage
            ? `If a logo is also uploaded, integrate it as a 3D element **only within the background** of the scene, based on the following instruction: "${logoPrompt || 'place it naturally'}". **Crucially, the logo must not appear on the main product itself or on the model.** The integration should feel natural to the environment.`
            : "";

        const initialResults: GeneratedResult[] = conceptsToRender.map(concept => ({
            concept,
            images: concept.angles.map((angle, index) => ({
                id: `${concept.id}-angle-${index}`,
                conceptId: concept.id,
                angleName: angle.name,
                url: null,
                isLoading: true,
                prompt: '',
                imageRef: 'front',
                usesFace: false,
                usesBackground: false,
                usesLogo: false,
                isBackView: !!angle.isBackView,
            }))
        }));
        setResults(initialResults);

        let assetsGenerated = false;
        
        for (const res of initialResults) {
            for (const image of res.images) {
                const isCurrentConceptModel = !!res.concept.requiresModelOptions;
                const isBackView = !!image.isBackView && !!backProductImage;
                
                let imageForApi = isBackView ? backProductImage : primaryProduct.image;
                if (!imageForApi) continue;

                const useFace = finalFaceData && isCurrentConceptModel;
                const useBackground = finalBackgroundData && isCurrentConceptModel;
                
                let finalBasePrompt = res.concept.basePrompt;
                if (isCurrentConceptModel) {
                    if (useFace && customBgPrompt) finalBasePrompt = isBackView ? res.concept.basePromptForBackWithFaceAndCustomBg! : res.concept.basePromptWithFaceAndCustomBg!;
                    else if (useFace) finalBasePrompt = isBackView ? res.concept.basePromptForBackWithFace! : res.concept.basePromptWithFace!;
                    else if (customBgPrompt) finalBasePrompt = isBackView ? res.concept.basePromptForBackWithCustomBg! : res.concept.basePromptWithCustomBg!;
                    else finalBasePrompt = isBackView ? res.concept.basePromptForBack! : res.concept.basePrompt;
                } else {
                    finalBasePrompt = isBackView ? (res.concept.basePromptForBack || res.concept.basePrompt) : res.concept.basePrompt;
                }

                if (customBgPrompt && finalBasePrompt) finalBasePrompt = finalBasePrompt.replace('[custom_background]', customBgPrompt);
                if(finalBasePrompt) finalBasePrompt = finalBasePrompt.replace('[character_description]', characterProfile);
                if(finalBasePrompt) finalBasePrompt = finalBasePrompt.replace(/\[product_description\]/g, primaryProduct.description.trim());
                
                const fullPrompt = `${finalBasePrompt} Shot details: ${res.concept.angles.find(a => a.name === image.angleName)?.modifier}. ${ratioPrompts[selectedRatio]}. ${logoPromptAddition}`;
                
                // Update image state with prompt info for regeneration
                image.prompt = fullPrompt;
                image.imageRef = isBackView ? 'back' : 'front';
                image.usesFace = !!useFace;
                image.usesBackground = !!useBackground;
                image.usesLogo = !!logoImage;


                generateImage(fullPrompt, imageForApi, useFace ? finalFaceData : null, useBackground ? finalBackgroundData : null, logoImage)
                    .then(imageUrl => {
                        if (imageUrl && !assetsGenerated) {
                            assetsGenerated = true;
                            generateMarketingAssets(primaryProduct.image!);
                        }
                        
                        setResults(prevResults => prevResults.map(prevRes => 
                            prevRes.concept.id === res.concept.id
                            ? {
                                ...prevRes,
                                images: prevRes.images.map(prevImg => 
                                    prevImg.id === image.id
                                    ? { ...prevImg, url: imageUrl, isLoading: false }
                                    : prevImg
                                )
                            }
                            : prevRes
                        ));
                    });
            }
        }
    };
    
    const handleRegenerate = async (image: GeneratedImage) => {
        setResults(prevResults => prevResults.map(prevRes =>
            prevRes.concept.id === image.conceptId
                ? {
                    ...prevRes,
                    images: prevRes.images.map(prevImg =>
                        prevImg.id === image.id
                            ? { ...prevImg, isLoading: true, url: null }
                            : prevImg
                    )
                }
                : prevRes
        ));

        const imageForApi = image.imageRef === 'back' ? backProductImage : products[0]?.image;
        if (!imageForApi) {
            alert('Gambar referensi tidak ditemukan.');
            return;
        }

        const imageUrl = await generateImage(
            image.prompt,
            imageForApi,
            image.usesFace ? faceImage : null,
            image.usesBackground ? backgroundImage : null,
            image.usesLogo ? logoImage : null,
        );
        
        setResults(prevResults => prevResults.map(prevRes =>
            prevRes.concept.id === image.conceptId
                ? {
                    ...prevRes,
                    images: prevRes.images.map(prevImg =>
                        prevImg.id === image.id
                            ? { ...prevImg, url: imageUrl, isLoading: false }
                            : prevImg
                    )
                }
                : prevRes
        ));
    };

    const generateMarketingAssets = async (productImage: string) => {
        const descPrompt = "Act as a TikTok affiliate marketing expert. Based on the uploaded image of the product, write a short, catchy, and persuasive caption for a TikTok video. Use trendy Indonesian language, relevant emojis, and include a strong call-to-action like 'Cek keranjang kuning!'. Also, add popular relevant hashtags like #racuntiktok, #tiktokaffiliate, and #ootd.";
        const narrativePrompt = `Act as a high-energy Indonesian content creator. Based on the uploaded product image, write a very short and punchy voice-over script. It must be readable in **under 20 seconds**. Start with a quick hook, highlight one key feature of the product (e.g., 'warnanya cakep banget', 'bahannya premium'), and immediately end with a strong call to action like 'Gas, langsung checkout di keranjang kuning!'. The tone should be fast-paced and perfect for a quick TikTok video.`;

        const [description, narration] = await Promise.all([
            generateText(descPrompt, productImage),
            generateText(narrativePrompt, productImage)
        ]);
        
        setTiktokDescription(description || "Gagal membuat deskripsi.");
        setNarrationScript(narration || "Gagal membuat narasi.");
        if (!description || !narration) setIsGenerating(false); // Stop main spinner if sub-tasks fail
        else setIsGenerating(false);
    };

    const handleGenerateAudio = async () => {
        if (!narrationScript || narrationScript.startsWith("Gagal")) return;
        setIsGeneratingAudio(true);
        setAudioUrl(null);
        
        const ttsResponse = await generateAudio(narrationScript, narrationVoice);
        if (ttsResponse && ttsResponse.audioData) {
            const sampleRateMatch = ttsResponse.mimeType.match(/rate=(\d+)/);
            const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;
            const pcmBuffer = base64ToArrayBuffer(ttsResponse.audioData);
            const pcm16 = new Int16Array(pcmBuffer);
            const wavBlob = pcmToWav(pcm16, sampleRate);
            const url = URL.createObjectURL(wavBlob);
            setAudioUrl(url);
        } else {
            alert("Gagal membuat suara. Coba lagi.");
        }
        setIsGeneratingAudio(false);
    };

    const handleGetSuggestions = async () => {
        const primaryProduct = products[0];
        if (!primaryProduct.image || !primaryProduct.description) return;
        
        setIsAssistantLoading(true);
        setIsAssistantModalOpen(true);
        setAssistantSuggestions(null);

        const suggestions = await getAiSuggestions(primaryProduct.image, primaryProduct.description);
        setAssistantSuggestions(suggestions);
        setIsAssistantLoading(false);
    };

    const handleApplyDescription = (description: string) => {
        setProducts(prev => {
            const newProducts = [...prev];
            newProducts[0].description = description;
            return newProducts;
        });
        setIsAssistantModalOpen(false);
    };
    
    const handleApplyConcept = (concept: string) => {
        setCustomConceptPrompt(prev => `${prev ? prev + '\n' : ''}- ${concept}`);
        if (!isCustomConcept) setIsCustomConcept(true);
        setIsAssistantModalOpen(false);
    };

    const handleGenerateVideo = async (image: GeneratedImage) => {
        if (!image.url) return;
        setGeneratingVideoId(image.id);

        const motionPromptGen = `Act as a creative director specializing in short-form video content for fashion. Based on the uploaded image, write a concise motion prompt for an image-to-video AI generator. The prompt should describe a subtle, continuous 5-8 second motion.
- If the image contains a person, describe a natural modeling pose or movement. For example: 'The model slowly turns their head to the side with a gentle smile, causing the fabric of the shirt to catch the light.'
- If the image is a product-only shot (like a flat lay or on a hanger), describe a subtle camera movement or environmental effect. For example: 'A gentle dolly zoom-in on the t-shirt, while a soft shadow of leaves slowly drifts across it.'
The output should be the prompt text ONLY, without any introductory phrases.`;
        
        const base64Image = image.url.split(',')[1];
        const motionPrompt = await generateText(motionPromptGen, base64Image);

        if (!motionPrompt) {
            alert("Gagal membuat prompt gerakan. Coba lagi.");
            setGeneratingVideoId(null);
            return;
        }
        
        const operation = await generateVideo(base64Image, motionPrompt, selectedRatio);
        if (!operation) {
            alert("Gagal memulai generasi video. Coba lagi.");
            setGeneratingVideoId(null);
            return;
        }

        const videoUri = await pollVideoStatus(operation);
        if (videoUri) {
            try {
                // FIX: Use URL API to safely append the API key
                const urlWithKey = new URL(videoUri);
                urlWithKey.searchParams.append('key', process.env.API_KEY!);
                
                const response = await fetch(urlWithKey.toString());
                if (!response.ok) throw new Error(`Failed to fetch video: ${response.statusText}`);
                const videoBlob = await response.blob();
                const url = URL.createObjectURL(videoBlob);
                setVideoModalUrl(url);
                setIsVideoModalOpen(true);
            } catch (error) {
                console.error("Error fetching video blob:", error);
                alert("Berhasil membuat video, namun gagal mengambilnya. Silakan periksa konsol.");
            }
        } else {
            alert("Gagal menyelesaikan generasi video.");
        }
        setGeneratingVideoId(null);
    };


    const isGenerateButtonDisabled = () => {
        if(isGenerating) return true;
        const primaryProduct = products[0];
        if (!primaryProduct || !primaryProduct.image || !primaryProduct.description.trim()) {
            return true;
        }
        return false;
    }

    return (
        <div className="flex flex-col lg:flex-row">
            <aside className="w-full lg:w-[28rem] flex-shrink-0 bg-white dark:bg-slate-950/50 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
                <div className="control-panel p-6">
                    <div className="space-y-8">
                        <Header theme={theme} toggleTheme={toggleTheme} />
                        <ControlPanel
                            products={products}
                            setProducts={setProducts}
                            backProductImage={backProductImage}
                            setBackProductImage={setBackProductImage}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedRatio={selectedRatio}
                            setSelectedRatio={setSelectedRatio}
                            selectedConceptIds={selectedConceptIds}
                            setSelectedConceptIds={setSelectedConceptIds}
                            isCustomConcept={isCustomConcept}
                            setIsCustomConcept={setIsCustomConcept}
                            customConceptPrompt={customConceptPrompt}
                            setCustomConceptPrompt={setCustomConceptPrompt}
                            setLogoImage={setLogoImage}
                            logoPrompt={logoPrompt}
                            setLogoPrompt={setLogoPrompt}
                            modelGender={modelGender}
                            setModelGender={setModelGender}
                            hijabOption={hijabOption}
                            setHijabOption={setHijabOption}
                            modelStyle={modelStyle}
                            setModelStyle={setModelStyle}
                            setFaceImage={setFaceImage}
                            backgroundStyle={backgroundStyle}
                            setBackgroundStyle={setBackgroundStyle}
                            customBackgroundType={customBackgroundType}
                            setCustomBackgroundType={setCustomBackgroundType}
                            backgroundPrompt={backgroundPrompt}
                            setBackgroundPrompt={setBackgroundPrompt}
                            setBackgroundImage={setBackgroundImage}
                            onGenerate={handleGenerate}
                            isGenerating={isGenerating}
                            isGenerateDisabled={isGenerateButtonDisabled()}
                            onGetSuggestions={handleGetSuggestions}
                            isAssistantLoading={isAssistantLoading}
                            isAssistantModalOpen={isAssistantModalOpen}
                            closeAssistantModal={() => setIsAssistantModalOpen(false)}
                            assistantSuggestions={assistantSuggestions}
                            onApplyDescription={handleApplyDescription}
                            onApplyConcept={handleApplyConcept}
                        />
                    </div>
                </div>
            </aside>
            <main className="flex-1 results-panel bg-slate-100/50 dark:bg-slate-900">
                <ResultsPanel
                    results={results}
                    selectedRatio={selectedRatio}
                    isLoading={isGenerating && results.length === 0}
                    tiktokDescription={tiktokDescription}
                    narrationScript={narrationScript}
                    onNarrationScriptChange={setNarrationScript}
                    onGenerateAudio={handleGenerateAudio}
                    isGeneratingAudio={isGeneratingAudio}
                    audioUrl={audioUrl}
                    narrationVoice={narrationVoice}
                    setNarrationVoice={setNarrationVoice}
                    onRegenerate={handleRegenerate}
                    onGenerateVideo={handleGenerateVideo}
                    generatingVideoId={generatingVideoId}
                    isVideoModalOpen={isVideoModalOpen}
                    videoModalUrl={videoModalUrl}
                    closeVideoModal={() => { setIsVideoModalOpen(false); setVideoModalUrl(null); }}
                />
            </main>
        </div>
    );
};

export default App;