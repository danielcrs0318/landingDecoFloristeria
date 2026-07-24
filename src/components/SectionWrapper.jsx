import React from 'react';
import { Box, Container } from '@mui/material';

const SectionWrapper = ({
  id,
  children,
  bgcolor = 'background.default',
  maxWidth = 'lg',
  py = { xs: 7, sm: 8, md: 10 },
}) => (
  <Box
    component="section"
    id={id}
    sx={{
      py,
      bgcolor,
      scrollMarginTop: { xs: 64, md: 88 },
      overflow: 'hidden',
    }}
  >
    <Container
      maxWidth={maxWidth}
      sx={{
        px: { xs: 2, sm: 3 },
        width: '100%',
      }}
    >
      {children}
    </Container>
  </Box>
);

export default SectionWrapper;
