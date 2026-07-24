// src/components/TestimoniosSection.jsx
import React, { useState } from 'react';
import { Box, Typography, IconButton, Rating, Avatar, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { avatarImages } from '../data/images';
import SectionHeader from './SectionHeader';
import SectionWrapper from './SectionWrapper';

const testimonios = [
  { id: 1, name: 'Ana Martínez', text: 'Los arreglos de Deco Floristería hicieron que mi boda fuera un cuento de hadas. La calidad de las rosas es impresionante.', rating: 5, avatar: avatarImages.ana },
  { id: 2, name: 'Carlos Díaz', text: 'Pedí un centro de mesa para el aniversario de mis padres y quedaron fascinados. Excelente servicio y entrega puntual.', rating: 5, avatar: avatarImages.carlos },
  { id: 3, name: 'Lucía Fernández', text: 'El bouquet de flores silvestres es mi favorito. El servicio al cliente por WhatsApp es muy amable.', rating: 4, avatar: avatarImages.lucia },
];

const TestimoniosSection = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonios.length);
  const prev = () => setIndex((i) => (i - 1 + testimonios.length) % testimonios.length);

  return (
    <SectionWrapper id="testimonios" bgcolor="background.paper">
      <SectionHeader title="Lo que dicen de nosotros" />

      <Box
        sx={{
          position: 'relative',
          maxWidth: 720,
          mx: 'auto',
          minHeight: { xs: 260, md: 300 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 5.5, sm: 7, md: 2 },
          width: '100%',
        }}
      >
        <IconButton
          onClick={prev}
          aria-label="Testimonio anterior"
          sx={{
            position: 'absolute',
            left: { xs: 0, md: -56 },
            zIndex: 2,
            color: 'primary.main',
            bgcolor: 'background.paper',
            border: '1px solid rgba(212, 165, 165, 0.3)',
            '&:hover': { bgcolor: 'primary.light' },
          }}
        >
          <FiChevronLeft size={24} />
        </IconButton>

        <Box sx={{ width: '100%', textAlign: 'center', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <Avatar
                src={testimonios[index].avatar}
                alt={testimonios[index].name}
                sx={{ width: 80, height: 80, mx: 'auto', mb: 2, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              />
              <Rating value={testimonios[index].rating} readOnly sx={{ mb: 2 }} />
              <Typography
                variant="h5"
                sx={{
                  fontStyle: 'italic',
                  mb: 3,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  lineHeight: 1.5,
                  px: { xs: 0, md: 2 },
                }}
              >
                &ldquo;{testimonios[index].text}&rdquo;
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                — {testimonios[index].name}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>

        <IconButton
          onClick={next}
          aria-label="Siguiente testimonio"
          sx={{
            position: 'absolute',
            right: { xs: 0, md: -56 },
            zIndex: 2,
            color: 'primary.main',
            bgcolor: 'background.paper',
            border: '1px solid rgba(212, 165, 165, 0.3)',
            '&:hover': { bgcolor: 'primary.light' },
          }}
        >
          <FiChevronRight size={24} />
        </IconButton>
      </Box>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
        {testimonios.map((t, i) => (
          <Box
            key={t.id}
            onClick={() => setIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`Ver testimonio de ${t.name}`}
            onKeyDown={(e) => e.key === 'Enter' && setIndex(i)}
            sx={{
              width: i === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: i === index ? 'primary.main' : 'primary.light',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          />
        ))}
      </Stack>
    </SectionWrapper>
  );
};

export default TestimoniosSection;
