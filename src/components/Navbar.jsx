// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Container,
} from '@mui/material';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Catálogo', id: 'catalogo' },
  { label: 'Contacto', id: 'contacto' },
];

const handleNav = (id, setMobileOpen) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  setMobileOpen(false);
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          background: scrolled ? 'rgba(253, 248, 243, 0.96)' : 'rgba(253, 248, 243, 0.88)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
          py: scrolled ? 0.5 : 1,
          borderBottom: scrolled ? '1px solid rgba(212, 165, 165, 0.2)' : '1px solid transparent',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 56, md: 64 } }}>
            <Typography
              variant="h5"
              component="button"
              onClick={() => handleNav('inicio', setMobileOpen)}
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#2D2D2D',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: { xs: '1.15rem', md: '1.35rem' },
                p: 0,
              }}
            >
              Deco Floristería
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  sx={{ color: '#2D2D2D', fontWeight: 500, px: 1.5 }}
                  onClick={() => handleNav(link.id, setMobileOpen)}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                variant="contained"
                color="primary"
                component={motion.button}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleNav('contacto', setMobileOpen)}
                sx={{ ml: 1 }}
              >
                Hacer pedido
              </Button>
            </Box>

            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#2D2D2D' }}
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <FiMenu size={24} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: 'min(85vw, 300px)', background: '#FDF8F3' },
        }}
      >
        <Box p={2} display="flex" justifyContent="flex-end">
          <IconButton onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
            <FiX />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.id}
              onClick={() => handleNav(link.id, setMobileOpen)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.15rem',
                  textAlign: 'center',
                }}
              />
            </ListItemButton>
          ))}
        </List>
        <Box mt={2} px={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={() => handleNav('contacto', setMobileOpen)}
          >
            Hacer pedido
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
