import React, { FC } from 'react';
import { Typography } from '@mui/material'

export interface TitleProps {
  title?: string,
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
  )
};

export default Title;
