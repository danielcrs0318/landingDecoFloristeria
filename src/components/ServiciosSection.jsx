// src/components/ServiciosSection.jsx
import React from 'react';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGift, FiHeart, FiMessageCircle, FiPackage, FiShoppingBag, FiSmile, FiStar } from 'react-icons/fi';
import { useWhatsAppChat } from '../context/WhatsAppChatContext';
import SectionHeader from './SectionHeader';
import SectionWrapper from './SectionWrapper';

const servicios = [
  {
    icon: <FiHeart />,
    title: 'Arreglos florales',
    tag: 'Más solicitado',
    desc: 'Ramos, bouquets y arreglos personalizados para cumpleaños, amor, agradecimientos y fechas especiales.',
    items: ['Flores frescas', 'Diseño a la medida', 'Tarjeta incluida'],
  },
  {
    icon: <FiGift />,
    title: 'Decoración de eventos',
    tag: 'Celebraciones',
    desc: 'Ambientamos cumpleaños, sorpresas y reuniones con flores, globos y detalles coordinados.',
    items: ['Mesa principal', 'Arcos y fondos', 'Temática personalizada'],
  },
  {
    icon: <FiStar />,
    title: 'Piñatas y sorpresas',
    tag: 'Fiestas',
    desc: 'Piñatas originales, globos, dulces y complementos para que tu celebración se sienta completa.',
    items: ['Piñatas coloridas', 'Dulces variados', 'Combos para fiesta'],
  },
  {
    icon: <FiSmile />,
    title: 'Peluches y detalles',
    tag: 'Regalos',
    desc: 'Agregamos peluches, chocolates, tarjetas y detalles especiales a tus arreglos o cajas de regalo.',
    items: ['Peluches suaves', 'Chocolates', 'Presentación cuidada'],
  },
  {
    icon: <FiShoppingBag />,
    title: 'Cajas y canastas',
    tag: 'Personalizable',
    desc: 'Opciones listas para regalar con flores, dulces, productos especiales y acabados elegantes.',
    items: ['Cajas premium', 'Canastas mixtas', 'Entrega programada'],
  },
  {
    icon: <FiPackage />,
    title: 'Pedidos especiales',
    tag: 'A tu gusto',
    desc: 'Cuéntanos tu idea y te ayudamos a convertirla en un detalle bonito, ordenado y memorable.',
    items: ['Asesoría por WhatsApp', 'Cotización rápida', 'Opciones por presupuesto'],
  },
];

const ServiciosSection = () => {
  const [ref, inView] = useInView({ once: true, threshold: 0.15 });
  const { openChat } = useWhatsAppChat();

  return (
    <SectionWrapper id="servicios">
      <SectionHeader
        title="Nuestros Servicios"
        subtitle="Organizamos tus detalles por ocasión para que elijas rápido, nos escribas por WhatsApp y afinemos juntos cada pedido."
      />

      <Box
        ref={ref}
        component={motion.div}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
          gap: { xs: 2.5, md: 3 },
          maxWidth: 1100,
          mx: 'auto',
        }}
      >
        {servicios.map((servicio) => (
          <motion.div
            key={servicio.title}
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
            }}
            style={{ height: '100%', minWidth: 0 }}
          >
            <Card
              component={motion.article}
              whileHover={{ y: -6 }}
              sx={{
                height: '100%',
                border: '1px solid rgba(212, 165, 165, 0.35)',
                bgcolor: 'background.paper',
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3.25 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2,
                      bgcolor: 'rgba(122, 158, 126, 0.12)',
                      color: 'secondary.main',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '1.65rem',
                      flexShrink: 0,
                    }}
                  >
                    {servicio.icon}
                  </Box>
                  <Chip label={servicio.tag} size="small" sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700 }} />
                </Stack>

                <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' } }}>
                  {servicio.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2.5 }}>
                  {servicio.desc}
                </Typography>

                <Stack component="ul" spacing={1} sx={{ listStyle: 'none', p: 0, m: 0, mt: 'auto' }}>
                  {servicio.items.map((item) => (
                    <Box component="li" key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'secondary.main', flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary">
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 5 } }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<FiMessageCircle />}
          onClick={() => openChat('Hola, quiero información sobre los servicios de Deco Floristería.')}
        >
          Cotizar por WhatsApp
        </Button>
      </Box>
    </SectionWrapper>
  );
};

export default ServiciosSection;
