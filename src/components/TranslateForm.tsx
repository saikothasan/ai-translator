import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import Loader from './Loader';
import { AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';

const TranslateForm: React.FC = () => {
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);

  const handleTranslate = async () => {
    setLoading(true);
    setTranslation(null);
    try {
      const response = await axios.post(
        'https://nameless.aicodegen.workers.dev',
        { text, source_lang: sourceLang, target_lang: targetLang }
      );
      setTranslation(response.data.response.translation_text);
    } catch (error) {
      console.error('Error:', error);
      setTranslation('Error while translating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
      <h1 className="text-xl font-semibold text-center mb-4 text-gray-700">
        AI Translator
      </h1>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        rows={4}
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <LanguageSelector value={sourceLang} onChange={setSourceLang} />
        <LanguageSelector value={targetLang} onChange={setTargetLang} />
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? <Loader /> : <>Translate <AiOutlineArrowRight /></>}
      </button>
      {translation && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
          <h2 className="font-semibold mb-2">Translation:</h2>
          <p>{translation}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateForm;
