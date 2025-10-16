
import { Concept, Category, AspectRatio } from './types';

export const qualityPrompt = "ultra-realistic, photorealistic, 8K resolution, high-detail, sharp focus, professional photograph of";

export const ratioPrompts: Record<AspectRatio, string> = {
    '1:1': 'The image should be a square photograph (1:1 aspect ratio).',
    '4:5': 'The image should be a vertical portrait photograph (4:5 aspect ratio).',
    '16:9': 'The image should be a horizontal landscape photograph (16:9 aspect ratio).',
    '9:16': 'The image should be a tall, vertical portrait photograph, perfect for stories (9:16 aspect ratio).'
};

export const femaleNonHijabProfiles: string[] = [
    "a friendly Indonesian woman in her early 20s with long dark hair, warm brown eyes, and a sweet smile",
    "a stylish Indonesian woman in her mid-20s with shoulder-length black hair, expressive eyes, and a confident look",
    "a graceful young Indonesian woman with her hair in a neat bun, glowing tan skin, and a serene expression"
];

export const femaleHijabProfiles: string[] = [
    "a cheerful Indonesian woman in her early 20s wearing a stylish, simple pastel-colored hijab, with bright eyes and a friendly smile",
    "an elegant Indonesian woman in her mid-20s wearing a neatly wrapped, neutral-toned hijab that complements her outfit, looking confident",
    "a fashionable young Indonesian woman wearing a modern, draped hijab, with glowing skin and a gentle expression"
];

export const maleCharacterProfiles: string[] = [
    "a handsome Indonesian man in his mid-20s with short, clean-cut black hair and a friendly demeanor",
    "a cool young Indonesian man in his early 20s with slightly wavy dark hair, a casual style, and a confident smile",
    "a charming Indonesian man with neat side-parted hair, a slight stubble, and a warm, engaging look"
];

const createHeldByModelConcept = (id: string): Concept => ({
    id,
    title: "Digenggam oleh Model",
    requiresModelOptions: true,
    basePrompt: `A high-quality, ${qualityPrompt} [character_description], holding the [product_description] in their hands. The setting is a bright, minimalist studio with a neutral-colored background. The focus is on the product and how it looks when held by a person. The model's hands and arms are visible, but their face is slightly out of focus or cropped to keep the emphasis on the product. Maintain the same model and their features across all images.`,
    basePromptWithFace: `Create a high-quality, ${qualityPrompt} a model holding the [product_description]. The model's face, hair, and ethnicity MUST be identical to the person in the second uploaded image (the face reference). The setting is a bright, minimalist studio with a neutral-colored background. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt, regardless of the aspect ratios of the input reference images.**`,
    basePromptWithCustomBg: `A high-quality, ${qualityPrompt} [character_description], holding the [product_description]. The setting is [custom_background]. The model should look natural. Maintain the same model and their features across all images.`,
    basePromptWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} a model holding the [product_description]. The model's face MUST be identical to the person in the second uploaded image (the face reference). The setting is [custom_background]. **Crucially, you must maintain the exact same facial identity from the second image and the final output image MUST strictly adhere to the requested aspect ratio from the prompt, ignoring any reference image aspect ratios.**`,
    angles: [
        { name: "Close-up Tangan", modifier: "A close-up shot focusing on the model's hands elegantly holding the product." },
        { name: "Setengah Badan", modifier: "A waist-up shot of the model holding the product, showing how it relates to a person's scale." },
        { name: "Dari Atas", modifier: "A slightly high-angle shot looking down at the product in the model's hands." },
        { name: "Gaya Hidup Candid", modifier: "A candid shot where the model is interacting with the product naturally, e.g., opening it, using it, or simply presenting it." }
    ]
});


export const allConcepts: Record<Category, Concept[]> = {
    fashion: [
        { 
            id: "concept-1",
            title: "Minimalis Tropis", 
            basePrompt: `An ${qualityPrompt} [product_description], hanging on a plain white wall. The scene is illuminated by natural sunlight from a window, creating distinct, sharp shadows of tropical plant leaves on the wall and the product. Include a wooden bench and potted plants to enhance the warm, summery, minimalist aesthetic.`,
            basePromptForBack: `A ${qualityPrompt} showing the **back view** of a [product_description], hanging on a plain white wall. The product's color and fabric must be consistent with the front view. The scene is illuminated by natural sunlight from a window, creating distinct, sharp shadows of tropical plant leaves on the wall and the product. The overall aesthetic must match the front view's warm, summery, minimalist feel.`,
            angles: [
                { name: "Tampilan Depan Penuh", modifier: "Tampilan depan penuh dari produk untuk menunjukkan siluet keseluruhannya di dalam lingkungan." },
                { name: "Tampilan Depan Sudut", modifier: "Ambil gambar dari sudut 45 derajat untuk memberikan kesan kedalaman dan bentuk pada tampilan depan." },
                { name: "Tampilan Belakang Penuh", modifier: "Tampilkan bagian belakang produk, menyoroti kesesuaian dan elemen desain di bagian belakang. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Detail", modifier: "Fokus close-up pada detail bagian belakang produk, seperti jahitan atau label. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-2",
            title: "Dramatis & Berani", 
            basePrompt: `An ${qualityPrompt} [product_description], displayed on a premium hanger. The background is a solid, rich maroon color. The lighting is dramatic and focused, creating a spotlight effect that highlights the product's texture and colors. The overall feel is bold, modern, and high-fashion.`,
            basePromptForBack: `An ${qualityPrompt} showing the **back view** of a [product_description], displayed on a premium hanger. The background is a solid, rich maroon color. The lighting and overall feel should be consistent with the front view.`,
            angles: [
                { name: "Tampilan Depan Penuh", modifier: "Sebuah foto frontal yang kuat dari produk, diposisikan sempurna di tengah." },
                { name: "Tampilan Depan Sudut Rendah", modifier: "Sebuah foto dari sudut rendah, melihat ke atas pada produk untuk membuatnya tampak dominan dan heroik." },
                { name: "Tampilan Belakang Penuh", modifier: "Sebuah foto frontal yang kuat dari bagian belakang produk. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Detail Kain", modifier: "Close-up ekstrem pada kain bagian belakang, menunjukkan tenunan dan tekstur di bawah pencahayaan dramatis. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-3",
            title: "Elegan & Profesional", 
            basePrompt: `A clean, ${qualityPrompt} [product_description], displayed on a sleek black mannequin in a minimalist showroom setting. The background is a light gray textured wall. To the side, include a small white table with books and a green potted plant. The lighting is bright and even. The composition is balanced and elegant.`,
             basePromptForBack: `A clean, ${qualityPrompt} showing the **back view** of a [product_description], displayed on a sleek black mannequin in a minimalist showroom setting. The mannequin is turned to show the back. The background is a light gray textured wall with the same props. Lighting and composition should remain elegant and consistent with the front view.`,
            angles: [
                { name: "Tampilan Depan (Manekin)", modifier: "Foto penuh manekin untuk menampilkan bagaimana produk menggantung dan pas." },
                { name: "Tampilan Tiga Perempat (Manekin)", modifier: "Tampilan tiga perempat manekin untuk menunjukkan bagian depan dan samping produk secara bersamaan." },
                { name: "Tampilan Belakang (Manekin)", modifier: "Foto penuh bagian belakang manekin untuk menampilkan bagaimana produk menggantung dan pas dari belakang. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Detail", modifier: "Close-up yang berfokus pada kerah belakang, jahitan bahu, atau detail lain di bagian belakang. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-6",
            title: "Urban Streetwear", 
            basePrompt: `An ${qualityPrompt} a top-down flat lay of [product_description] on a dark, textured surface like asphalt or dark fabric. Surround the product with modern streetwear accessories like white sneakers, wireless headphones, and a metal grid. The lighting is soft and even, creating a cool, moody, urban aesthetic.`,
            angles: [
                { name: "Classic Flat Lay", modifier: "The product is laid flat and centered, with props neatly arranged at the corners." },
                { name: "Casual Look", modifier: "The product is slightly crumpled or creased naturally, as if just taken off. Props are placed casually nearby." },
                { name: "Texture Close-up", modifier: "A close-up shot focusing on the collar and a sleeve, showing the fabric's texture against the dark background." },
                { name: "Outfit Grid", modifier: "The product is laid out alongside a pair of jeans or shorts and the sneakers, creating a complete 'outfit grid' flat lay." }
            ]
        },
        {
            id: "fashion-new-boho",
            title: "Bohemian Chic",
            basePrompt: `An ${qualityPrompt} [product_description], featured in a warm, bohemian-inspired setting. The background includes natural textures like a rattan chair, a macrame wall hanging, and dried pampas grass in a vase. The scene is bathed in soft, diffused afternoon sunlight.`,
            basePromptForBack: `An ${qualityPrompt} showing the **back view** of a [product_description], in a warm, bohemian-inspired setting. The product's color and fabric must be consistent with the front view. The scene is bathed in soft, diffused afternoon sunlight.`,
            angles: [
                { name: "Tampilan Penuh Santai", modifier: "Foto penuh produk yang digantung atau diletakkan dengan santai di kursi rotan." },
                { name: "Detail Tekstur Alami", modifier: "Close-up yang menyoroti tekstur produk dengan latar belakang makrame yang sedikit kabur." },
                { name: "Tampilan Belakang Penuh", modifier: "Foto penuh bagian belakang produk, digantung dengan latar belakang pampas grass. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Sudut", modifier: "Foto sudut bagian belakang produk untuk menunjukkan detail dari sisi. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        {
            id: "fashion-new-noir",
            title: "Elegant Noir",
            basePrompt: `A high-contrast, black and white ${qualityPrompt} [product_description]. The product is displayed against a simple dark background. The lighting is dramatic and cinematic, creating deep shadows and bright highlights that emphasize the product's silhouette and texture. The mood is sophisticated and timeless.`,
            basePromptForBack: `A high-contrast, black and white ${qualityPrompt} showing the **back view** of a [product_description]. The lighting is dramatic and cinematic, consistent with the front view.`,
            angles: [
                { name: "Siluet Dramatis", modifier: "Foto yang berfokus pada siluet produk dengan pencahayaan dari samping." },
                { name: "Highlight Tekstur", modifier: "Close-up yang menggunakan cahaya tajam untuk menonjolkan setiap jahitan dan tenunan kain." },
                { name: "Tampilan Belakang Penuh", modifier: "Foto penuh bagian belakang produk dengan bayangan yang dalam. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Abstrak", modifier: "Close-up abstrak pada bagian belakang, fokus pada permainan cahaya dan bayangan. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-7",
            title: "Studio Minimalis", 
            requiresModelOptions: true,
            basePrompt: `A high-quality, ${qualityPrompt} [character_description], wearing [product_description]. The setting is a modern and minimalist indoor studio room with a wooden slat wall, a neat clothing rack in the background, and soft, natural light coming from a large window. The model should look stylish and relaxed. Maintain the same model and their features across all images.`,
            basePromptForBack: `A high-quality, ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away from the camera. The setting is the same modern minimalist indoor studio. Maintain model consistency.`,
            basePromptWithFace: `Create a high-quality, ${qualityPrompt} an Indonesian model wearing the specified fashion product, which is a [product_description]. The model's face, hair, and ethnicity MUST be identical to the person in the second uploaded image (the face reference). The setting is a modern and minimalist indoor studio room with a wooden slat wall, a neat clothing rack in the background, and soft, natural light coming from a large window. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt, regardless of the aspect ratios of the input reference images.**`,
            basePromptForBackWithFace: `Create a high-quality, ${qualityPrompt} showing the back of an Indonesian model wearing the specified fashion product [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera. The setting is a modern minimalist studio. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image, even though their face is not visible. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio.**`,
            basePromptWithCustomBg: `A high-quality, ${qualityPrompt} [character_description], wearing [product_description]. The setting is [custom_background]. The model should look stylish and relaxed. Maintain the same model and their features across all images.`,
            basePromptForBackWithCustomBg: `A high-quality, ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away from the camera. The setting is [custom_background]. Maintain model and setting consistency.`,
            basePromptWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} a model wearing the specified fashion product, which is a [product_description]. The model's face MUST be identical to the person in the second uploaded image (the face reference). The setting is [custom_background]. **Crucially, you must maintain the exact same facial identity from the second image and the final output image MUST strictly adhere to the requested aspect ratio from the prompt, ignoring any reference image aspect ratios.**`,
            basePromptForBackWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} showing the back of a model wearing the specified fashion product [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image. The setting is [custom_background]. **Crucially, the final output must adhere to the requested aspect ratio.**`,
            angles: [
                { name: "Depan - Seluruh Badan", modifier: "Foto seluruh badan model berdiri santai, menatap kamera." },
                { name: "Depan - Setengah Badan", modifier: "Potret close-up dari dada ke atas, berfokus pada detail produk di sekitar leher dan ekspresi model." },
                { name: "Belakang - Seluruh Badan", modifier: "Model berbalik dari kamera untuk menampilkan bagian belakang pakaian dengan jelas. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Belakang - Detail Punggung", modifier: "Close-up pada bagian punggung atau detail spesifik di bagian belakang produk saat dikenakan. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-5",
            title: "Dipakai Model Indonesia", 
            requiresModelOptions: true,
            basePrompt: `A high-quality, ${qualityPrompt} [character_description], wearing [product_description]. The setting is a bright, minimalist urban environment like an aesthetic cafe or a clean city street. The focus is on how the product looks when worn, its fit, and style. The model should look natural and relatable. Maintain the same model and her/his features across all images.`,
            basePromptForBack: `A high-quality, ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away or walking away from the camera. The setting is the same bright, minimalist urban environment. Maintain model consistency.`,
            basePromptWithFace: `Create a high-quality, ${qualityPrompt} an Indonesian model wearing the specified fashion product, which is a [product_description]. The model's face, hair, and ethnicity MUST be identical to the person in the second uploaded image (the face reference). The setting is a bright, minimalist urban environment like an aesthetic cafe or a clean city street. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt, regardless of the aspect ratios of the input reference images.**`,
            basePromptForBackWithFace: `Create a high-quality, ${qualityPrompt} showing the back of an Indonesian model wearing the specified fashion product [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera in a bright urban setting. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image, even though their face is not visible. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio.**`,
            basePromptWithCustomBg: `A high-quality, ${qualityPrompt} [character_description], wearing [product_description]. The setting is [custom_background]. The model should look stylish and relaxed. Maintain the same model and their features across all images.`,
            basePromptForBackWithCustomBg: `A high-quality, ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away from the camera. The setting is [custom_background]. Maintain model and setting consistency.`,
            basePromptWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} a model wearing the specified fashion product, which is a [product_description]. The model's face MUST be identical to the person in the second uploaded image (the face reference). The setting is [custom_background]. **Crucially, you must maintain the exact same facial identity from the second image and the final output image MUST strictly adhere to the requested aspect ratio from the prompt, ignoring any reference image aspect ratios.**`,
            basePromptForBackWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} showing the back of a model wearing the specified fashion product [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image. The setting is [custom_background]. **Crucially, the final output must adhere to the requested aspect ratio.**`,
            angles: [
                { name: "Depan - Seluruh Badan", modifier: "Foto seluruh badan model berjalan, menunjukkan pakaian lengkap dan bagaimana produk bergerak." },
                { name: "Depan - Candid Duduk", modifier: "Foto candid model duduk di meja kafe, menunjukkan bagaimana produk tergerai dan terlihat dalam pose santai." },
                { name: "Belakang - Seluruh Badan", modifier: "Foto seluruh badan model dari belakang, berjalan menjauh, untuk menunjukkan desain dan kesesuaian bagian belakang. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Belakang - Setengah Badan", modifier: "Potret dari pinggang ke atas dari belakang, fokus pada detail produk. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        {
            id: "concept-8",
            title: "Butik Modern",
            requiresModelOptions: true,
            basePrompt: `A high-quality, ${qualityPrompt} [character_description] standing tall in the middle of a modern boutique room with warm and elegant lighting. They are wearing [product_description], paired with complementary stylish modern attire. The background shows a minimalist clothing rack with a row of black, gray, and brown suits and jackets, neatly arranged on the wall. At the top of the rack is a black leather bag. The floor is made of light brown herringbone pattern wood, and under the model is a round, fluffy white carpet. The room's lighting is soft, natural, and gives a warm and professional impression, like the atmosphere of an exclusive boutique. Maintain the same model and their features across all images.`,
            basePromptForBack: `A high-quality, ${qualityPrompt} showing the back view of [character_description] standing tall in a modern boutique. They are wearing [product_description]. The model is turned away from the camera. The background setting is a modern boutique with minimalist clothing racks, warm and elegant lighting, and a herringbone wood floor with a white carpet. Maintain model consistency.`,
            basePromptWithFace: `Create a high-quality, ${qualityPrompt} a model wearing [product_description], paired with complementary stylish modern attire. The model's face, hair, and ethnicity MUST be identical to the person in the second uploaded image (the face reference). They are standing in a modern boutique room with warm and elegant lighting. The background features a minimalist clothing rack. The floor is herringbone wood with a white carpet. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt.**`,
            basePromptForBackWithFace: `Create a high-quality, ${qualityPrompt} showing the back of a model wearing [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera in a modern boutique setting. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio.**`,
            basePromptWithCustomBg: `A high-quality, ${qualityPrompt} [character_description] wearing [product_description], paired with complementary stylish modern attire. The setting is [custom_background]. The model should look stylish and professional. Maintain the same model and their features across all images.`,
            basePromptForBackWithCustomBg: `A high-quality, ${qualityPrompt} showing the back view of [character_description] wearing [product_description]. The model is turned away from the camera. The setting is [custom_background]. Maintain model and setting consistency.`,
            basePromptWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} a model wearing [product_description], paired with complementary stylish modern attire. The model's face MUST be identical to the person in the second uploaded image (the face reference). The setting is [custom_background]. **Crucially, you must maintain the exact same facial identity from the second image and the final output image MUST strictly adhere to the requested aspect ratio from the prompt.**`,
            basePromptForBackWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} showing the back of a model wearing [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera. The model's build, hair, and ethnicity must be consistent with the face reference. The setting is [custom_background]. **Crucially, the final output must adhere to the requested aspect ratio.**`,
            angles: [
                 { name: "Depan - Seluruh Badan", modifier: "Foto seluruh badan model berdiri dengan percaya diri, menunjukkan seluruh pakaian dari kepala hingga kaki." },
                 { name: "Depan - Setinggi Dada", modifier: "Tampilan depan setinggi dada, fokus pada subjek di tengah dengan latar belakang yang simetris dan rapi." },
                 { name: "Belakang - Seluruh Badan", modifier: "Model berbalik dari kamera untuk menampilkan bagian belakang pakaian dengan jelas. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                 { name: "Belakang - Pose Santai", modifier: "Model dalam pose santai dari belakang, mungkin sedikit bersandar, untuk memberikan nuansa yang lebih candid dari belakang. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        {
            id: "fashion-promo",
            title: "Promosi",
            basePrompt: `${qualityPrompt} a clean, eye-catching promotional shot of [product_description]. The background is a vibrant, solid color gradient that complements the product. Bright, commercial studio lighting is used to make the product look highly desirable and appealing.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is centered and looks heroic and appealing." },
                { name: "Dynamic Angle", modifier: "A slightly low-angle or tilted shot to give a dynamic feel." },
                { name: "Floating", modifier: "The product appears to be floating weightlessly against the clean background." },
                { name: "With Simple Prop", modifier: "The product is next to a single, simple geometric shape or prop that matches the color scheme." }
            ]
        },
        {
            id: "fashion-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style lifestyle shot featuring the [product_description]. The setting is atmospheric (e.g., a cozy cafe with warm lighting, a misty morning in a park, a sun-drenched urban street). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Action", modifier: "A close-up of a hand interacting with the product (e.g., picking it up, opening it)." },
                { name: "Environmental Pan", modifier: "A slow pan across the product as it sits in the beautiful environment." },
                { name: "Rack Focus", modifier: "The shot starts with the background blurred and then smoothly focuses on the product." },
                { name: "Detail in Rain/Sun", modifier: "A macro shot of the product with environmental effects like raindrops or a lens flare." }
            ]
        },
        {
            id: "fashion-poster",
            title: "Poster",
            isPoster: true,
            basePrompt: `${qualityPrompt} an artistic background image for a poster featuring the [product_description]. The product should be placed artfully on one side (e.g., the bottom-left third), leaving ample clean, beautiful, and uncluttered negative space on the rest of the image. The background should be aesthetically pleasing (like a textured wall, a minimalist landscape, or an abstract color field) but not distracting from the space reserved for text.`,
            angles: [{ name: "Poster Background", modifier: "Generate a single, high-quality background image with the product placed off-center to allow for text overlay." }],
        }
    ],
    beauty: [
        {
            id: "beauty-1",
            title: "Minimalis & Segar",
            basePrompt: `A clean, minimalist, ${qualityPrompt} the beauty product, [product_description], with dynamic water splashes surrounding it. The background is a solid soft pastel color. Lighting is bright and clean, emphasizing freshness and purity.`,
            angles: [
                { name: "Produk & Percikan", modifier: "A centered shot of the product with a dramatic, frozen-in-time water splash behind it." },
                { name: "Permukaan Basah", modifier: "The product sits on a wet, reflective surface with small water droplets on it." },
                { name: "Dari Atas", modifier: "A top-down shot of the product lying in a shallow pool of clear water." },
                { name: "Detail Tekstur", modifier: "A macro close-up shot on the product's label or nozzle, with a soft water splash in the background." }
            ]
        },
        {
            id: "beauty-2",
            title: "Botani Alami",
            basePrompt: `A vibrant, ${qualityPrompt} the beauty product, [product_description], nestled amongst lush green leaves, delicate flowers, and other natural botanical elements. The setting feels like a serene garden or a rich forest floor.`,
            angles: [
                { name: "Di Antara Dedaunan", modifier: "The product is partially hidden by large, glossy leaves, creating a sense of discovery." },
                { name: "Dengan Bunga", modifier: "The product is laid beside flowers that match its color palette or ingredients." },
                { name: "Sinar Matahari", modifier: "A shot where dappled sunlight filters through leaves onto the product." },
                { name: "Komposisi Flat Lay", modifier: "A top-down flat lay with the product at the center, surrounded by a wreath of leaves and petals." }
            ]
        },
        {
            id: "beauty-3",
            title: "Marmer Mewah",
            basePrompt: `An elegant, ${qualityPrompt} the beauty product, [product_description], placed on a luxurious white or black marble surface. Include subtle, high-end props like a silk ribbon or a small piece of gold jewelry.`,
            angles: [
                { name: "Pantulan di Marmer", modifier: "A low-angle shot that captures the product and its reflection on the polished marble." },
                { name: "Dengan Aksen Emas", modifier: "The product is placed next to a simple gold chain or leaf to add a touch of luxury." },
                { name: "Komposisi Minimalis", modifier: "The product is the sole focus, placed off-center on a large expanse of marble." },
                { name: "Bayangan Lembut", modifier: "Soft, diffused lighting creates gentle shadows, adding depth and sophistication." }
            ]
        },
        {
            id: "beauty-new-lab",
            title: "Lab Clean",
            basePrompt: `A clinical, ${qualityPrompt} the beauty product, [product_description], on a pristine white surface. The background features minimalist lab equipment like glass beakers and petri dishes, suggesting scientific precision and efficacy. The lighting is bright, sterile, and shadowless.`,
            angles: [
                { name: "Komposisi Klinis", modifier: "Produk diatur dengan rapi di samping sebuah gelas kimia berisi cairan bening." },
                { name: "Detail Produk", modifier: "Close-up pada aplikator atau tutup botol produk dengan latar belakang lab yang kabur." },
                { name: "Tetesan Serum", modifier: "Setetes produk terlihat jatuh dari pipet ke permukaan yang bersih." },
                { name: "Grup Produk", modifier: "Produk ditampilkan bersama beberapa item identik yang tersusun dalam barisan yang presisi." }
            ]
        },
        {
            id: "beauty-new-golden",
            title: "Golden Hour Glow",
            basePrompt: `A radiant, ${qualityPrompt} the beauty product, [product_description], during the golden hour. The product is bathed in warm, soft, low-angle sunlight, creating long, gentle shadows and a beautiful lens flare. The background is a dreamy, out-of-focus natural landscape or cityscape.`,
            angles: [
                { name: "Siluet Berkilau", modifier: "Foto dengan cahaya dari belakang yang membuat pinggiran produk bersinar keemasan." },
                { name: "Pantulan Hangat", modifier: "Produk diletakkan di atas permukaan yang memantulkan cahaya matahari terbenam." },
                { name: "Dengan Bayangan Panjang", modifier: "Tampilan dari atas yang menangkap bayangan panjang dan lembut dari produk." },
                { name: "Detail Bercahaya", modifier: "Close-up pada produk di mana cahaya keemasan menyoroti tekstur atau brandingnya." }
            ]
        },
        createHeldByModelConcept('beauty-held-by-model'),
        {
            id: "beauty-promo",
            title: "Promosi",
            basePrompt: `${qualityPrompt} a clean, eye-catching promotional shot of [product_description]. The background is a vibrant, solid color gradient that complements the product. Bright, commercial studio lighting is used to make the product look highly desirable and appealing.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is centered and looks heroic and appealing." },
                { name: "Dynamic Angle", modifier: "A slightly low-angle or tilted shot to give a dynamic feel." },
                { name: "Floating", modifier: "The product appears to be floating weightlessly against the clean background." },
                { name: "With Simple Prop", modifier: "The product is next to a single, simple geometric shape or prop that matches the color scheme." }
            ]
        },
        {
            id: "beauty-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style lifestyle shot featuring the [product_description]. The setting is atmospheric (e.g., a cozy cafe with warm lighting, a misty morning in a park, a sun-drenched urban street). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Action", modifier: "A close-up of a hand interacting with the product (e.g., picking it up, opening it)." },
                { name: "Environmental Pan", modifier: "A slow pan across the product as it sits in the beautiful environment." },
                { name: "Rack Focus", modifier: "The shot starts with the background blurred and then smoothly focuses on the product." },
                { name: "Detail in Rain/Sun", modifier: "A macro shot of the product with environmental effects like raindrops or a lens flare." }
            ]
        },
        {
            id: "beauty-poster",
            title: "Poster",
            isPoster: true,
            basePrompt: `${qualityPrompt} an artistic background image for a poster featuring the [product_description]. The product should be placed artfully on one side (e.g., the bottom-left third), leaving ample clean, beautiful, and uncluttered negative space on the rest of the image. The background should be aesthetically pleasing (like a textured wall, a minimalist landscape, or an abstract color field) but not distracting from the space reserved for text.`,
            angles: [{ name: "Poster Background", modifier: "Generate a single, high-quality background image with the product placed off-center to allow for text overlay." }],
        }
    ],
    furniture: [
        {
            id: "furniture-1",
            title: "Ruang Tamu Skandinavia",
            basePrompt: `A bright and airy, ${qualityPrompt} a Scandinavian-style living room featuring the furniture piece, [product_description]. The room has light wood floors, white walls, large windows with natural light, and is decorated with cozy textiles and green plants.`,
            angles: [
                { name: "Tampilan Ruangan", modifier: "A wide shot showing the furniture in the context of the entire room." },
                { name: "Sudut Pandang Rendah", modifier: "A low-angle shot focusing on the craftsmanship and legs of the furniture." },
                { name: "Detail Fungsional", modifier: "A close-up on a functional aspect, like an open drawer or the texture of the upholstery." },
                { name: "Suasana Nyaman", modifier: "A lifestyle shot with a knitted blanket draped over the furniture and a cup of tea on a nearby table." }
            ]
        },
        {
            id: "furniture-2",
            title: "Loteng Gaya Industrial",
            basePrompt: `An edgy, ${qualityPrompt} an industrial loft space featuring the furniture piece, [product_description]. The environment includes exposed brick walls, metal pipes, and large factory-style windows.`,
            angles: [
                { name: "Konteks Urban", modifier: "A shot that includes the view of a city skyline through the large windows." },
                { name: "Material Kontras", modifier: "A close-up showing the contrast between the furniture material and the raw brick wall." },
                { name: "Tampilan Depan", modifier: "A straight-on, powerful shot of the furniture piece as the central focus." },
                { name: "Cahaya Dramatis", modifier: "A shot where strong directional light from the window creates long, dramatic shadows." }
            ]
        },
        {
            id: "furniture-new-mcm",
            title: "Mid-Century Modern",
            basePrompt: `An authentic, ${qualityPrompt} a Mid-Century Modern interior featuring the furniture piece, [product_description]. The room has teak wood accents, geometric patterns on a rug, a classic sputnik chandelier, and other iconic furniture from the era. The color palette includes mustard yellow, olive green, and warm wood tones.`,
            angles: [
                { name: "Vinyet Ruangan", modifier: "Tampilan yang menunjukkan furnitur sebagai bagian dari sudut ruangan yang tertata apik." },
                { name: "Fokus pada Kaki", modifier: "Close-up pada kaki furnitur yang khas, menunjukkan desain Mid-Century yang ikonik." },
                { name: "Konteks Fungsional", modifier: "Furnitur ditampilkan dengan objek-objek era tersebut, seperti pemutar piringan hitam atau telepon putar." },
                { name: "Tampilan dari Atas", modifier: "Tampilan dari atas yang menunjukkan furnitur di atas karpet berpola geometris." }
            ]
        },
        {
            id: "furniture-new-academia",
            title: "Dark Academia",
            basePrompt: `A moody, ${qualityPrompt} a 'Dark Academia' themed room featuring the furniture piece, [product_description]. The setting is a cozy home library with dark wood paneling, shelves filled with leather-bound books, and warm, focused light from a vintage desk lamp. The atmosphere is intellectual and nostalgic.`,
            angles: [
                { name: "Di Samping Rak Buku", modifier: "Furnitur ditempatkan di samping rak buku dari lantai ke langit-langit." },
                { name: "Dengan Cahaya Lampu", modifier: "Cahaya hangat dari lampu meja menerangi sebagian dari furnitur, menciptakan bayangan yang dalam." },
                { name: "Detail Kulit/Kayu", modifier: "Close-up pada material furnitur, dengan latar belakang buku-buku yang kabur." },
                { name: "Suasana Belajar", modifier: "Sebuah buku terbuka dan secangkir kopi diletakkan di atau di dekat furnitur." }
            ]
        },
        {
            id: "furniture-promo",
            title: "Promosi",
            basePrompt: `${qualityPrompt} a clean, eye-catching promotional shot of [product_description]. The background is a vibrant, solid color gradient that complements the product. Bright, commercial studio lighting is used to make the product look highly desirable and appealing.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is centered and looks heroic and appealing." },
                { name: "Dynamic Angle", modifier: "A slightly low-angle or tilted shot to give a dynamic feel." },
                { name: "Floating", modifier: "The product appears to be floating weightlessly against the clean background." },
                { name: "With Simple Prop", modifier: "The product is next to a single, simple geometric shape or prop that matches the color scheme." }
            ]
        },
        {
            id: "furniture-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style lifestyle shot featuring the [product_description]. The setting is atmospheric (e.g., a cozy cafe with warm lighting, a misty morning in a park, a sun-drenched urban street). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Action", modifier: "A close-up of a hand interacting with the product (e.g., picking it up, opening it)." },
                { name: "Environmental Pan", modifier: "A slow pan across the product as it sits in the beautiful environment." },
                { name: "Rack Focus", modifier: "The shot starts with the background blurred and then smoothly focuses on the product." },
                { name: "Detail in Rain/Sun", modifier: "A macro shot of the product with environmental effects like raindrops or a lens flare." }
            ]
        },
        {
            id: "furniture-poster",
            title: "Poster",
            isPoster: true,
            basePrompt: `${qualityPrompt} an artistic background image for a poster featuring the [product_description]. The product should be placed artfully on one side (e.g., the bottom-left third), leaving ample clean, beautiful, and uncluttered negative space on the rest of the image. The background should be aesthetically pleasing (like a textured wall, a minimalist landscape, or an abstract color field) but not distracting from the space reserved for text.`,
            angles: [{ name: "Poster Background", modifier: "Generate a single, high-quality background image with the product placed off-center to allow for text overlay." }],
        }
    ],
    accessories: [
         {
            id: "acc-1",
            title: "Gaya Hidup (Dipakai)",
            basePrompt: `A candid, ${qualityPrompt} lifestyle shot of the accessory, [product_description], being used or worn. The model's face is out of frame or obscured to keep the focus on the product. The setting is a stylish, everyday location like a coffee shop or a city street.`,
            angles: [
                { name: "Detail Aksi", modifier: "A close-up shot of hands interacting with the accessory, e.g., opening a wallet or adjusting a watch." },
                { name: "Konteks Pakaian", modifier: "A mid-shot from the chest down, showing how the accessory complements an outfit." },
                { name: "Gerakan Halus", modifier: "A shot capturing a moment of movement, like a scarf blowing in the wind or a bag swinging." },
                { name: "Latar Belakang Kabur", modifier: "A shot with a shallow depth of field, making the accessory sharp and the background beautifully blurred." }
            ]
        },
         {
            id: "acc-2",
            title: "Flat Lay Bertekstur",
            basePrompt: `A meticulously arranged, ${qualityPrompt} top-down flat lay of the accessory, [product_description], on a textured surface like linen, wood, or stone. Include 1-2 complementary props like sunglasses, a notebook, or a plant.`,
            angles: [
                { name: "Komposisi Minimalis", modifier: "The accessory is centered with props placed neatly at the corners." },
                { name: "Sedikit Berantakan", modifier: "A 'casually' arranged flat lay, as if the items were just placed down." },
                { name: "Fokus pada Material", modifier: "A close-up within the flat lay, focusing on the texture and material of the accessory." },
                { name: "Permainan Bayangan", modifier: "Use of direct light to create interesting shadows from the accessory and props." }
            ]
        },
        {
            id: "acc-new-unboxing",
            title: "Unboxing Experience",
            basePrompt: `A luxurious, ${qualityPrompt} 'unboxing' scene featuring the accessory, [product_description]. The product is emerging from high-quality packaging, surrounded by branded tissue paper, a silk ribbon, and an elegant box. The lighting is soft and focused, creating a sense of anticipation and premium quality.`,
            angles: [
                { name: "Mengintip dari Kotak", modifier: "Aksesori hanya terlihat sebagian, masih berada di dalam kotaknya yang sedikit terbuka." },
                { name: "Di Atas Kertas Tisu", modifier: "Aksesori diletakkan dengan indah di atas kertas tisu bermerek yang sedikit kusut." },
                { name: "Lengkap dengan Kemasan", modifier: "Tampilan dari atas yang menunjukkan aksesori, kotak, dan pita dalam satu komposisi yang rapi." },
                { name: "Detail Premium", modifier: "Close-up pada detail aksesori, dengan kemasan mewah yang kabur di latar belakang." }
            ]
        },
        {
            id: "acc-new-vault",
            title: "Luxury Vault",
            basePrompt: `A sleek and secure, ${qualityPrompt} the accessory, [product_description], displayed as if in a luxury vault or on a high-tech display. The product rests on a dark, brushed metal surface or velvet padding. The background is dark and minimalist, with sharp, focused spotlighting that makes the accessory gleam.`,
            angles: [
                { name: "Sorotan Utama", modifier: "Satu sorotan cahaya tajam menerangi aksesori dari atas dengan latar belakang hitam pekat." },
                { name: "Di Atas Beludru", modifier: "Aksesori diletakkan di atas kain beludru hitam yang menyerap cahaya, membuatnya tampak menonjol." },
                { name: "Pantulan Metalik", modifier: "Tampilan sudut rendah yang menangkap pantulan aksesori di permukaan logam yang dipoles." },
                { name: "Komposisi Geometris", modifier: "Aksesori ditempatkan di samping balok logam atau akrilik, menciptakan komposisi yang kuat dan modern." }
            ]
        },
        createHeldByModelConcept('accessories-held-by-model'),
        {
            id: "accessories-promo",
            title: "Promosi",
            basePrompt: `${qualityPrompt} a clean, eye-catching promotional shot of [product_description]. The background is a vibrant, solid color gradient that complements the product. Bright, commercial studio lighting is used to make the product look highly desirable and appealing.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is centered and looks heroic and appealing." },
                { name: "Dynamic Angle", modifier: "A slightly low-angle or tilted shot to give a dynamic feel." },
                { name: "Floating", modifier: "The product appears to be floating weightlessly against the clean background." },
                { name: "With Simple Prop", modifier: "The product is next to a single, simple geometric shape or prop that matches the color scheme." }
            ]
        },
        {
            id: "accessories-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style lifestyle shot featuring the [product_description]. The setting is atmospheric (e.g., a cozy cafe with warm lighting, a misty morning in a park, a sun-drenched urban street). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Action", modifier: "A close-up of a hand interacting with the product (e.g., picking it up, opening it)." },
                { name: "Environmental Pan", modifier: "A slow pan across the product as it sits in the beautiful environment." },
                { name: "Rack Focus", modifier: "The shot starts with the background blurred and then smoothly focuses on the product." },
                { name: "Detail in Rain/Sun", modifier: "A macro shot of the product with environmental effects like raindrops or a lens flare." }
            ]
        },
        {
            id: "accessories-poster",
            title: "Poster",
            isPoster: true,
            basePrompt: `${qualityPrompt} an artistic background image for a poster featuring the [product_description]. The product should be placed artfully on one side (e.g., the bottom-left third), leaving ample clean, beautiful, and uncluttered negative space on the rest of the image. The background should be aesthetically pleasing (like a textured wall, a minimalist landscape, or an abstract color field) but not distracting from the space reserved for text.`,
            angles: [{ name: "Poster Background", modifier: "Generate a single, high-quality background image with the product placed off-center to allow for text overlay." }],
        }
    ],
    gaming: [
        {
            id: "gaming-1",
            title: "Battlestation Neon",
            basePrompt: `A moody and atmospheric, ${qualityPrompt} the gaming product, [product_description], as the centerpiece of a gaming battlestation. The room is dark, illuminated by vibrant purple and blue neon/RGB lights.`,
            angles: [
                { name: "Tampilan Meja Penuh", modifier: "A wide shot of the entire desk setup, showing the product in its gaming environment." },
                { name: "Fokus pada Produk", modifier: "A shot where the product is in sharp focus and the surrounding elements are slightly blurred." },
                { name: "Cahaya RGB", modifier: "A close-up on the product, capturing the reflection of the colorful RGB lights on its surface." },
                { name: "Sudut Pandang Gamer", modifier: "A point-of-view shot from where a gamer would be sitting." }
            ]
        },
        {
            id: "gaming-2",
            title: "Panggung Produk",
            basePrompt: `A sleek, ${qualityPrompt} 'hero shot' of the gaming product, [product_description], on a dark, reflective pedestal. The background is completely black, and the product is dramatically lit by a single spotlight from above.`,
            angles: [
                { name: "Tampilan Tiga Perempat", modifier: "A classic three-quarter view to show the product's shape and depth." },
                { name: "Profil Samping", modifier: "A side-on shot to highlight the product's silhouette." },
                { name: "Detail Logo", modifier: "An extreme close-up on the product's logo or a key design feature." },
                { name: "Sudut Rendah Dramatis", modifier: "A low-angle shot looking up at the product to make it look powerful and imposing." }
            ]
        },
        {
            id: "gaming-new-minimal",
            title: "Minimalist Setup",
            basePrompt: `A clean, ${qualityPrompt} the gaming product, [product_description], in a minimalist, Scandinavian-inspired setup. The desk is made of light wood or is plain white. Cable management is perfect. The background is a clean white or light gray wall, with one or two small green plants. The lighting is bright and natural.`,
            angles: [
                { name: "Tampilan Meja yang Rapi", modifier: "Tampilan dari depan yang menunjukkan keseluruhan meja yang sangat rapi dan terorganisir." },
                { name: "Kontras Material", modifier: "Close-up yang menunjukkan tekstur produk dengan latar belakang kayu alami meja." },
                { name: "Fokus Desain", modifier: "Tampilan sudut yang menonjolkan bentuk dan desain produk tanpa gangguan dari lampu RGB." },
                { name: "Simetri Sempurna", modifier: "Tampilan dari atas (flat lay) yang menunjukkan penempatan simetris produk dan aksesori lainnya." }
            ]
        },
        {
            id: "gaming-new-esports",
            title: "Esports Arena",
            basePrompt: `An epic, ${qualityPrompt} the gaming product, [product_description], on a player's desk on the main stage of an esports arena. The background is filled with the dramatic lighting of the stage, large screens showing game graphics, and a blurred audience. A slight haze or smoke effect adds to the atmosphere.`,
            angles: [
                { name: "Di Bawah Lampu Panggung", modifier: "Produk diterangi oleh lampu panggung biru dan merah yang dramatis." },
                { name: "Siap Bertanding", modifier: "Tampilan dari sudut pandang pemain, melihat ke arah produk dan layar besar di depan." },
                { name: "Detail Kemenangan", modifier: "Close-up pada produk dengan confetti yang kabur jatuh di latar belakang." },
                { name: "Di Tengah Panggung", modifier: "Tampilan lebar yang menunjukkan meja pemain di tengah panggung besar yang kosong sebelum pertandingan." }
            ]
        },
        createHeldByModelConcept('gaming-held-by-model'),
        {
            id: "gaming-promo",
            title: "Promosi",
            basePrompt: `${qualityPrompt} a clean, eye-catching promotional shot of [product_description]. The background is a vibrant, solid color gradient that complements the product. Bright, commercial studio lighting is used to make the product look highly desirable and appealing.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is centered and looks heroic and appealing." },
                { name: "Dynamic Angle", modifier: "A slightly low-angle or tilted shot to give a dynamic feel." },
                { name: "Floating", modifier: "The product appears to be floating weightlessly against the clean background." },
                { name: "With Simple Prop", modifier: "The product is next to a single, simple geometric shape or prop that matches the color scheme." }
            ]
        },
        {
            id: "gaming-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style lifestyle shot featuring the [product_description]. The setting is atmospheric (e.g., a cozy cafe with warm lighting, a misty morning in a park, a sun-drenched urban street). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Action", modifier: "A close-up of a hand interacting with the product (e.g., picking it up, opening it)." },
                { name: "Environmental Pan", modifier: "A slow pan across the product as it sits in the beautiful environment." },
                { name: "Rack Focus", modifier: "The shot starts with the background blurred and then smoothly focuses on the product." },
                { name: "Detail in Rain/Sun", modifier: "A macro shot of the product with environmental effects like raindrops or a lens flare." }
            ]
        },
        {
            id: "gaming-poster",
            title: "Poster",
            isPoster: true,
            basePrompt: `${qualityPrompt} an artistic background image for a poster featuring the [product_description]. The product should be placed artfully on one side (e.g., the bottom-left third), leaving ample clean, beautiful, and uncluttered negative space on the rest of the image. The background should be aesthetically pleasing (like a textured wall, a minimalist landscape, or an abstract color field) but not distracting from the space reserved for text.`,
            angles: [{ name: "Poster Background", modifier: "Generate a single, high-quality background image with the product placed off-center to allow for text overlay." }],
        }
    ],
    food: [
        {
            id: "food-1",
            title: "Meja Kayu Rustic",
            basePrompt: `A warm and inviting, ${qualityPrompt} of the food product, [product_description], presented on a rustic wooden table. Include complementary elements like fresh herbs, a linen napkin, or vintage cutlery to create a cozy, homemade feel.`,
            angles: [
                { name: "Tampilan Dari Atas", modifier: "A top-down 'flat lay' shot of the entire dish and its surroundings." },
                { name: "Sudut 45 Derajat", modifier: "A classic 45-degree angle shot that shows both the top and side of the dish." },
                { name: "Detail Menggugah Selera", modifier: "A macro close-up shot focusing on the most delicious-looking part of the food, like melting cheese or a glossy sauce." },
                { name: "Konteks Penyajian", modifier: "A wider shot that includes a hand reaching for the dish or a drink next to the plate." }
            ]
        },
        {
            id: "food-2",
            title: "Sajian Aksi",
            basePrompt: `A dynamic and appetizing, ${qualityPrompt} capturing an action involving the food, [product_description]. Freeze a moment in time, such as syrup being poured, cheese being pulled, or steam rising from the dish.`,
            angles: [
                { name: "Tuangan Sirup/Saus", modifier: "Capture the moment a glossy sauce or syrup is being poured over the food." },
                { name: "Taburan Garnish", modifier: "Freeze the motion of herbs, sugar, or spices being sprinkled from above." },
                { name: "Lelehan Keju", modifier: "A classic 'cheese pull' shot, showing the stringy, melted texture." },
                { name: "Uap Panas", modifier: "A backlit shot that highlights the steam rising from a freshly cooked dish." }
            ]
        },
        {
            id: "food-new-dark",
            title: "Dark & Moody",
            basePrompt: `A dramatic, 'chiaroscuro' style ${qualityPrompt} of the food product, [product_description]. The dish is placed on a dark, textured surface like slate or dark wood. The background is nearly black. The scene is lit by a single, soft light source from the side, creating deep shadows and highlighting the food's texture.`,
            angles: [
                { name: "Cahaya Samping", modifier: "Tampilan dari samping yang menonjolkan tekstur dan lapisan makanan." },
                { name: "Dari Atas dengan Bayangan", modifier: "Tampilan dari atas yang menangkap bayangan panjang dan dramatis dari makanan dan peralatan makan." },
                { name: "Fokus pada Uap", modifier: "Cahaya dari belakang yang menyoroti uap yang mengepul dari makanan panas." },
                { name: "Detail Gelap", modifier: "Close-up yang sangat ketat pada satu bagian dari makanan, di mana cahaya dan bayangan bermain." }
            ]
        },
        {
            id: "food-new-picnic",
            title: "Piknik di Taman",
            basePrompt: `A bright and cheerful, ${qualityPrompt} of the food product, [product_description], as part of a beautiful picnic scene. The food is laid out on a classic red and white checkered blanket on lush green grass. The scene is filled with bright, sunny daylight. Other picnic items like a wicker basket and fresh fruit are visible in the background.`,
            angles: [
                { name: "Tampilan Selimut Piknik", modifier: "Tampilan dari atas yang menunjukkan seluruh penataan di atas selimut piknik." },
                { name: "Sudut Rendah di Rumput", modifier: "Tampilan dari sudut rendah, setinggi rumput, melihat ke arah makanan dengan latar belakang taman yang kabur." },
                { name: "Digenggam", modifier: "Tangan seseorang terlihat mengambil atau memegang makanan, memberikan sentuhan manusiawi." },
                { name: "Sinar Matahari Terik", modifier: "Foto dengan cahaya matahari langsung yang menciptakan kilau pada makanan dan bayangan yang tajam." }
            ]
        },
        createHeldByModelConcept('food-held-by-model'),
        {
            id: "food-promo",
            title: "Promosi",
            basePrompt: `${qualityPrompt} a clean, eye-catching promotional shot of [product_description]. The background is a vibrant, solid color gradient that complements the product. Bright, commercial studio lighting is used to make the product look highly desirable and appealing.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is centered and looks heroic and appealing." },
                { name: "Dynamic Angle", modifier: "A slightly low-angle or tilted shot to give a dynamic feel." },
                { name: "Floating", modifier: "The product appears to be floating weightlessly against the clean background." },
                { name: "With Simple Prop", modifier: "The product is next to a single, simple geometric shape or prop that matches the color scheme." }
            ]
        },
        {
            id: "food-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style lifestyle shot featuring the [product_description]. The setting is atmospheric (e.g., a cozy cafe with warm lighting, a misty morning in a park, a sun-drenched urban street). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Action", modifier: "A close-up of a hand interacting with the product (e.g., picking it up, opening it)." },
                { name: "Environmental Pan", modifier: "A slow pan across the product as it sits in the beautiful environment." },
                { name: "Rack Focus", modifier: "The shot starts with the background blurred and then smoothly focuses on the product." },
                { name: "Detail in Rain/Sun", modifier: "A macro shot of the product with environmental effects like raindrops or a lens flare." }
            ]
        },
        {
            id: "food-poster",
            title: "Poster",
            isPoster: true,
            basePrompt: `${qualityPrompt} an artistic background image for a poster featuring the [product_description]. The product should be placed artfully on one side (e.g., the bottom-left third), leaving ample clean, beautiful, and uncluttered negative space on the rest of the image. The background should be aesthetically pleasing (like a textured wall, a minimalist landscape, or an abstract color field) but not distracting from the space reserved for text.`,
            angles: [{ name: "Poster Background", modifier: "Generate a single, high-quality background image with the product placed off-center to allow for text overlay." }],
        }
    ],
};