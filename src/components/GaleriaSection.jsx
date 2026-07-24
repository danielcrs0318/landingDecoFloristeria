// src/components/GaleriaSection.jsx
import React from 'react';
import { Box, ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { galleryImages } from '../data/images';
import SectionHeader from './SectionHeader';
import SectionWrapper from './SectionWrapper';

const GaleriaSection = () => {
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const cols = matchDownSm ? 1 : matchDownMd ? 2 : 3;
  const [ref, inView] = useInView({ once: true, threshold: 0.1 });

  return (
    <SectionWrapper id="galeria" bgcolor="background.paper">
      <SectionHeader
        title="Nuestra Galería"
        subtitle="Inspírate con algunos de nuestros diseños florales para bodas, celebraciones y detalles especiales."
      />

      <Box
        ref={ref}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}
      >
        <ImageList variant="masonry" cols={cols} gap={matchDownSm ? 12 : 16}>
          {galleryImages.map((item, index) => (
            <ImageListItem
              key={item.title}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
                position: 'relative',
                '&:hover .overlay': { opacity: 1 },
              }}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                loading="lazy"
                decoding="async"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  verticalAlign: 'middle',
                }}
              />
              <Box
                className="overlay"
                sx={{
                  opacity: { xs: 1, md: 0 },
                  transition: 'opacity 220ms ease',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pt: 6,
                  pb: 1.5,
                  px: 2,
                  background: 'linear-gradient(transparent, rgba(45,45,45,0.72))',
                  color: '#FFF',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {item.title}
                </Box>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </SectionWrapper>
  );
};

export default GaleriaSection;
