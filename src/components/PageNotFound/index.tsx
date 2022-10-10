import { Box } from '@mui/material';
import React, { FC } from 'react';

const PageNotFound: FC = () => {
  return (
    <Box width={'100%'} display="flex" flexDirection={'column'} alignItems={'center'}>
      <h1>404 - Page not found!</h1>
    </Box>
  );
};

export default PageNotFound;
