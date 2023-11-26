import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface LoadingErrorDisplayProps {
  loading: boolean;
  error: string | null;
}

const LoadingErrorDisplay: React.FC<LoadingErrorDisplayProps> = ({
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
        <Typography>Loading locations...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return null;
};

export default LoadingErrorDisplay;
