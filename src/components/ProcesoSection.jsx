// src/components/ProcesoSection.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMousePointer, FiEdit3, FiCheckCircle, FiTruck } from 'react-icons/fi';
import SectionHeader from './SectionHeader';
import SectionWrapper from './SectionWrapper';

const proceso = [
  { icon: <FiMousePointer />, title: 'Elige tu arreglo', desc: 'Explora nuestro catálogo y selecciona tu favorito.' },
  { icon: <FiEdit3 />, title: 'Personaliza', desc: 'Añade colores, tarjetas y detalles únicos.' },
  { icon: <FiCheckCircle />, title: 'Confirmamos', desc: 'Revisamos tu pedido y te aseguramos calidad.' },
  { icon: <FiTruck />, title: 'Entrega en casa', desc: 'Lo llevamos a la puerta de ese alguien especial.' },
];

const ProcesoSection = () => {
  const [ref, inView] = useInView({ once: true, threshold: 0.2 });

  return (
    <SectionWrapper id="proceso" bgcolor="primary.light">
      <SectionHeader
        title="¿Cómo funciona?"
        subtitle="Cuatro pasos sencillos desde la idea hasta la entrega en tu puerta."
      />

      <Box ref={ref} sx={{ position: 'relative', maxWidth: 1000, mx: 'auto' }}>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: 50,
            left: '12%',
            right: '12%',
            zIndex: 0,
            height: 2,
            borderTop: '2px dashed rgba(255,255,255,0.7)',
          }}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
            gap: { xs: 4, md: 3 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          {proceso.map((paso, index) => (
            <motion.div
              key={paso.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Box textAlign="center">
                <Box
                  sx={{
                    width: { xs: 88, md: 100 },
                    height: { xs: 88, md: 100 },
                    borderRadius: '50%',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2.5,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    fontSize: { xs: '2.25rem', md: '2.75rem' },
                    color: 'primary.main',
                    position: 'relative',
                  }}
                >
                  {paso.icon}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'secondary.main',
                      color: 'white',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                    }}
                  >
                    {index + 1}
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' } }}>
                  {paso.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 220, mx: 'auto' }}>
                  {paso.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default ProcesoSection;
