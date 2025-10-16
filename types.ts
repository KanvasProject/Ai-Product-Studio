
// Fix: Create content for types.ts to resolve import errors across the application.
export type Category = 'fashion' | 'beauty' | 'furniture' | 'accessories' | 'gaming' | 'food';

export type AspectRatio = '1:1' | '4:5' | '16:9' | '9:16';

export interface Product {
    id: string;
    image: string | null; // base64 string
    description: string;
}

export interface Angle {
    name: string;
    modifier: string;
    isBackView?: boolean;
}

export interface Concept {
    id: string;
    title: string;
    basePrompt: string;
    basePromptForBack?: string;
    basePromptWithFace?: string;
    basePromptForBackWithFace?: string;
    basePromptWithCustomBg?: string;
    basePromptForBackWithCustomBg?: string;
    basePromptWithFaceAndCustomBg?: string;
    basePromptForBackWithFaceAndCustomBg?: string;
    angles: Angle[];
    requiresModelOptions?: boolean;
    isPoster?: boolean;
}

export interface GeneratedImage {
    id: string;
    conceptId: string;
    angleName: string;
    url: string | null;
    isLoading: boolean;
    prompt: string;
    imageRef: 'front' | 'back';
    usesFace: boolean;
    usesBackground: boolean;
    usesLogo: boolean;
    isBackView?: boolean;
}

export interface GeneratedResult {
    concept: Concept;
    images: GeneratedImage[];
}

export interface AiSuggestions {
    descriptions: string[];
    concepts: string[];
    keywords: string[];
}