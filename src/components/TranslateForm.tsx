import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import LanguageSelector from './LanguageSelector';
import Loader from './Loader';
import axios from 'axios';
import { TranslationResponse } from '../types/translation';
import { AiOutlineArrowRight } from 'react-icons/ai';

const TranslateForm: React.FC = () => {
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    setLoading(true);
    setTranslation(null);
    setError(null);
    
    try {
      const response = await axios.post<TranslationResponse>(
        'https://nameless.aicodegen.workers.dev',
        { text, source_lang: sourceLang, target_lang: targetLang },
        { timeout: 15000 }  // 15 seconds timeout
      );
      setTranslation(response.data.response.translation_text);
    } catch (error: any) {
      console.error('API Error:', error);
      setError('Error while translating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper',
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        AI Translator
      </Typography>
      <TextField
        label="Text to Translate"
        multiline
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box display="flex" gap={2} mb={2}>
        <LanguageSelector value={sourceLang} onChange={setSourceLang} label="Source Language" />
        <LanguageSelector value={targetLang} onChange={setTargetLang} label="Target Language" />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleTranslate}
        startIcon={<AiOutlineArrowRight />}
        disabled={loading || !text}
      >
        Translate
      </Button>
      
      {loading && <Loader />}
      
      {error && (
        <Box mt={3} p={2} bgcolor="error.main" color="white" borderRadius={2}>
          <Typography variant="body1">{error}</Typography>
        </Box>
      )}
      
      {translation && (
        <Box mt={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="subtitle1" gutterBottom>
            Translation:
          </Typography>
          <Typography>{translation}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TranslateForm;
