import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DataError = ({ onRetry }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="60vh"
      textAlign="center"
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Failed to load data
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Please check your internet connection and try again.
      </Typography>
      {onRetry && (
        <Button variant="contained" color="error" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
};

export default DataError;
