// src/components/FAQSection.jsx
import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SectionWrapper from './SectionWrapper';

const faqs = [
  { q: '¿Hacen entregas a domicilio?', a: 'Sí, contamos con servicio de delivery a toda la ciudad y zonas aledañas. El costo depende de la distancia.' },
  { q: '¿Cuánto tiempo tarda un pedido?', a: 'Para arreglos de catálogo, sugerimos 24 horas de anticipación. Para eventos o personalizados, al menos 1 semana.' },
  { q: '¿Aceptan pagos por transferencia?', a: 'Sí, aceptamos transferencias bancarias a los principales bancos hondureños y links de pago.' },
  { q: '¿Hacen arreglos para bodas?', a: '¡Por supuesto! Contamos con un equipo especialista en bodas para diseñar tu ramo, centros de mesa y decoración de la iglesia.' },
  { q: '¿Pueden personalizar los colores?', a: 'Claro que sí, todos nuestros arreglos pueden variar de color según tu preferencia y disponibilidad de la temporada.' },
];

const FAQSection = () => (
  <SectionWrapper id="faq" maxWidth="md">
    <SectionHeader title="Preguntas Frecuentes" />

    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      sx={{ maxWidth: 720, mx: 'auto' }}
    >
      {faqs.map((faq) => (
        <motion.div
          key={faq.q}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Accordion
            sx={{
              mb: 2,
              borderRadius: '12px !important',
              '&:before': { display: 'none' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: '1px solid rgba(212, 165, 165, 0.2)',
            }}
          >
            <AccordionSummary
              expandIcon={<FiChevronDown color="#D4A5A5" />}
              sx={{ px: { xs: 2, md: 3 }, py: 1 }}
            >
              <Typography variant="h6" fontWeight="bold" fontFamily='"DM Sans", sans-serif' sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: 3, color: 'text.secondary' }}>
              <Typography>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </Box>
  </SectionWrapper>
);

export default FAQSection;
