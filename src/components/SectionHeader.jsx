import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, maxWidth = 680 }) => (
  <Stack alignItems="center" textAlign="center" sx={{ mb: { xs: 5, md: 6 }, mx: 'auto' }}>
    <Typography
      variant="h2"
      gutterBottom
      component={motion.h2}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      sx={{ px: { xs: 1, sm: 0 } }}
    >
      {title}
    </Typography>
    <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', borderRadius: 2, mb: subtitle ? 2 : 0 }} />
    {subtitle && (
      <Typography color="text.secondary" sx={{ maxWidth, px: { xs: 2, sm: 0 } }}>
        {subtitle}
      </Typography>
    )}
  </Stack>
);

export default SectionHeader;
