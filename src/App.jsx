// src/App.jsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServiciosSection from './components/ServiciosSection';
import GaleriaSection from './components/GaleriaSection';
import CatalogoSection from './components/CatalogoSection';
import ProcesoSection from './components/ProcesoSection';
import TestimoniosSection from './components/TestimoniosSection';
import FAQSection from './components/FAQSection';
import ContactoSection from './components/ContactoSection';
import Footer from './components/Footer';
import FabWhatsApp from './components/FabWhatsApp';
import { WhatsAppChatProvider } from './context/WhatsAppChatContext';

const App = () => {
  return (
    <WhatsAppChatProvider>
      <AnimatePresence>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          sx={{
            overflowX: 'hidden',
            width: '100%',
            minHeight: '100%',
          }}
        >
          <Navbar />
          <Box component="main" sx={{ width: '100%' }}>
            <HeroSection />
            <ServiciosSection />
            <GaleriaSection />
            <CatalogoSection />
            <ProcesoSection />
            <TestimoniosSection />
            <FAQSection />
            <ContactoSection />
          </Box>
          <Footer />
          <FabWhatsApp />
        </Box>
      </AnimatePresence>
    </WhatsAppChatProvider>
  );
};

export default App;
