// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, IconButton, Divider, Link } from '@mui/material';
import { FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { DISPLAY_WHATSAPP } from '../utils/whatsapp';
import { useWhatsAppChat } from '../context/WhatsAppChatContext';

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const quickLinks = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Catálogo', id: 'catalogo' },
  { label: 'Preguntas Frecuentes', id: 'faq' },
  { label: 'Contacto', id: 'contacto' },
];

const Footer = () => {
  const { openChat } = useWhatsAppChat();

  return (
  <Box component="footer" sx={{ bgcolor: 'background.dark', color: '#FFF', py: { xs: 5, md: 6 }, pt: { xs: 7, md: 8 } }}>
    <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.2fr 1fr 1fr' },
          gap: { xs: 4, md: 5 },
          alignItems: 'start',
        }}
      >
        <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1', md: 'auto' }, maxWidth: { md: 360 } }}>
          <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>
            Deco Floristería
          </Typography>
          <Typography variant="body2" sx={{ color: '#ccc', mb: 2, lineHeight: 1.7 }}>
            Diseñamos experiencias memorables a través del arte floral. Calidad, frescura y elegancia en cada pétalo, directo a tu puerta en Tegucigalpa.
          </Typography>
          <Box display="flex" gap={0.5} flexWrap="wrap">
            {[
              { icon: <FiInstagram />, label: 'Instagram' },
              { icon: <FiFacebook />, label: 'Facebook' },
              { icon: <FaTiktok />, label: 'TikTok' },
              { icon: <FaWhatsapp />, label: 'WhatsApp', onClick: () => openChat('Hola Deco Floristería') },
            ].map((social) => (
              <IconButton
                key={social.label}
                aria-label={social.label}
                onClick={social.onClick}
                sx={{ color: '#FFF', '&:hover': { color: 'primary.main' } }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Enlaces rápidos
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, color: '#ccc', lineHeight: 2.2 }}>
            {quickLinks.map((link) => (
              <Box component="li" key={link.id}>
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => scrollTo(link.id)}
                  sx={{ color: 'inherit', fontSize: '0.875rem', border: 'none', background: 'none', cursor: 'pointer', p: 0, '&:hover': { color: 'primary.main' } }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Contacto
          </Typography>
          <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
            Col. Florencia Sur, Tegucigalpa
          </Typography>
          <Link
            href={`tel:${DISPLAY_WHATSAPP.replace(/\s/g, '')}`}
            underline="hover"
            sx={{ color: '#ccc', display: 'block', mb: 1, '&:hover': { color: 'primary.main' } }}
          >
            {DISPLAY_WHATSAPP}
          </Link>
          <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
            hola@decofloristeria.hn
          </Typography>
          <Typography variant="body2" sx={{ color: '#ccc', mt: 2 }}>
            <strong>Horario:</strong> Lunes a sábado, 8:00 am – 6:00 pm
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
      <Typography variant="body2" align="center" sx={{ color: '#888' }}>
        &copy; {new Date().getFullYear()} Deco Floristería. Todos los derechos reservados.
      </Typography>
    </Container>
  </Box>
  );
};

export default Footer;
