import axios from 'axios';

export const translateText = async (text, targetLang) => {
    try {
        const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = response.data;
        return Array.isArray(data?.[0]) ? data[0].map(([translatedText]) => translatedText).join('') : text;
    } catch {
        return text;
    }
};
