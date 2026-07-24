// src/components/HeroSection.jsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { heroImage } from '../data/images';
import { useWhatsAppChat } from '../context/WhatsAppChatContext';

const HeroSection = () => {
  const { openChat } = useWhatsAppChat();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <Box
      id="inicio"
      sx={{
        minHeight: { xs: '100svh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        scrollMarginTop: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(45,45,45,0.75) 0%, rgba(45,45,45,0.45) 50%, rgba(45,45,45,0.65) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: { xs: 12, md: 14 },
          pb: { xs: 10, md: 8 },
          px: { xs: 2.5, sm: 3 },
        }}
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ maxWidth: 720, mx: 'auto', textAlign: 'center' }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                color: '#FFF',
                fontSize: { xs: '2.5rem', sm: '3.25rem', md: '4.5rem' },
                mb: 2,
                lineHeight: 1.1,
              }}
            >
              Flores que cuentan historias
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h6"
              sx={{
                color: '#FDF8F3',
                mb: 4,
                fontWeight: 400,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.6,
              }}
            >
              Creamos arreglos florales únicos y memorables para cada momento especial.
              Diseños premium entregados con amor en Tegucigalpa.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ width: { xs: '100%', sm: 'auto' }, maxWidth: 320 }}
              >
                Ver catálogo
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FaWhatsapp />}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  color: '#FFF',
                  borderColor: '#FFF',
                  width: { xs: '100%', sm: 'auto' },
                  maxWidth: 320,
                  '&:hover': {
                    borderColor: '#D4A5A5',
                    backgroundColor: 'rgba(212, 165, 165, 0.1)',
                  },
                }}
                onClick={() => openChat('Hola Deco Floristería, quiero hacer un pedido.')}
              >
                Chatear ahora
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Container>

      <Box
        component={motion.div}
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 40 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: '#FFF',
          fontSize: '1.75rem',
          cursor: 'pointer',
          opacity: 0.85,
        }}
        onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Ir a servicios"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
      >
        ↓
      </Box>
    </Box>
  );
};

export default HeroSection;
