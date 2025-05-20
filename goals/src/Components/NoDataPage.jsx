import React from 'react';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox'; // MUI icon

const NoDataPage = ({ message = "No goals found" }) => {
  return (
    <Box
      height="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <InboxIcon sx={{ fontSize: 80, color: '#aaa', mb: 2 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {message}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Add some tasks to get started!
      </Typography>
    </Box>
  );
};

export default NoDataPage;
