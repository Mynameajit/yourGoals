import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Link, Box } from '@mui/material';

const PageNotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '90px' }}>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Typography variant="body1" gutterBottom>
       <Link component={RouterLink} to="/"> Go back to </Link>.
      </Typography>
    </Box>
  );
};

export default PageNotFound;
