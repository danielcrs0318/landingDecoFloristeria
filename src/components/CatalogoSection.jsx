// src/components/CatalogoSection.jsx
import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMessageCircle } from 'react-icons/fi';
import { catalogImages } from '../data/images';
import { useWhatsAppChat } from '../context/WhatsAppChatContext';
import SectionHeader from './SectionHeader';
import SectionWrapper from './SectionWrapper';

const productos = [
  { id: 1, nombre: 'Ramo Primavera', desc: 'Mix de flores de temporada con acentos vibrantes.', precio: 350, img: catalogImages.ramoPrimavera, cat: 'Ramos' },
  { id: 2, nombre: 'Centro Elegante', desc: 'Rosas blancas y follaje para cenas o espacios especiales.', precio: 580, img: catalogImages.centroElegante, cat: 'Centros' },
  { id: 3, nombre: 'Arreglo Romántico', desc: 'Rosas rojas clásicas en base decorativa premium.', precio: 420, img: catalogImages.arregloRomantico, cat: 'Arreglos' },
  { id: 4, nombre: 'Bouquet Silvestre', desc: 'Flores de campo secas y frescas combinadas.', precio: 290, img: catalogImages.bouquetSilvestre, cat: 'Bouquet' },
  { id: 5, nombre: 'Corona Fúnebre', desc: 'Arreglo sobrio y elegante para despedidas.', precio: 750, img: catalogImages.coronaFunebre, cat: 'Fúnebre' },
  { id: 6, nombre: 'Caja de Rosas', desc: 'Caja de lujo con 12 rosas seleccionadas.', precio: 680, img: catalogImages.cajaRosas, cat: 'Cajas' },
];

const CatalogoSection = () => {
  const [ref, inView] = useInView({ once: true, threshold: 0.1 });
  const { openChat } = useWhatsAppChat();

  const handleOrder = (prod) => {
    openChat(`Hola, quiero realizar un pedido de ${prod.nombre} por L. ${prod.precio}. ¿Me ayudan con disponibilidad y entrega?`);
  };

  return (
    <SectionWrapper id="catalogo">
      <SectionHeader
        title="Catálogo Recomendado"
        subtitle="Opciones populares listas para cotizar. Cada pedido se confirma por WhatsApp para ajustar flores, colores, fecha y entrega."
        maxWidth={640}
      />

      <Box
        ref={ref}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
          gap: { xs: 2.5, md: 3 },
          maxWidth: 1100,
          mx: 'auto',
        }}
      >
        {productos.map((prod, index) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            style={{ height: '100%', minWidth: 0 }}
          >
            <Card
              component={motion.article}
              whileHover={{ y: -6 }}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid rgba(212, 165, 165, 0.32)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '4 / 3',
                  bgcolor: 'primary.light',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={prod.img}
                  alt={prod.nombre}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <Chip
                  label={prod.cat}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    bgcolor: 'rgba(255,255,255,0.94)',
                    fontWeight: 700,
                    color: 'primary.dark',
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, md: 3 } }}>
                <Stack spacing={0.75} sx={{ mb: 1.5 }}>
                  <Typography variant="h5" sx={{ lineHeight: 1.15, fontSize: { xs: '1.15rem', md: '1.35rem' } }}>
                    {prod.nombre}
                  </Typography>
                  <Typography variant="h6" color="secondary.main" fontWeight={700}>
                    L. {prod.precio}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {prod.desc}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: { xs: 2.5, md: 3 }, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  startIcon={<FiMessageCircle />}
                  component={motion.button}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOrder(prod)}
                >
                  Pedir por WhatsApp
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </Box>
    </SectionWrapper>
  );
};

export default CatalogoSection;
