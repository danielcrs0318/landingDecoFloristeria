// src/components/ContactoSection.jsx
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Link,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiExternalLink, FiMapPin, FiMessageCircle, FiPhone, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { DISPLAY_WHATSAPP } from '../utils/whatsapp';
import { useWhatsAppChat } from '../context/WhatsAppChatContext';
import SectionHeader from './SectionHeader';
import SectionWrapper from './SectionWrapper';

const tipoLabels = {
  ramo: 'Ramo / Bouquet',
  centro: 'Centro de mesa',
  evento: 'Evento / cumpleaños',
  funebre: 'Arreglo fúnebre',
  pinata: 'Piñata / dulces',
  otro: 'Otro pedido',
};

const MAPS_URL = 'https://maps.google.com/?q=Col.+Florencia+Sur,+Tegucigalpa,+Honduras';
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.5!2d-87.1852!3d14.0772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6fa2c5daaaaaab%3A0xc3c4ccfc19f72b7b!2sTegucigalpa%2C%20Honduras!5e0!3m2!1ses!2shn!4v1700000000000!5m2!1ses!2shn';

const today = () => new Date().toISOString().split('T')[0];

const ContactoSection = () => {
  const { openChat } = useWhatsAppChat();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const tipo = tipoLabels[data.tipo] || 'Pedido especial';
    const message = [
      'Hola, quiero realizar un pedido en Deco Floristería.',
      `Nombre: ${data.nombre}`,
      `Teléfono: ${data.telefono}`,
      `Tipo de pedido: ${tipo}`,
      `Fecha deseada: ${data.fecha}`,
      data.mensaje ? `Detalles: ${data.mensaje}` : '',
    ].filter(Boolean).join('\n');

    openChat(message);
    reset();
  };

  return (
    <SectionWrapper id="contacto" bgcolor="#FDF8F3">
      <SectionHeader
        title="Haz tu pedido por WhatsApp"
        subtitle="Completa los datos y abre el chat en la página con el mensaje listo. Confirmamos disponibilidad, precio y entrega en minutos."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.15fr 0.85fr' },
          gap: { xs: 3, md: 4 },
          maxWidth: 1100,
          mx: 'auto',
          alignItems: 'start',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '1px solid #E8C5C5',
            order: { xs: 2, lg: 1 },
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5} sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: '#25D366',
                color: '#FFF',
                display: 'grid',
                placeItems: 'center',
                fontSize: '1.4rem',
                flexShrink: 0,
              }}
            >
              <FaWhatsapp />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ color: 'primary.dark', fontSize: { xs: '1.35rem', md: '1.6rem' } }}>
                Solicitud de pedido
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sin correos ni esperas: todo se confirma en WhatsApp.
              </Typography>
            </Box>
          </Stack>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Nombre completo"
              variant="outlined"
              {...register('nombre', { required: 'El nombre es requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />
            <TextField
              fullWidth
              label="Teléfono / WhatsApp"
              variant="outlined"
              placeholder="Ej. 9999-0000"
              {...register('telefono', {
                required: 'El teléfono es requerido',
                pattern: { value: /^[\d\s\-+()]{7,}$/, message: 'Ingresa un teléfono válido' },
              })}
              error={!!errors.telefono}
              helperText={errors.telefono?.message}
            />
            <TextField
              select
              fullWidth
              label="Tipo de pedido"
              variant="outlined"
              defaultValue=""
              {...register('tipo', { required: 'Selecciona una opción' })}
              error={!!errors.tipo}
              helperText={errors.tipo?.message}
            >
              <MenuItem value="">Seleccione uno</MenuItem>
              <MenuItem value="ramo">Ramo / Bouquet</MenuItem>
              <MenuItem value="centro">Centro de mesa</MenuItem>
              <MenuItem value="evento">Evento / cumpleaños</MenuItem>
              <MenuItem value="funebre">Arreglo fúnebre</MenuItem>
              <MenuItem value="pinata">Piñata / dulces</MenuItem>
              <MenuItem value="otro">Otro pedido</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Fecha deseada"
              type="date"
              slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: today() } }}
              {...register('fecha', { required: 'La fecha es requerida' })}
              error={!!errors.fecha}
              helperText={errors.fecha?.message}
            />
            <TextField
              fullWidth
              label="Detalles del pedido"
              placeholder="Color, ocasión, dirección de entrega o presupuesto aproximado"
              multiline
              rows={4}
              variant="outlined"
              {...register('mensaje')}
              sx={{ gridColumn: { sm: '1 / -1' } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              endIcon={<FiSend />}
              component={motion.button}
              whileTap={{ scale: 0.97 }}
              sx={{ gridColumn: '1 / -1', py: 1.5 }}
            >
              Abrir chat en la página
            </Button>
          </Box>
        </Paper>

        <Stack spacing={2.5} sx={{ order: { xs: 1, lg: 2 }, minWidth: 0 }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            spacing={1}
            sx={{ display: { xs: 'flex', lg: 'none' } }}
          >
            <Chip label="Respuesta rápida" color="success" variant="outlined" sx={{ borderColor: '#25D366', color: '#128C7E' }} />
            <Chip label="Entrega a domicilio" variant="outlined" sx={{ borderColor: 'primary.main', color: 'primary.dark' }} />
          </Stack>

          <Card sx={{ border: '1px solid rgba(212, 165, 165, 0.35)' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    bgcolor: 'rgba(37, 211, 102, 0.12)',
                    color: '#128C7E',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '1.35rem',
                    flexShrink: 0,
                  }}
                >
                  <FiMessageCircle />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6" gutterBottom>
                    Atención por WhatsApp
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2, wordBreak: 'break-word' }}>
                    {DISPLAY_WHATSAPP}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<FaWhatsapp />}
                    onClick={() => openChat('Hola, quiero hacer una consulta sobre un pedido en Deco Floristería.')}
                    sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' } }}
                  >
                    Abrir chat
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid rgba(212, 165, 165, 0.35)' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack spacing={2.5}>
                {[
                  { icon: <FiClock />, label: 'Horario', value: 'Lunes a sábado, 8:00 am – 6:00 pm' },
                  { icon: <FiPhone />, label: 'Confirmación', value: 'Disponibilidad, precio final y entrega por chat' },
                  { icon: <FiMapPin />, label: 'Ubicación', value: 'Col. Florencia Sur, Tegucigalpa' },
                ].map((item) => (
                  <Stack key={item.label} direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: 'primary.light',
                        color: 'primary.dark',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.label}
                      </Typography>
                      <Typography fontWeight={700} sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(212, 165, 165, 0.2)',
              border: '1px solid rgba(212, 165, 165, 0.25)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.25,
                bgcolor: 'background.paper',
                borderBottom: '1px solid rgba(212, 165, 165, 0.2)',
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Cómo llegar
              </Typography>
              <Link
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.85rem',
                  color: 'secondary.main',
                  fontWeight: 600,
                }}
              >
                Abrir en Maps
                <FiExternalLink size={14} />
              </Link>
            </Box>
            <Box
              component="iframe"
              title="Mapa de ubicación Deco Floristería"
              src={MAP_EMBED}
              sx={{
                width: '100%',
                height: { xs: 220, sm: 260, md: 280 },
                border: 0,
                display: 'block',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Box>
        </Stack>
      </Box>
    </SectionWrapper>
  );
};

export default ContactoSection;
