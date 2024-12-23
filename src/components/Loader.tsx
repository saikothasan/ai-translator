import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
