import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange, label }) => {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
    { code: 'es', label: 'Spanish' },
  ];

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
